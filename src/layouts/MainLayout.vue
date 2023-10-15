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
            <a class="btn-floating btn-large blue" href="#">
                <i class="large material-icons">add</i>
            </a>
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
