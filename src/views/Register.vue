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
                                description="Обязательно"
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
                                description="Обязательно"
                        >
                            <b-form-input
                                    id="input-2"
                                    v-model="password"
                                    type="password"
                                    required
                                    placeholder="Ваш пароль:"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Введите ваше имя:" label-for="input-3" description="Обязательно">
                            <b-form-input
                                    id="input-3"
                                    v-model="name"
                                    required
                                    placeholder="Ваше имя:"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Введите вашу фамилию:" label-for="input-4"
                                      description="Обязательно">
                            <b-form-input
                                    id="input-4"
                                    v-model="surname"
                                    required
                                    placeholder="Ваша фамилия:"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5">
                            <b-form-checkbox-group v-model="checked" id="checkboxes-5">
                                <b-form-checkbox value="me">Согласен(-на) с правилами</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>

                        <b-button type="submit" squared class="btn" variant="primary">Зарегистрироваться</b-button>
                    </b-form>
                </div>
            </div>
            <b-button squared class="bottom-form__button" variant="primary" @click.prevent="$router.push('/login')">Войти в аккаунт</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: '',
            name: '',
            surname: '',
            checked: null,
        }),
        methods: {
            async onSubmit() {
                try {
                    const uid = await this.$store.dispatch('register', {
                        email: this.email,
                        password: this.password,
                        firstName: this.name,
                        surName: this.surname
                    })
                    await this.$router.push(`/profile/${uid}`)
                } catch (e) {
                    console.log()
                }

            },
        }
    }
</script>