<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {useDraggable, useMouse, useElementBounding, clamp } from '@vueuse/core'
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import CButton from "@/components/elements/CButton.vue";

defineProps({
    page: {type: Object, required: true},
})

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const dashboard_options = ref([
    {label: 'Edit Page', key:'', action:() => editing_mode.value = true},
    {label: 'Update Variables', key:'', action:() => {}},
    {label: 'Delete Page', key:'', action:() => {}},
])
const editing_mode = ref(false)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 126, y: 198 },
    handle
})

const { left, right, top, bottom,  width: containerWidth, height: containerHeight } = useElementBounding(container);
const { width: panelWidth, height: panelHeight } = useElementBounding(el);

const restrictedX = computed(() =>
  clamp(left.value, x.value, right.value - panelWidth.value)
);
const restrictedY = computed(() =>
  clamp(top.value, y.value, bottom.value - panelHeight.value)
);


// resize functions
    const width = ref(300)
    const height = ref(200)

    const isResizing = ref(false)
    const { x: mouseX, y: mouseY } = useMouse()

  const startResize = () => {
      isResizing.value = true
    }

    const endResize = () => {
      isResizing.value = false
    }

    const setMousePosition = () => {
      mouseX.value = width.value
      mouseY.value = height.value
    }

    const resize = () => {
      if (!isResizing.value) return
      width.value = mouseX.value
      height.value = mouseY.value
      setMousePosition()
    }

    onMounted(() => {
      window.addEventListener('mouseup', endResize)
      window.addEventListener('mousemove', resize)
    })

    onUnmounted(() => {
      window.removeEventListener('mouseup', endResize)
      window.removeEventListener('mousemove', resize)
    })


</script>

<template>
    <header class="flex justify-between">
        <div></div>
        <div class="space-x-5 flex items-center transition-all duration-300">
            <div class="flex items-center flex-row">
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs" placeholder="Enter page name...">
                <span class="text-slate-400 text-xs px-3">to</span>
                <input type="date" class="focus:ring-green-500 focus:border-green-500 block sm:text-xs border-gray-300 rounded placeholder:text-xs" placeholder="Enter page name...">
            </div>
            <Menu as="div" className="relative flex">
              <!--inline-block text-left-->
                <button class="border border-gray-300 w-full justify-center rounded-l px-4 py-1.5 text-xs font-medium focus:outline-none">+ Add Panel</button>
              <div>
                <MenuButton
                  class="border border-l-0 border-gray-300 inline-flex w-full justify-center rounded-r px-2 py-1.5 text-sm font-medium focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>

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
                  <div class="px-1 py-1">
                      <template v-for="item in dashboard_options">
                        <MenuItem v-slot="{ active }">
                          <button
                            @click="item.action"
                            :class="[
                              active ? 'bg-gray-300/30' : '',
                              'group flex w-full items-center rounded px-2 py-2 text-xs',
                            ]"
                          >
                              {{ item.label }}
                          </button>
                        </MenuItem>
                      </template>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <div v-if="editing_mode" class="flex space-x-2 transition-all duration-500">
                <CButton @click="editing_mode = false" variant="success">Save</CButton>
                <CButton @click="editing_mode = false" variant="secondary">Cancel</CButton>
            </div>
        </div>
    </header>
  <div ref="container" :class="{'graph-paper border' : editing_mode}" class="min-h-[700px] w-full mt-8">
      <div ref="el" :style="{
          userSelect: 'none',
          position: 'fixed',
          top: `${restrictedY}px`,
          left: `${restrictedX}px`,
        }" id="panel" class="relative group">
          <div class='resizable'>
            <div :style="{ width: `${width}px`, height: `${height}px` }" :class="{'shadow-lg' : editing_mode}" class="bg-white rounded-md min-w-[300px] min-h-[200px] transition-all duration-300">
              <header id="panel_handle" class="bg-slate-200 flex justify-between py-1 px-3 rounded-t-md text-slate-500">
                  <div class="flex items-center space-x-2">
                      <span v-if="editing_mode" ref="handle" class="opacity-40 hover:cursor-move px-1 py-0.5 hover:bg-slate-300/50 rounded transition-all flex flex-col -space-y-1 leading-none text-xs">
                          <span>&bull;&bull;&bull;</span>
                          <span>&bull;&bull;&bull;</span>
                      </span>
                    <h2 class="font-medium text-sm">A panel title here</h2>
                  </div>

                <div class="flex space-x-2">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>

                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>

                  </span>
                </div>
              </header>
                <div>
                    <ul>
                        <li>X: {{restrictedX}}</li>
                        <li>Y: {{restrictedY}}</li>
                        <li>Width: {{width}}</li>
                        <li>Height: {{height}}</li>
                        <li>--------------------------</li>
                        <li>Mouse position: x: {{mouseX}} y: {{mouseY}}</li>
                    </ul>
                </div>
            </div>
          </div>
          <button v-if="editing_mode" @mousedown="startResize" class="bottom-0 right-0 absolute pointer-events-auto hover:cursor-nwse-resize flex items-center justify-between grow-0 shrink-0 hover:bg-gray-200 w-fit p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-400 h-4 w-4 -rotate-45" viewBox="0 0 320 512"><path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/></svg>
            </button>
        </div>


  </div>
</template>

<style>

</style>
