import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        error: null,
    },
    getters: {
        error: (s) => s.error,
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER;
            const res = await fetch(
                `http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,RUB`
            );
            const data = await res.json();
            return data;
        },
    },
    modules: {
        auth,
        info,
    },
});
