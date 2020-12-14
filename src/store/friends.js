import firebase from 'firebase'

export default {
    actions: {
        async searchFriends(context, value) {
            try {
                const db = firebase.firestore()
                const uid = await context.dispatch('getUid')
                const usersGet = await db.collection('users').get()
                const users = []
                usersGet.forEach((doc) => {
                    users.push({
                        id: doc.id,
                        name: (doc.data()).name.toLowerCase(),
                        firstName: (doc.data()).firstName,
                        surName: (doc.data()).surName,
                    })
                })
                const findedUsers = users.filter((item) => {
                    return item.name.includes(value.toLowerCase()) && item.id !== uid
                })
                
                return findedUsers
            } catch (e) {
                console.log(e)
            }
        },
        async addFriend(context, id) {
            try {
                const db = firebase.firestore()
                const uid = await context.dispatch('getUid')
                const friendRequest = ((await db.collection('users').doc(id).get()).data()).friendRequest || []
                for (const request in friendRequest) {
                    if (friendRequest[request] === uid) {
                        return
                    }
                }
                friendRequest.push(uid)
                context.commit('setRequests', friendRequest)
                await db.collection('users').doc(id).update({
                    friendRequest
                })
            } catch (e) {
                console.log(e)
            }
        },
        async getRequests(context) {
            const db = firebase.firestore()
            const uid = await context.dispatch('getUid')
            const friendRequest = ((await db.collection('users').doc(uid).get()).data()).friendRequest || []
            context.commit('setRequests', friendRequest)
            return friendRequest
        },
        async submitRequest(context, id) {
            try {
                const db = firebase.firestore()
                const rd = firebase.database()
                const uid = await context.dispatch('getUid')
                const friendRequest = context.getters.requests
                friendRequest.splice(friendRequest.indexOf(id), 1)
                context.commit('setRequests', friendRequest)
                const friends = context.getters.friends
                const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
                const dialogId = uuid()
                friends.push({
                    id,
                    dialogId
                })
                context.commit('setFriends', friends)
                await db.collection('users').doc(uid).update({
                    friendRequest,
                    friends
                })
                const friendFriends = ((await (db.collection('users').doc(id).get())).data()).friends || []
                friendFriends.push({id: uid, dialogId})
                await db.collection('users').doc(id).update({
                    friends: friendFriends
                })
                await rd.ref(`dialogs/${dialogId}/`).set({
                    user1Id: uid,
                    user2Id: id
                })
            } catch (e) {
                console.log(e)
            }
            
        },
        async fetchFriends(context) {
            try {
                const db = firebase.firestore()
                const uid = await context.dispatch('getUid')
                const friends = ((await db.collection('users').doc(uid).get()).data()).friends
                context.commit('setFriends', friends || [])
                return friends
            } catch (e) {
                console.log(e)
            }
        }
    }
}