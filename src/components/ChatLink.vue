<template>
    <b-card class="mess-own__card" style="cursor: pointer" @click.prevent="$router.push(`/messages/${dialogId}`)">
        <div class="d-flex align-items-center">
            <b-avatar :src="avatar" size="3rem"></b-avatar>
            <b-card-title class="ml-3" style="font-size: 20px">
                {{name}}
            </b-card-title>
        </div>
    </b-card>
</template>

<script>
    export default {
        name: "ChatLink",
        props: ['id', 'dialogId'],
        data: () => ({
            avatar: '',
            active: false,
            name: ''
        }),
        async mounted() {
            this.avatar = await this.$store.dispatch('getAvatar', this.id)
            this.name = (await this.$store.dispatch('getInfo', this.id)).name
        },
    }
</script>

<style scoped>

</style>