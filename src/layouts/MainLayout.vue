<template>
    <div>
        <LoaderItem v-if="loading" />
        <div v-else class="app-main-layout">
            <NavigationBar @click="isOpen = !isOpen" />
            <SideBar v-model="isOpen" :key="locale" />
            <main class="app-content" :class="{ full: !isOpen }">
                <div class="app-page">
                    <router-view />
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link
                    class="btn-floating btn-large blue"
                    to="/record"
                    v-tooltip="'Создать новую запись'">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../components/app/NavigationBar';
import SideBar from '../components/app/SideBar';

import messages from '@/utils/messages';
export default {
    name: 'main-layout',
    data() {
        return {
            isOpen: true,
            loading: true,
        };
    },
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo');
        }
        this.loading = false;
    },
    components: {
        NavigationBar,
        SideBar,
    },
    computed: {
        error() {
            return this.$store.getters.error;
        },
        locale() {
            return this.$store.getters.info.locale;
        },
    },
    watch: {
        error(fbError) {
            this.$error(messages[fbError.code] || 'Что-то пошло не так');
        },
    },
};
</script>
