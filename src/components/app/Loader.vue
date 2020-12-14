<template>
    <div class="text-center" style="margin-top: 50px">
        <b-spinner variant="primary" label="Text Centered"
                   :style="'width: ' + size + 'rem; height: ' + size + 'rem;'"></b-spinner>
    </div>
</template>

<script>
    export default {
        name: "Loader",
        props: ['size']
    }
</script>

<style scoped>

</style>