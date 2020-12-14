export default {
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state, error) {
            state.error = error
        }
    },
    getters: {
        error: s => s.error
    }
}