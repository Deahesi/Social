<template>
    <b-card class="friend-card">
        <div class="d-flex align-items-center">
            <b-avatar :src="avatar" size="4rem" :to="'/profile/' + id"></b-avatar>
            <b-card-title class="ml-3">
                {{firstName}} {{surName}}
            </b-card-title>
        </div>
        <Loader v-if="loading"/>
        <b-button variant="primary" class="friend-card__button" v-else-if="!friend" ref="btnAdd" :disabled="added"
                  @click.prevent="addFriend">Добавить в друзья
        </b-button>

    </b-card>
</template>

<script>
    export default {
        name: "FriendSearch",
        props: ['firstName', 'surName', 'id'],
        data: () => ({
            avatar: '',
            loading: false,
            friend: false,
            added: false
        }),
        async mounted() {
            this.avatar = await this.$store.dispatch('getAvatar', this.id)
            const friends = this.$store.getters.friends
            for (let friend of friends) {
                if (this.id === friend) {
                    this.friend = true
                    break
                }
            }
        },
        methods: {
            async addFriend() {
                this.loading = true
                try {
                    await this.$store.dispatch('addFriend', this.id)
                    const friends = this.$store.getters.friends
                    for (let friend of friends) {
                        if (this.id === friend) {
                            this.friend = true
                            break
                        }
                    }
                    this.added = true
                    this.$emit('added')
                } catch (e) {
                    console.log(e)
                    this.added = false
                }
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>