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
import {provide} from "vue";

use([
  CanvasRenderer,
  BarChart, GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AxisPointerComponent
]);

defineProps(['instance'])

provide(THEME_KEY, 'light');
</script>

<template>
      <div class="w-full h-full">
           <v-chart class="chart" :option="instance.requirements.chartOptions" autoresize />
      </div>
</template>

<style scoped>

</style>