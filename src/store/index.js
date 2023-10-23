import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

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
            const res = await fetch(
                `https://api.currencyapi.com/v3/latest?apikey=w6LQFlC4KUKLzYvnyUktbM1Ecu7W8Vjyy4wPyHCZ&currencies=EUR%2CUSD%2CRUB`
            );
            const data = await res.json();
            return data;
        },
    },
    modules: {
        auth,
        info,
        category,
        record,
    },
});
