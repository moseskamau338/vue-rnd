<template>
  <div class="relative h-[400px]">
       <Component :is="widget.component" :key="widget.id" v-bind:instance="widget" />
  </div>
</template>

<script setup>

  const props = defineProps({
      widget: {required: true, type: Object}
  })

</script>

<style scoped>

</style>