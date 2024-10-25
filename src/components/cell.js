import { defineComponent, h } from 'vue'

const LayoutCell = defineComponent({
  name: "LayoutCell",
  setup() {
    return () => h("div", {
      id: "zzz"
    }, 111)
  }
})

export default LayoutCell