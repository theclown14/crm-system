import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import massegePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

// Vue.config.productionTip = false;

Vue.use(massegePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

const firebaseConfig = {
    apiKey: 'AIzaSyA5wbC7-wb8GFJpe3R9EHrRhlL7d7jpoFA',
    authDomain: 'crm-system-8b3c6.firebaseapp.com',
    databaseURL: 'https://crm-system-8b3c6-default-rtdb.firebaseio.com',
    projectId: 'crm-system-8b3c6',
    storageBucket: 'crm-system-8b3c6.appspot.com',
    messagingSenderId: '240362101398',
    appId: '1:240362101398:web:8b04761434b9b5e7b980b7',
};

firebase.initializeApp(firebaseConfig);

// const auth = getAuth(app);
let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount('#app');
    }
});
