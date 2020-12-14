<template>
    <b-card class="friend-own__card">
        <div class="d-flex align-items-center">
            <b-avatar :src="avatar" size="3rem" :to="'/profile/' + id"></b-avatar>
            <b-card-title class="ml-3" style="font-size: 20px">
                {{name}}
            </b-card-title>
        </div>
        <b-icon icon="people" scale="1.5em" v-if="!active" :id="id"
                @mouseenter="active = true"
                style="cursor: pointer"
        ></b-icon>
        <b-icon icon="people-fill" scale="1.5em" v-else :id="id"
                @mouseleave="active = false"
                style="cursor: pointer"
                @click.prevent="submitRequest"
        ></b-icon>
        <b-tooltip :target="id" triggers="hover">
            Принять заявку
        </b-tooltip>
    </b-card>
</template>

<script>
    export default {
        name: "FriendRequest",
        props: ['id'],
        data: () => ({
            avatar: '',
            active: false,
            name: ''
        }),
        async mounted() {
            this.avatar = await this.$store.dispatch('getAvatar', this.id)
            this.name = (await this.$store.dispatch('getInfo', this.id)).name
        },
        methods: {
            async submitRequest() {
                try {
                    await this.$store.dispatch('submitRequest', this.id)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
