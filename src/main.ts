import { createApp, Directive } from "vue";
import "./style.css";
// import App from "./App.vue";
import App from "./App2.vue";
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 70%, 50%, 0.5)`;
}
const clickEffectDirective: Directive = {
  mounted(el: HTMLInputElement & { handle?: EventListener }, binding: any, vnode: any) {
    el.addEventListener('click', (e) => {
      // console.log(e);
      const { value } = binding

      el.style.overflow = 'hidden'
      const ripple = document.createElement('span')
      ripple.classList.add('ripple')
      ripple.style.background = 'rgba(169, 169, 169, 0.2)';
      // ripple.style.background = getRandomColor();
      const rect = el.getBoundingClientRect()
      const size = value ?? Math.max(rect.width, rect.height)

      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      el.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  },
  unmounted(el: HTMLInputElement & { handle?: EventListener }) {
    if (el.handle) {
      el.removeEventListener('click', el.handle)
    }
  }
}
createApp(App).directive('clickEffect', clickEffectDirective).mount("#app");
