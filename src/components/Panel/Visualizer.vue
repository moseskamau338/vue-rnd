<template>
  <div>
       <Component :is="widget.component" :key="widget.id" />
  </div>
</template>

<script setup>
  const props = defineProps({
      widget: {required: true, type: Object}
  })
</script>

<style scoped>

</style>