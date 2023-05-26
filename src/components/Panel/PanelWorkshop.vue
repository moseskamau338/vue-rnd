<script setup>
import Modal from "../elements/Modal.vue";

defineProps({
    open: {required: true, type: Boolean}
})

</script>

<template>
<Modal :show="open">
    <template #body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ipsum laboriosam molestiae mollitia natus soluta, suscipit. Aliquam aspernatur beatae, cupiditate debitis deserunt fuga fugit incidunt minus nemo, quidem sapiente tempore.
    </template>
</Modal>
</template>

<style scoped>

</style>