<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">{{
                        'Exchange_Rate' | localize
                    }}</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>{{ 'Currency' | localize }}</th>
                            <th>{{ 'Rate' | localize }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="currency in currencies" :key="currency">
                            <td>{{ currency }}</td>
                            <td>{{ rates[currency].value.toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeCurrency',
    props: ['rates'],
    data() {
        return {
            currencies: ['RUB', 'USD', 'EUR'],
        };
    },
};
</script>
