<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Bill' | localize }}</h3>

            <button
                class="btn waves-effect waves-light btn-small"
                @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <LoaderItem v-if="loading" />
        <div v-else class="row">
            <HomeBill :rates="currency.data" />
            <HomeCurrency :rates="currency.data" />
        </div>
    </div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';

export default {
    name: 'HomeView',
    metaInfo() {
        return { title: this.$title('Menu_Bills') };
    },
    data() {
        return {
            loading: true,
            currency: null,
        };
    },
    async mounted() {
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;
    },
    components: {
        HomeBill,
        HomeCurrency,
    },
    methods: {
        async refresh() {
            this.loading = true;
            this.currency = await this.$store.dispatch('fetchCurrency');
            this.loading = false;
        },
    },
};
</script>
