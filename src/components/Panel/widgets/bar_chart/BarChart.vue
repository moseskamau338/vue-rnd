<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';

import {
    GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,AxisPointerComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import {provide, watch} from "vue";

use([
  CanvasRenderer,
  BarChart, GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AxisPointerComponent
]);

const props = defineProps(['instance'])

provide(THEME_KEY, 'light');

watch(props.instance.requirements.style_fields, () => {
   props.instance.updateStyles()
})
watch(props.instance.requirements, () => {
    props.instance.updateChartOptions()
})

</script>

<template>
      <div class="w-full h-full">
           <v-chart class="chart" :option="instance.requirements.chartOptions" autoresize />
      </div>
</template>

<style scoped>

</style>