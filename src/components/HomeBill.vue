<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{ 'Currency_Bill' | localize }}</span>

                <p
                    v-for="currency in currencies"
                    :key="currency"
                    class="currency-line">
                    <span>{{
                        getCurrency(currency) | currency(currency)
                    }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['rates'],
    data() {
        return {
            currencies: ['RUB', 'USD', 'EUR'],
        };
    },
    computed: {
        base() {
            return (
                this.$store.getters.info.bill /
                (this.rates.RUB.value / this.rates.EUR.value)
            );
        },
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.base * this.rates[currency].value);
        },
    },
};
</script>
