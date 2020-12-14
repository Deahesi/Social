<template>
    <div class="main-form">
        <div class="pre-form">
            <h1>Social</h1>
            <div class="form">
                <div class="form-login">
                    <b-form @submit.prevent="onSubmit" class="full">
                        <b-form-group
                                id="input-group-1"
                                label="Ваш Email:"
                                label-for="input-1"
                        >
                            <b-form-input
                                    id="input-1"
                                    v-model="email"
                                    type="email"
                                    required
                                    placeholder="Ваш Email:"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group
                                id="input-group-2"
                                label="Ваш пароль:"
                                label-for="input-2"
                        >
                            <b-form-input
                                    id="input-2"
                                    v-model="password"
                                    type="password"
                                    required
                                    placeholder="Ваш пароль:"
                            ></b-form-input>
                        </b-form-group>

                        <b-button type="submit" squared class="btn" variant="primary">Войти</b-button>
                    </b-form>
                </div>
            </div>
            <b-button squared class="bottom-form__button" variant="primary" @click.prevent="$router.push('/register')">Зарегистрироваться</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            email: '',
            password: ''
        }),
        methods: {
            async onSubmit() {
                try {
                    const uid  = await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password
                    })
                    this.$router.push(`/profile/${uid}`)
                } catch (e) {
                    console.log()
                }
            }
        }
    }
</script>

<style scoped>

</style>