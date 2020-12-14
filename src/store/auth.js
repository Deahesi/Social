import firebase from 'firebase'

export default {
    actions: {
        async register(context, {email, password, firstName, surName}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await context.dispatch('getUid')
                const db = firebase.firestore()
                await db.collection('users').doc(uid).set({
                    firstName,
                    surName,
                    name: firstName + ' ' + surName
                })
                context.commit('setInfo', {firstName, surName})
                return uid
            } catch (e) {
                context.commit('setError', e)
                throw e
            }

        },
        async login(context, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                const uid = await context.dispatch('getUid')
                const db = firebase.firestore()
                context.commit('setInfo', (await db.collection('users').doc(uid).get()).data())
                return uid
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async logout(context) {
            try {
                await firebase.auth().signOut()
                context.commit('clearInfo')
                context.commit('clearFriends')
                context.commit('clearPosts')
                context.commit('clearMessages')
                context.commit('clearRequests')
            } catch (e) {
                context.commit('setError', e.code)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}