<script setup lang="tsx">
import { ref, watch, nextTick } from 'vue'
const vision = defineModel('vision')
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const modelRef = ref<any>(null)
const init = () => {
  const initH = 760
  const w = props.item.width * initH / props.item.height
  nextTick(() => {
    setTimeout(() => {
      modelRef.value.classList.add('toggle')
      modelRef.value.style.width = w + 'px'
      modelRef.value.style.height = initH + 'px'
      modelRef.value.style.backgroundColor = '#fff'
    });
  })
}
watch(() => vision.value, (val) => {
  if (val) {
    init()
  }
})
</script>
<template>
  <teleport to="body" v-if="vision">
    <div class="mask" @click="vision = false"></div>
    <div class="model" ref="modelRef" :style="{
      width: props.item.width + 'px', height: props.item.height + 'px', backgroundColor: props.item.bg,
      left: props.item.left + 'px', top: props.item.top + 'px'
    }">
      <!-- <slot /> -->
      <div>
        {{ props.item.title }}
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 9998;
  transition: all 0.3s;
}

.model {
  position: absolute;
  border-radius: 20px;
  background-color: #fff;
  z-index: 9999;
  transition: all .4s ease-out;
  opacity: 0.5;
}

.toggle {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
  opacity: 1 !important;
}
</style>