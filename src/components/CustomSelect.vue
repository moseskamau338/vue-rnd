<template>
  <div>
    <Listbox :model-value="modelValue" v-model="selected" @update:modelValue="pass" :multiple="multiple">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded bg-slate-100 dark:bg-brand-night border dark:border-slate-600 dark:text-slate-200 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 sm:text-sm"
        >
          <span v-if="!valueExists" class="block truncate text-slate-400">{{ placeholder }}</span>
          <div v-else class="block truncate">
            <slot name="selected-items" v-bind:aria-selected="selected">
                <div>{{selected}}</div>
            </slot>
          </div>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:stroke-slate-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white border border-transparent dark:border-slate-600 dark:bg-brand-night-box py-1 text-base dark:text-slate-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option"
              :value="option"
              as="template"
            >
              <slot name="option" v-bind:status="{active, selected}" v-bind:option="option">
                  <div>
                      {{option}}
                  </div>
              </slot>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
    modelValue: Object,
    multiple: Boolean,
    placeholder: {type:String, default:'Search items...'},
    options: {type:Array, default:[]}
})
const emit = defineEmits(['update:modelValue'])

const selected = ref(props.multiple ? [] : null)

const pass = (e) => {
    emit('update:modelValue', e)
}

const valueExists = computed(() => {
    if (selected.value){
      if (typeof selected.value === 'object'){
          //single
          return Object.keys(selected.value).length > 0
      }else{
          //multiple
          return selected.value.length > 0
      }

    }
})
</script>
