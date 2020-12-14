<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">
                <img src="../../assets/icon.svg" class="d-inline-block align-baseline logo" alt="Kitten">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="'/profile/' + uid" active-class="active">Профиль</b-nav-item>
                    <b-nav-item to="/messages" active-class="active">Сообщения</b-nav-item>
                    <b-nav-item to="/friends" active-class="active">Друзья</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>

                        <template #button-content>
                            <em>{{firstName}}</em>
                        </template>
                        <b-dropdown-item to="/settings">Настройки</b-dropdown-item>
                        <hr>
                        <b-dropdown-item @click.prevent="logout">Выйти</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ['firstName', 'uid'],
        methods: {
            async logout() {
                try {
                    await this.$store.dispatch('logout')
                    this.$router.push('/login')
                } catch (e) {
                    console.log()
                }
            }
        }
    }
</script>

<style scoped>

</style>