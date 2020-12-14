import firebase from "firebase"

export default {
    state: {
        messages: {}
    },
    actions: {
        async getDialogInfo(context, id) {
            try {
                const db = firebase.database()
                return (await (db.ref(`dialogs/${id}`).once('value'))).val()
            } catch (e) {
                console.log(e)
            }
        },
        async addMessage(context, dialogId) {
            try {
                const db = firebase.database()
                await db.ref(`dialogs/${dialogId}`).update({
                    messages: context.getters.messages[dialogId].messages
                })
            } catch (e) {
                console.log(e)
            }
        }
    },
    mutations: {
        addMessage(state, {message, id, whoSend}) {
            state.messages[id] = state.messages[id] || {
                messages: []
            }
            state.messages[id].messages.push({message, whoSend})
        },
        setMessages(state, {messages, id}) {
            state.messages[id] = state.messages[id] || {
                messages: []
            }
            state.messages[id].messages = messages
        },
        clearMessages(state) {
            state.messages = {}
        }
    },
    getters: {
        messages: s => s.messages
    }
}