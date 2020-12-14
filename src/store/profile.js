import firebase from "firebase"

export default {
    actions: {
        async addPost(context, postPayload) {
            try {
                const uid = await context.dispatch('getUid')
                const db = firebase.database()
                const post = await db.ref(`users/${uid}/posts`).push(postPayload)
                context.commit('addPost', {...postPayload, id: post.key})
                return {...postPayload, id: post.key}
            } catch (e) {
                console.log(e)
            }
        },
        async fetchPosts(context, id) {
            const db = firebase.database()
            const posts = (await db.ref(`users/${id}/posts`).once('value')).val() || null
            const retPosts = posts ? Object.keys(posts).map(key => ({...posts[key], id: key})) : []
            context.commit('setPosts', retPosts)
            return posts ? retPosts : null
        },
        async deletePost(context, id) {
            try {
                context.commit('deletePost', id)
                const uid = await context.dispatch('getUid')
                const db = firebase.database()
                await db.ref(`users/${uid}/posts/${id}`).remove()
            } catch (e) {
                console.log(e)
            }
        },
        async setAvatar(context, {avatar}) {
            const storage = firebase.storage()
            const uid = await context.dispatch('getUid')
            const ref = storage.ref(`users/${uid}/avatar`)
            const refToFile = await ref.listAll()
            if (refToFile.items[0]) {
                await storage.ref().child(refToFile.items[0].location.path_).delete()
            }
            const ext = (avatar.name.split('.')).pop()
            const avatarRef = ref.child(`avatar.${ext}`)
            await avatarRef.put(avatar)
        },
        async getAvatar(context, id) {
            try {
                const storage = firebase.storage()
                const ref = storage.ref(`users/${id}/avatar`)
                const refToFile = await ref.listAll()
                return storage.ref().child(refToFile.items[0].location.path_).getDownloadURL().then(function(url) {
                    return url
                }).catch(() => {
                    return ''
                })
            } catch (e) {
                return ''
            }
        }
    }
}