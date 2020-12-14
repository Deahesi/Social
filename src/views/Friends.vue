<template>
    <div class="d-flex friends-wrap m-auto justify-content-between">
        <div class="friends-search">
            <b-form @submit.prevent="onSubmit">
                <b-form-input v-model.trim="name"></b-form-input>
                <Loader v-if="loading" :size="1"/>
                <b-button type="submit" v-else>Поиск</b-button>
            </b-form>
            <div class="results">
                <FriendSearch v-for="friend in searchFriends"
                              :key="friend.id"
                              :firstName="friend.firstName"
                              :surName="friend.surName"
                              :id="friend.id"
                              @added="updateGetters"
                />
            </div>
        </div>
        <div class="friends-list">
            <h2>Ваши друзья:</h2>
            <Friend v-for="friend in friends"
                    :key="friend.id"
                    :id="friend.id"
                    :dialogId="friend.dialogId"
            />
            <FriendRequest v-for="friend in requests"
                    :key="friend"
                    :id="friend"
            />
        </div>
    </div>
</template>

<script>
    import FriendSearch from "../components/FriendSearch";
    import Friend from "../components/Friend";
    import FriendRequest from "../components/FriendRequest";
    import firebase from "firebase";

    export default {
        name: "Friends",
        components: {Friend, FriendSearch, FriendRequest},
        data: () => ({
            loading: false,
            name: '',
            searchFriends: [],
            friends: [],
            requests: []
        }),
        async mounted() {
            try {
                const uid = await this.$store.dispatch('getUid')
                this.friends = this.$store.getters.friends
                this.requests = this.$store.getters.requests
                firebase.firestore().collection("users").doc(uid)
                    .onSnapshot((doc) => {
                        this.$store.commit('setFriends', (doc.data()).friends || [])
                        this.$store.commit('setRequests', (doc.data()).friendRequest || [])
                        this.friends = this.$store.getters.friends
                        this.requests = this.$store.getters.requests
                    })
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            async onSubmit() {
                this.loading = true
                try {
                    this.searchFriends = await this.$store.dispatch('searchFriends', this.name)
                } catch (e) {
                    console.log(e)
                }
                this.loading = false
            },
            updateGetters() {
                this.friends = this.$store.getters.friends
            }
        }
    }
</script>

<style scoped>

</style>