<template>
    <Loader v-if="loading" :size="7"/>
    <div class="profile" v-else>
        <div class="container">
            <div class="profile-info">
                <b-button v-if="!yourProfile && !friend" @click.prevent="addFriend">Добавить в друзья</b-button>
                <b-avatar :src="avatar" size="10rem"></b-avatar>
                <div class="profile-info__desc">
                    <h3 class="profile-info__name">{{name}}</h3>
                    <p class="profile-info__desc-info">
                        {{description}}
                    </p>
                </div>
            </div>
            <div class="posts-block">
                <div class="tools">
                    <div>
                        <form class="flex-column align-items-center d-flex" @submit.prevent="onSubmit"
                              v-if="yourProfile">
                            <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="Пишите что хотите!"
                                    rows="5"
                                    class="textarea-m"
                                    v-model.trim="postMessage"
                            ></b-form-textarea>
                            <b-button variant="primary" type="submit">
                                <b-icon icon="box-arrow-in-right"/>
                                Отправить пост
                            </b-button>
                        </form>
                    </div>
                </div>
                <div v-if="posts" class="posts post-zam">
                    <Post v-for="post in posts" :key="post.id" :message="post.postMessage" :avatar="avatar"
                          :date="post.date" :id="post.id" :yourProfile="yourProfile"/>
                </div>
                <p v-else class="post-zam text__no-posts">У вас ещё нет постов!</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Post from "../components/Post"

    export default {
        name: "Profile",
        data: () => ({
            loading: true,
            name: '',
            description: null,
            postMessage: '',
            posts: [],
            uid: null,
            id: null,
            info: null,
            avatar: null,
            yourProfile: true,
            friend: false
        }),
        async mounted() {
            try {
                this.uid = await this.$store.dispatch('getUid')
                this.id = this.$route.params.id
                this.yourProfile = this.uid === this.id
                const friends = this.$store.getters.friends
                for (let friend of friends) {
                    if (this.id === friend.id) {
                        this.friend = true
                        break
                    }
                }
                this.info = this.yourProfile ? this.$store.getters.info : await this.$store.dispatch('getInfo', this.id)
                const firstName = this.info.firstName
                const surName = this.info.surName
                this.description = this.info.description || 'Вы ещё не задали описание профиля!'
                this.name = firstName + ' ' + surName
                this.avatar = (await this.$store.dispatch('getAvatar', this.id)) || ''
                this.posts = (await this.$store.dispatch('fetchPosts', this.id))
            } catch (e) {
                console.log(e)
            }
            this.loading = false
        },
        methods: {
            async onSubmit() {
                try {
                    const date = new Date().toJSON()
                    await this.$store.dispatch('addPost', {postMessage: this.postMessage, date: date})
                    this.posts = this.$store.getters.posts
                } catch (e) {
                    console.log(e)
                }
            },
            async addFriend() {
                try {
                    await this.$store.dispatch('addFriend', this.id)
                    this.friend = true
                } catch (e) {
                    console.log(e)
                }

            }
        },
        components: {
            Post
        },
        watch: {
            async $route(toRoute) {
                this.id = toRoute.params.id
                const friends = this.$store.getters.friends
                for (let friend of friends) {
                    if (this.id === friend) {
                        this.friend = true
                        break
                    }
                }
                this.yourProfile = this.uid === this.id
                this.info = this.yourProfile ? this.$store.getters.info : await this.$store.dispatch('getInfo', this.id)
                this.avatar = (await this.$store.dispatch('getAvatar', this.id)) || ''
                this.posts = (await this.$store.dispatch('fetchPosts', this.id))
                const firstName = this.info.firstName
                const surName = this.info.surName
                this.description = this.info.description || 'Вы ещё не задали описание профиля!'
                this.name = firstName + ' ' + surName

            }
        }
    }
</script>

<style scoped>

</style>