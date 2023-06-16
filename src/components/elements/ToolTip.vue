<template>
  <tippy theme="brand">
    <slot></slot>

    <template #content>
      <span class="text-[10px]" v-if="content && content.length">
        {{ content }}
      </span>
      <slot v-else name="html"></slot>
    </template>
  </tippy>
</template>

<script>
import { Tippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling

export default {
  name: "ToolTip",
  components: {Tippy},
  props:{content: {default: '', type: String}},
}
</script>

<style>
.tippy-box[data-theme~=brand]{
  @apply bg-brand-night-box dark:bg-brand-night border dark:border-none shadow-xl
}
.tippy-box[data-theme~=brand][data-placement^=top]>.tippy-arrow:before{
  @apply border-t-brand-night-box
}.tippy-box[data-theme~=brand][data-placement^=bottom]>.tippy-arrow:before{
  @apply border-b-brand-night-box
 }.tippy-box[data-theme~=brand][data-placement^=left]>.tippy-arrow:before{
  @apply border-l-brand-night-box
   }.tippy-box[data-theme~=brand][data-placement^=right]>.tippy-arrow:before{
  @apply border-r-brand-night-box
       }.tippy-box[data-theme~=brand]>.tippy-backdrop{@apply bg-brand-night}
.tippy-box[data-theme~=brand]>.tippy-svg-arrow{@apply fill-brand-night-box dark:fill-brand-night}
</style>