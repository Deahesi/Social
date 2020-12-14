<template>
    <b-card class="mb-3 card-post">
        <div class="post-mess">
            <b-avatar variant="info" :src="avatar" class="mr-3"></b-avatar>
            <b-card-text>
                {{message}}
            </b-card-text>
        </div>
        <div>
            <p class="text-sm-right date">{{date | dateFilter('datetime')}}</p>
            <b-icon icon="x-octagon" scale="1.5em"
                    class="float-right"
                    v-if="!active && yourProfile"
                    style="cursor: pointer"
                    @mouseenter="active = true"
                    @mouseleave="active = false"></b-icon>
            <b-icon icon="x-octagon" class="float-right" scale="1.5em"
                    v-else-if="active && yourProfile"
                    animation="spin"
                    style="cursor: pointer"
                    @mouseenter="active = false"
                    @mouseleave="active = false"
                    @click.prevent="deletePost"
            ></b-icon>
        </div>
    </b-card>
</template>

<script>
    export default {
        name: "Post",
        data: () => ({
           active: false
        }),
        methods: {
            async deletePost() {
                try {
                    await this.$store.dispatch('deletePost', this.id)
                } catch (e) {
                    console.log(e)
                }
            }
        },
        props: ['message', 'avatar', 'date', 'id', 'yourProfile']
    }
</script>

<style scoped>

</style>