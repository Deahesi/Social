<template>
    <div class="empty-layout">
        <router-view/>
    </div>
</template>

<script>
    import messages from "../utils/messages"

    export default {
        name: "EmptyLayout",
        computed: {
          error() {
              return this.$store.getters.error
          }
        },
        watch: {
            error(fbError) {
                this.$bvToast.toast(messages[fbError.code], {
                    title: `Ошибка`,
                    toaster: 'b-toaster-top-center',
                    solid: true,
                    appendToast: true,
                    variant: 'danger'
                })
            }
        }
    }
</script>

<style scoped>

</style>