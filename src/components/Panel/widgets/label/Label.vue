<script setup>
const props = defineProps({
    instance: {type: Object, required: true}
})

</script>

<template>
  <div class="p-2 bg-white dark:bg-brand-night-box shadow-lg border-2 border-slate-200 dark:border-slate-700 w-fit rounded">
      {{instance.requirements.fields[0].defaultValue}}
  </div>
</template>

<style scoped>

</style>