<script setup>
import FormGenerator from "@/components/Panel/FormGenerator.vue";

const props = defineProps({
    queryOptions: {type: Object, required: true},
})
</script>

<template>
  <div>
      <div>
          <div v-if="queryOptions.requirements.backend_query">
              <!--db inputs-->
              <p class="text-slate-400 text-xs">Dataset</p>
              <div class="mt-2">
                <label for="collection" class="block text-xs font-medium text-gray-700">Collection</label>
                <select id="collection" name="collection" class="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs rounded-md">
                  <option :value="null">--- Choose Collection ---</option>
                  <option value="transactions">Transactions</option>
                  <option value="accounts">Accounts</option>
                </select>
              </div>

              <div class="border p-1 rounded mt-2">
                  <div class="mt-2">
                    <label for="field" class="block text-xs font-medium text-gray-700">Aggregation / Function</label>
                    <select id="field" name="field" class="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs rounded-md">
                      <option :value="null">--- Choose Function ---</option>
                      <option value="sum">Sum</option>
                      <option value="aggregate">Aggregate</option>
                    </select>
                  </div>

                  <div class="mt-2">
                    <label for="field" class="block text-xs font-medium text-gray-700">Target Field</label>
                    <select disabled id="field" name="field" class="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs rounded-md">
                      <option :value="null">--- Field ---</option>
                      <option value="transactions">Transactions</option>
                      <option value="accounts">Accounts</option>
                    </select>
                  </div>
              </div>

              <div class="mt-4">
                <label for="field" class="block text-xs font-medium text-gray-700">Filters</label>
                <select disabled id="field" name="field" class="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs rounded-md">
                  <option :value="null">--- Field ---</option>
                  <option value="transactions">Transactions</option>
                  <option value="accounts">Accounts</option>
                </select>
              </div>
          </div>
          <div v-else>
            <!--@Todo: loop through custom fields and create form-->
              <FormGenerator :elements="queryOptions.requirements.fields"/>
          </div>
        <p v-if="queryOptions.requirements.backend_query" class="text-slate-400 text-xs mt-4">Chart Appearance</p>
          <div v-if="queryOptions.requirements.backend_query" class="grid grid-cols-1 md:grid-cols-4 gap-y-2 mt-2">
              <div class="col-span-2 relative flex items-start" v-for="label in ['Donut', 'Show Labels', 'Show Legend', 'Show Total']">
                <div class="flex items-center h-5">
                  <input :id="label" :name="label" type="checkbox" class="focus:ring-0 focus:ring-green-500 h-3 w-3 text-green-600 border-gray-300 rounded-sm">
                </div>
                <div class="ml-1 text-sm">
                  <label :for="label" class="text-xs">{{ label }}</label>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>