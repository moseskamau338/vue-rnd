<script setup>
import {Menu, MenuItem, MenuButton, MenuItems} from "@headlessui/vue";
defineProps({
    options:{required: true, type: Array},
    label:{ type: String, default:'Menu Label'},
})
</script>

<template>
<Menu as="div" className="relative flex">
  <slot name="extended"></slot>
  <div>
    <MenuButton>
        <slot name="button">
            <div class="border border-l-0 border-gray-300 inline-flex w-full justify-center rounded-r px-2 py-1.5 text-sm font-medium focus:outline-none">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
            </div>
        </slot>
    </MenuButton>
  </div>

  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <MenuItems
      class="absolute right-0 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div class="px-1 py-1 z-50 relative">
          <slot name="list">
            <template v-for="item in options">
              <MenuItem v-slot="{ active }">
                <button
                  @click="item.action"
                  :class="[
                    active ? 'bg-gray-300/30' : '',
                    item.classes,
                    'group flex w-full items-center rounded px-2 py-2 text-xs',
                  ]"
                >
                    {{ item.label }}
                </button>
              </MenuItem>
            </template>
          </slot>
      </div>
    </MenuItems>
  </transition>
</Menu>
</template>

<style scoped>

</style>