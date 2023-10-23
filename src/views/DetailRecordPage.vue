<template>
    <div>
        <LoaderItem v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <route-link to="/history" class="breadcrumb"
                    >История</route-link
                >
                <a class="breadcrumb" @click.prevent>
                    {{ record.type === 'income' ? 'Доход' : 'Расход' }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                        class="card"
                        :class="{
                            green: record.type === 'income',
                            red: record.type === 'outcome',
                        }">
                        <div class="card-content white-text">
                            <p>Описание: {{ record.description }}</p>
                            <p>Сумма:{{ record.amount | currency('RUB') }}</p>
                            <p>Категория: {{ record.categoryName }}</p>

                            <small>{{ record.date | date('datetime') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else>Такой записи нет</p>
    </div>
</template>

<script>
export default {
    name: 'DetailRecordPage',
    metaInfo() {
        return { title: this.$title('Menu_NewRecord') };
    },
    data() {
        return {
            record: null,
            loading: true,
        };
    },
    async mounted() {
        const id = this.$route.params.id;
        const record = await this.$store.dispatch('fetchRecordById', id);
        const category = await this.$store.dispatch(
            'fetchCategoryById',
            record.categoryId
        );
        this.record = {
            ...record,
            categoryName: category.title,
        };
        this.loading = false;
    },
};
</script>
