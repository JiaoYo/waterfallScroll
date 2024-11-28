<template>
  <div class="app">
    <div class="container" ref="fContainerRef">
      <fs-book-waterfall :bottom="20" :column="column" :gap="10" :page-size="20" :request="getData"
        @scroll="handleScroll" ref="fsRef">
        <template #item="{ item, index, imageHeight }">
          <fs-book-card :detail="{
            imageHeight,
            title: item.title,
            author: item.author,
            bgColor: colorArr[index % (colorArr.length - 1)],
          }" @click="LookInfo($event, item, index)" />
        </template>
      </fs-book-waterfall>
    </div>
    <div ref="scrollRef" class="scrollBts" @click="scrollToTop"></div>
  </div>
  <FsLookModel v-model:vision="vision" :item="Litem"></FsLookModel>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import data1 from "./config/data1.json";
import data2 from "./config/data2.json";
import FsBookWaterfall from "./components/FsBookWaterfall.vue";
import FsBookCard from "./components/FsBookCard.vue";
import FsLookModel from "./components/FsLookModel.vue";
import { ICardItem } from "./components/type";

const colorArr = ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"];
const vision = ref(false);
const fContainerRef = ref<HTMLDivElement | null>(null);
const column = ref(4);
const fContainerObserver = new ResizeObserver((entries) => {
  changeColumn(entries[0].target.clientWidth);
});

const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5;
  } else if (width >= 690 && width < 960) {
    column.value = 4;
  } else if (width >= 500 && width < 690) {
    column.value = 3;
  } else {
    column.value = 2;
  }
};

onMounted(() => {
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value);
});

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value);
});

const list1: ICardItem[] = data1.data.items.map((i) => ({
  id: i.id,
  url: i.note_card.cover.url_pre,
  width: i.note_card.cover.width,
  height: i.note_card.cover.height,
  title: i.note_card.display_title,
  author: i.note_card.user.nickname,
}));
const list2: ICardItem[] = data2.data.items.map((i) => ({
  id: i.id,
  url: i.note_card.cover.url_pre,
  width: i.note_card.cover.width,
  height: i.note_card.cover.height,
  title: i.note_card.display_title,
  author: i.note_card.user.nickname,
}));

const list = [...list1, ...list2];

const getData = (page: number, pageSize: number) => {
  return new Promise<ICardItem[]>((resolve) => {
    setTimeout(() => {
      resolve(list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
    }, 1000);
  });
};
const Litem = ref<ICardItem | any>(null);
const LookInfo = (e: any, item: ICardItem, index: number) => {
  // console.log(e);
  var element = e.target;
  var rect = element.getBoundingClientRect();
  var top = rect.top
  var left = rect.left
  Litem.value = { ...item, top, left, width: rect.width, height: rect.height, bg: colorArr[index % (colorArr.length - 1)] };
  vision.value = true;
}
const scrollRef = ref<HTMLDivElement | null>(null);
const handleScroll = (e: any) => {
  // console.log(e.target.scrollTop);
  scrollRef.value!.style.top = e.target.scrollTop >= 1000 ? '-30%' : '-100%';
}
const fsRef = ref<any>(null);
const scrollToTop = (event: any) => {
  const rect = scrollRef.value!.getBoundingClientRect();
  const clickY = event.clientY - rect.top;
  const elementHeight = rect.height;
  if (clickY > elementHeight * 0.85) {
    fsRef.value?.scrollToTop()
  }
};
</script>

<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  display: flex;

  .container {
    width: 1400px;
    height: 100vh;
  }

  .scrollBts {
    position: absolute;
    top: -100%;
    right: 50px;
    width: 70px;
    height: 100%;
    background-image: url('./assets/scrollbts.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: all 0.5s;
    cursor: pointer;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 85%;
      cursor: auto;
    }
  }
}
</style>
