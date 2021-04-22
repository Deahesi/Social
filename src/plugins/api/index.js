export default {
    install(Vue) {
        Vue.prototype.$api = async function (url) {
            return await (await fetch(url)).json()
        }
    }
}