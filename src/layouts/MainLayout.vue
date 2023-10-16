<template>
    <div class="app-main-layout">
        <NavigationBar @click="isOpen = !isOpen" />
        <SideBar v-model="isOpen" />
        <main class="app-content" :class="{ full: !isOpen }">
            <div class="app-page">
                <router-view />
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../components/app/NavigationBar';
import SideBar from '../components/app/SideBar';
export default {
    name: 'main-layout',
    data() {
        return {
            isOpen: true,
        };
    },
    components: {
        NavigationBar,
        SideBar,
    },
};
</script>
