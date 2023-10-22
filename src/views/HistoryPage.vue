<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>
        <!-- <Pie id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
        <LoaderItem v-if="loading" />
        <p class="center" v-else-if="!records.length">
            Записей пока нет.
            <router-link to="/record">Создать запись</router-link>
        </p>
        <section v-else>
            <HistoryTable :records="records" />
        </section>
    </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';

import { Pie } from 'vue-chartjs';

export default {
    name: 'HistoryPage',
    components: { HistoryTable },
    extends: Pie,
    data() {
        return {
            loading: true,
            records: [],
            categories: [],
        };
    },
    async mounted() {
        this.records = await this.$store.dispatch('fetchRecords');
        this.categories = await this.$store.dispatch('fetchCategories');

        this.setup();

        this.loading = false;
    },
    methods: {
        setup() {
            this.records = this.records.map((record) => {
                return {
                    ...record,
                    categoryName: this.categories.find(
                        (c) => c.id === record.categoryId
                    ).title,
                    typeClass: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ? 'Доход' : 'Расход',
                };
            });

            this.renderChart({
                labels: this.categories.map((c) => c.title),
                datasets: [
                    {
                        label: 'Расходы по категориям',
                        data: this.categories.map((c) => {
                            return this.records.reduce((total, r) => {
                                if (
                                    r.categoryId === c.id &&
                                    r.type === 'outcome'
                                ) {
                                    total += +r.amount;
                                }
                                return parseInt(total);
                            }, 0);
                        }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                    },
                ],
            });
        },
    },
};
</script>
