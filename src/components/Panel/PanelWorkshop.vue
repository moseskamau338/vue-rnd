<script setup>
import Modal from "@/components/elements/Modal.vue";
import SvgIcons from "@/components/elements/SvgIcons.vue";

defineProps({
    open: {required: true, type: Boolean}
})

</script>

<template>
<Modal :show="open" size="large">
    <template #title>
        <div class="flex items-center space-x-2">
            <SvgIcons class="h-5" name="workshop" />
            <span class="font-medium">Panel Workshop</span>
        </div>
    </template>
    <template #body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ipsum laboriosam molestiae mollitia natus soluta, suscipit. Aliquam aspernatur beatae, cupiditate debitis deserunt fuga fugit incidunt minus nemo, quidem sapiente tempore.
    </template>
</Modal>
</template>

<style scoped>

</style>