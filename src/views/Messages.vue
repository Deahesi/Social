<template>
    <div class="d-flex flex-column align-items-center">
        <div class="friends-chats">
            <ChatLink
                    v-for="friend in friends"
                    :key="friend.id"
                    :id="friend.id"
                    :dialogId="friend.dialogId"
            />
        </div>
    </div>
</template>

<script>
    import ChatLink from "../components/ChatLink";

    export default {
        name: "Messages",
        components: {ChatLink},
        data: () => ({
            friends: []
        }),
        mounted() {
            this.friends = this.$store.getters.friends
        }
    }
</script>

<style scoped>

</style>