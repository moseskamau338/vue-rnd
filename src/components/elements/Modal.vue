<template>
  <teleport to="body">
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-[70] inset-0 overflow-y-auto scrollbar-hide" @close="close">
          <div v-bind="$attrs" class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
              <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <div :class="getSize()" class="relative inline-block bg-white dark:bg-brand-night-box rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full align-middle sm:align-middle sm:w-full">
                <header v-if="!asAlert" class="bg-gradient-to-r from-green-600 via-brand-green to-brand-night-box/90 dark:bg-gray-700 m-0 pt-3 pb-2 flex justify-between text-white px-4">
                  <h3>
                    <slot name="title">Title here</slot>
                  </h3>
                  <div class="flex space-x-2 items-center">
                    <slot name="title_side"></slot>
<!--                    <h6 class="font-brand opacity-40 mx-2">Churpy</h6>-->

                    <button v-if="!noClose" @click="close" class="bg-gray-300/70 h-6 w-6 ml-3 rounded-full flex items-center justify-center shadow hover:bg-gray-200 hover:scale-105 transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700 hover:text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>

                    </button>
                  </div>
                </header>
                <div class="px-4 pt-4 pb-4">
                 <slot name="body"></slot>
                </div>

                <div id="churpy-modal-footer" class="flex justify-end px-4 py-2 pb-3 mt-5 w-full bottom-0 fixed">
                  <slot name="footer">
                    <button @click="close" type="button" class="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-brand-green hover:bg-brand-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green">
                      <slot name="done-text">Done</slot>
                    </button>
                  </slot>
                </div>

              </div>

            </TransitionChild>
          </div>
        </Dialog>
    </TransitionRoot>
  </teleport>
</template>

<script>
import { ref, toRef, inject } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  name:'Modal',
  emits:['close_modal'],
  props: {
    show: {type: Boolean, required: true},
    source:{type:String, default: 'page', },
    size: {type: String, default: 'normal'},
    asAlert: Boolean,
    noClose: Boolean
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  setup(props, {emit}) {
    //preliminaries:
    const emitter = inject('emitter')
    const open = toRef(props, 'show')

    function getSize(){
      let classes = ''
      if (props.asAlert){
        let height = props.asAlert ? 'min-h-auto' : 'min-h-[300px]'
         classes = 'sm:max-w-md'+' '+height
      }else{
        switch (props.size) {
          case 'large': classes = 'sm:max-w-7xl min-h-[700px]'; break;
          case 'normal': classes = 'sm:max-w-4xl min-h-[500px]'; break;
          case 'small': classes = 'sm:max-w-md min-h-[300px]'; break;
          default: classes = 'sm:max-w-4xl min-h-[500px]';
        }
      }

      return classes
    }

    function close(){
      if (!props.noClose){
       emit('close_modal', props.source)
      }
    }
    /*
    * listening to close modal event
    * in your initiating component, add the following code:
    * import {inject} from 'vue'
    * const emitter = inject('emitter')
    *
      let showSetting = ref(false)
        onMounted(()=>{
          emitter.on('close_modal', (source)=>{
            if(source === 'table'){
              showSetting.value = false;
              }
           })
        })
    * */

    return {
      open,
      close,
      getSize
    }
  },
}
</script>