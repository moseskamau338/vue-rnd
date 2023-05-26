<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useDraggable, useMouse} from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
    handle
})

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

    const resize = () => {
      if (!isResizing.value) return
      width.value = mouseX.value
      height.value = mouseY.value
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
  <div class="graph-paper h-full w-full border">
      <div ref="el" :style="style" style="position: fixed" id="panel" class="relative group">
          <div class='resizable'>
            <div :style="{ width: `${width}px`, height: `${height}px` }" class="bg-white shadow-lg rounded-md min-w-[300px] min-h-[200px]">

              <!--Resizers-->
              <div class='absolute bottom-0 right-0 pointer-events-auto hover:cursor-nwse-resize'>
                <div class='border-r-4 border-b-4 rounded border-slate-500 w-6 h-6' @mousedown="startResize"></div>
              </div>

              <header id="panel_handle" class="bg-slate-200 flex justify-between py-1 px-3 rounded-t-md text-slate-500">
                  <div class="flex items-center space-x-2">
                      <span ref="handle" class="opacity-40 hover:cursor-move px-1 py-0.5 hover:bg-slate-300/50 rounded transition-all flex flex-col -space-y-1 leading-none text-xs">
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
                        <li>X: {{x}}</li>
                        <li>Y: {{y}}</li>
                        <li>Width: {{width}}</li>
                        <li>Height: {{height}}</li>
                    </ul>
                </div>
            </div>
          </div>

        </div>

  </div>
</template>

<style>

</style>
