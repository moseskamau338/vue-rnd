<template>
  <div class="relative h-[400px]">
       <Component :is="widget.component" :key="widget.id" v-bind:instance="widget" />
      <!--<PieChart />-->
  </div>
</template>

<script setup>
  import PieChart from "@/components/Panel/widgets/pie_chart/PieChart.vue";

  const props = defineProps({
      widget: {required: true, type: Object}
  })

</script>

<style scoped>

</style>