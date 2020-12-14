<template>
    <Loader v-if="loading" :size="7"/>
    <div v-else>
        <form @submit.prevent="onSubmit" class="col-8 m-auto pt-3">
            <h2>Описание профиля:</h2>
            <b-form-textarea
                    id="textarea-rows"
                    placeholder="Пишите что хотите!"
                    rows="5"
                    v-model.trim="description"
            ></b-form-textarea>
            <h2>Ваш аватар</h2>
            <b-form-file
                    v-model="file1"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/*"
            ></b-form-file>
            <div class="mt-3">Выбранный файл: {{ file1 ? file1.name : '' }}</div>
            <b-button variant="primary" type="submit">
                <b-icon icon="box-arrow-in-right"/>
                Обновить профиль
            </b-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data: () => ({
            file1: null,
            description: '',
            loading: false
        }),
        methods: {
            async onSubmit() {
                try {
                    this.loading = true
                    if (this.description !== '') {
                        const info = this.$store.getters.info
                        await this.$store.dispatch('updateInfo', {description: this.description})
                        info.description = this.description
                        this.$store.commit('setInfo', info)
                    }
                    if (this.file1) {
                        await this.$store.dispatch('setAvatar', {avatar: this.file1})
                    }
                    this.loading = false
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>