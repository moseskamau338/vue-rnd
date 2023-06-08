import {inject, onUnmounted, ref} from "vue";
import {find} from "lodash/collection";

export class useWizard{
    constructor(tabs) {
        this.tabs = tabs
        this.activeComponent = ref(this.tabs.value[0])
        this.emitter = inject('emitter')
        this.processing = ref(false)

        //pass around data
        this.previousTabResult = ref({})

        this.initiateListeners()
    }
    initiateListeners(){
        this.emitter.on('wizard_forward', () => {
            console.log('I heard you....')
        })
        this.emitter.on('erpSelected',(erp) => {
            //console.log('[WIZARD] setting erp: ', erp)
            this.previousTabResult.value['chosenErp'] = erp
        })
        this.emitter.on('consentStatus', (consent) => {
            //console.log('[WIZARD] setting consent: ', consent)
            this.previousTabResult.value['consent'] = consent
        })


        //clean up
        onUnmounted(() => {
            this.emitter.off('wizard_forward')
            this.emitter.off('erpSelected')
            this.emitter.off('consentStatus')
        })

    }
    next = async () => {
        let callback = this.activeComponent.value.action
      this.processing.value = true
        let proceed = false
        if (callback !== null){
          proceed = await callback()
        }
      this.processing.value = false
        console.log('[WIZARD]: check proceed: ', proceed)
        if (proceed){
          this.switchTab(this.activeComponent.value.id + 1)
        }
    }
    prev = () => {
      this.processing.value = true
      setTimeout(()=>{
        this.processing.value = false
          this.switchTab(this.activeComponent.value.id - 1)
      }, 100)
    }
    switchTab = (id) => {
      if (id <= this.tabs.value.length) {
        let prevId = this.activeComponent.value.id
        this.activeComponent.value.status = prevId > id ? 'pending':'finished'
        this.activeComponent.value = find(this.tabs.value, {id})
        this.activeComponent.value.status = 'active'

      }
    }
    jump = (id) => {
      let jumpTo = find(this.tabs.value, {id})
      if (jumpTo.status === 'finished'){this.switchTab(id)}
    }
}