import firebase from "firebase"

export default {
    state: {
        info: {},
        posts: [],
        friends: [],
        requests: []
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        },
        clearPosts(state) {
            state.posts = []
        },
        addPost(state, post) {
            state.posts.push(post)
        },
        setPosts(state, posts) {
            state.posts = posts
        },
        addFriend(state, id) {
            state.friends.push(id)
        },
        setFriends(state, friends) {
            state.friends = friends
        },
        clearFriends(state) {
            state.friends = []
        },
        deletePost(state, id) {
            for (let post in state.posts) {
                if (state.posts[post].id === id) {
                    state.posts.splice(post, 1)
                    break
                }
            }
        },
        setRequests(state, requests) {
            state.requests = requests
        },
        clearRequests(state) {
            state.requests = []
        }
    },
    getters: {
        info: s => s.info,
        posts: s => s.posts !== [] ? s.posts : null,
        friends: s => s.friends !== [] ? s.friends : null,
        requests: s => s.requests !== [] ? s.requests : null,
        
    },
    actions: {
        async getInfo(context, id) {
            return (await firebase.firestore().collection('users').doc(id).get()).data()
        },
        async updateInfo(context, toUpdate) {
            const uid = await context.dispatch('getUid')
            const db = firebase.firestore()
            await db.collection('users').doc(uid).update(toUpdate)
        }
    }
}