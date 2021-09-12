import { onMounted, onUnmounted } from 'vue'

function onKeydown(handler) {
  onMounted(() => {
    window.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}

export {
  onKeydown
}