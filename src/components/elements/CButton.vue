<template>
  <button v-bind="$attrs" type="button" :class="themeGenerator.theme" class="inline-flex items-center px-3 py-1 text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all h-fit disabled:opacity-50 disabled:pointer-events-none">
    <slot>Button</slot>
  </button>
</template>

<script>
import {computed} from "vue";
import {ThemeGenerator} from "@/library/ThemeGenerator";
export default {
  name: "CButton",
  props:{
    variant: { type: String, default:'info'},
  },
   setup(props){
      const themeGenerator = computed(() => {
       let variant = props.variant
        let t = new ThemeGenerator()
        return t.button(variant)
      })

    return {themeGenerator}
  }
}
</script>

<style scoped>

</style>