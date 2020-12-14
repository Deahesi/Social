<template>
    <Loader v-if="loading" :size="7"/>
    <div class="wrap" v-else>
        <Header :firstName="firstName" :uid="uid"/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "../components/app/Header";

    export default {
        name: "MainLayout",
        data: () => ({
            firstName: '',
            loading: true,
            uid: null
        }),
        async mounted() {
            this.uid = await this.$store.dispatch('getUid')
            this.firstName = (await this.$store.dispatch('getInfo', this.uid)).firstName
            await this.$store.dispatch('fetchFriends')
            await this.$store.dispatch('getRequests')
            this.$store.commit('setInfo', await this.$store.dispatch('getInfo', this.uid))
            this.loading = false
        },
        components: {
            Header
        }
    }
</script>

<style scoped>

</style>