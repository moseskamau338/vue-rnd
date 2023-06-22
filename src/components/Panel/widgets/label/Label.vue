<script setup>
const props = defineProps({
    instance: {type: Object, required: true}
})

</script>

<template>
  <div
          :style="`
              background-color: ${instance.requirements.style_fields['label-color']['background'] || 'white'};
              font-size: ${instance.requirements.style_fields['font-size']['title'] || 12}px;
              color: ${instance.requirements.style_fields['label-color']['title'] || '#000000'};
              border-color: ${instance.requirements.style_fields['label-color']['border'] || 'transparent'}`"
          class="p-2 w-fit rounded whitespace-pre-wrap">
      {{instance.requirements.fields[0].defaultValue}}
  </div>
</template>

<style scoped>

</style>