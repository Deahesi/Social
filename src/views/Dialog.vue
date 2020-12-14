<template>
    <Loader v-if="loading" :size="7"/>
    <div class="d-flex flex-column align-items-center" v-else >
        <b-list-group-item class="name-item">
            <b-avatar class="mr-3"
                      :src="infoUsers[friendId].avatar"
                      :to="`/profile/` + friendId"></b-avatar>
            <h3 class="mr-auto">{{user.name}}</h3>
        </b-list-group-item>
        <div class="d-flex flex-column align-items-center messages-wrap">
            <b-card id="scrollDown" class="messages-frame flex-column d-flex">
                <b-list-group-item :id="message.id || ''" class="d-flex align-items-center message" v-for="message in dialogInfo.messages"
                                   :key="message.crypted">
                    <b-avatar class="mr-3" :src="infoUsers[message.whoSend].avatar"
                              :to="'/profile/' + message.whoSend"></b-avatar>
                    <span class="mr-auto">{{message.message}}</span>
                </b-list-group-item>
            </b-card>
            <form class="w-100" @submit.prevent="sendMessage">
                <b-input-group class="mt-3">
                    <b-form-input v-model.trim="message"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="primary" type="submit">Отправить</b-button>
                    </b-input-group-append>
                </b-input-group>
            </form>
        </div>
    </div>
</template>

<script>
    import pidCrypt from 'pidcrypt'
    import 'pidcrypt/aes_cbc'
    import 'pidcrypt/pidcrypt_util'
    import firebase from 'firebase'

    export default {
        name: "Dialog",
        data: () => ({
            message: '',
            id: '',
            user: '',
            dialogInfo: {},
            uid: '',
            friendId: '',
            avatar: '',
            infoUsers: {},
            loading: true
        }),
        async mounted() {
            try {
                const aes = new pidCrypt.AES.CBC()
                this.id = this.$route.params.id
                this.dialogInfo = await this.$store.dispatch('getDialogInfo', this.id)
                this.$store.commit('setMessages', {
                    messages: this.dialogInfo.messages ? this.dialogInfo.messages : [],
                    id: this.id
                })
                this.dialogInfo = {
                    messages: this.dialogInfo.messages ? this.dialogInfo.messages.map((el, index) => ({
                        message: aes.decryptText(this.dialogInfo.messages[index].message, process.env.KEY_OF_MESSAGE, {nBits: 256}),
                        whoSend: this.dialogInfo.messages[index].whoSend,
                        crypted: this.dialogInfo.messages[index].message,
                    })) : [],
                    user1Id: this.dialogInfo.user1Id,
                    user2Id: this.dialogInfo.user2Id
                }
                if (this.dialogInfo.messages.length > 0) {
                    this.dialogInfo.messages[this.dialogInfo.messages.length - 1].id = 'lastMessage'
                }
                this.uid = await this.$store.dispatch('getUid')
                this.friendId = this.dialogInfo.user1Id === this.uid ? this.dialogInfo.user2Id : this.dialogInfo.user1Id
                this.infoUsers[this.dialogInfo.user1Id] = {}
                this.infoUsers[this.dialogInfo.user2Id] = {}
                this.user = this.dialogInfo.user1Id === this.uid ? (await this.$store.dispatch('getInfo', this.dialogInfo.user2Id)) : (await this.$store.dispatch('getInfo', this.dialogInfo.user1Id))
                this.infoUsers[this.dialogInfo.user1Id].avatar = await this.$store.dispatch('getAvatar', this.dialogInfo.user1Id)
                this.infoUsers[this.dialogInfo.user2Id].avatar = await this.$store.dispatch('getAvatar', this.dialogInfo.user2Id)
                firebase.database().ref(`dialogs/${this.id}`).on('value', (snap) => {
                    this.dialogInfo = snap.val()
                    this.$store.commit('setMessages', {
                        messages: this.dialogInfo.messages ? this.dialogInfo.messages : [],
                        id: this.id
                    })
                    this.dialogInfo = {
                        messages: this.dialogInfo.messages ? this.dialogInfo.messages.map((el, index) => ({
                            message: aes.decryptText(this.dialogInfo.messages[index].message, process.env.KEY_OF_MESSAGE, {nBits: 256}),
                            whoSend: this.dialogInfo.messages[index].whoSend,
                            crypted: this.dialogInfo.messages[index].message
                        })) : [],
                        user1Id: this.dialogInfo.user1Id,
                        user2Id: this.dialogInfo.user2Id
                    }
                    if (this.dialogInfo.messages.length > 0) {
                        this.dialogInfo.messages[this.dialogInfo.messages.length - 1].id = 'lastMessage'
                    }
                    this.$scrollTo('#lastMessage', 1, {
                        container: '.card-body',
                        duration: 500,
                        easing: "ease",
                        offset: 0,
                        force: true,
                        cancelable: true,
                        onStart: false,
                        onDone: false,
                        onCancel: false,
                        x: false,
                        y: true
                    })
                })
            } catch (e) {
                console.log(e)
            }
            this.loading = false
            this.$nextTick(() => {
                this.$scrollTo('#lastMessage', 1, {
                    container: '.card-body',
                    duration: 500,
                    easing: "ease",
                    offset: 0,
                    force: true,
                    cancelable: true,
                    onStart: false,
                    onDone: false,
                    onCancel: false,
                    x: false,
                    y: true
                })
            })
        },
        computed: {
            name(id) {
                return this.infoUsers[id].name
            }
        },
        methods: {
            async sendMessage() {
                try {
                    const aes = new pidCrypt.AES.CBC()
                    const uid = await this.$store.dispatch('getUid')
                    const cryptedMessage = aes.encryptText(this.message, process.env.KEY_OF_MESSAGES, {nBits: 256})
                    this.$store.commit('addMessage', {
                        message: cryptedMessage,
                        id: this.id,
                        whoSend: uid
                    })
                    this.message = ''
                    this.dialogInfo.messages = this.$store.getters.messages[this.id].messages
                    this.dialogInfo = {
                        messages: this.dialogInfo.messages ? this.dialogInfo.messages.map((el, index) => ({
                            message: aes.decryptText(this.dialogInfo.messages[index].message, process.env.KEY_OF_MESSAGE, {nBits: 256}),
                            whoSend: this.dialogInfo.messages[index].whoSend,
                            crypted: this.dialogInfo.messages[index].message
                        })) : [],
                        user1Id: this.dialogInfo.user1Id,
                        user2Id: this.dialogInfo.user2Id
                    }
                    await this.$store.dispatch('addMessage', this.id)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>