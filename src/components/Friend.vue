<template>
    <b-card class="friend-own__card">
        <div class="d-flex align-items-center">
            <b-avatar :src="avatar" size="3rem" :to="'/profile/' + id"></b-avatar>
            <b-card-title class="ml-3" style="font-size: 20px">
                {{name}}
            </b-card-title>
        </div>
        <b-icon icon="inbox-fill" scale="1.5em" v-if="!active" :id="id"
                @mouseenter="active = true" @click.prevent="$router.push(`/messages/${dialogId}`)"></b-icon>
        <b-icon icon="inbox-fill" scale="1.5em" v-else animation="cylon-vertical" :id="id"
                @mouseleave="active = false" @click.prevent="$router.push(`/messages/${dialogId}`)"></b-icon>
        <b-tooltip :target="id" triggers="hover">
            Отправить сообщение
        </b-tooltip>
    </b-card>
</template>

<script>
    export default {
        name: "Friend",
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