<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
    elements: {required: true, type: Array}
})
const formData = ref(null)
function updateFormData(event, name) {
      formData[name] = event.target.value;
    }
function submitForm() {
  // Handle form submission
  console.log("Form data:", formData);
}

</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="mt-4" v-for="(element, index) in elements" :key="index">
      <label class="block text-xs font-medium dark:text-slate-300 text-slate-600" :for="element.name">{{ element.label }}</label>
      <template v-if="element.elementType === 'input'">
        <input class="standard-input" :type="element.type" :name="element.name" :required="element.required" v-model="element.defaultValue" />
      </template>
      <template v-else-if="element.elementType === 'select'">
        <select class="standard-input" :name="element.name" :required="element.required" v-model="element.defaultValue">
          <option v-for="(option, optionIndex) in element.options" :key="optionIndex" :value="option">{{ option }}</option>
        </select>
      </template>
      <template v-else-if="element.elementType === 'textarea'">
        <textarea class="standard-input" :name="element.name" :rows="element.rows" :required="element.required" v-model="element.defaultValue"></textarea>
      </template>
      <template v-else-if="element.elementType === 'custom'">
        <!-- Render your custom element using the provided customProps -->
          <Component class="standard-input" :is="element.customProps.component" @change="($event)=> element.defaultValue = $event" />
      </template>
    </div>
  </form>
</template>

<style scoped>
.standard-input{
    @apply mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 text-xs rounded dark:bg-brand-night-box dark:border-slate-500 dark:text-slate-100
}
</style>