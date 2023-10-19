<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <LoaderItem v-if="loading" />
        <p class="center" v-else-if="!categories.length">
            Нет категорий.
            <router-link to="/categories">Создать категорию</router-link>
        </p>
        <form class="form" v-else>
            <div class="input-field">
                <select ref="select">
                    <option>name cat</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income" />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome" />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input id="amount" type="number" />
                <label for="amount">Сумма</label>
                <span class="helper-text invalid">amount пароль</span>
            </div>

            <div class="input-field">
                <input id="description" type="text" />
                <label for="description">Описание</label>
                <span class="helper-text invalid">description пароль</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import LoaderItem from '@/components/app/LoaderItem';

export default {
    name: 'RecordPage',
    components: {
        LoaderItem,
    },
    data() {
        return {
            categories: [],
            select: null,
            loading: true,
        };
    },
    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories');
        this.loading = false;
        this.select = window.M.FormSelect.init(this.$refs.select);
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
        }
    },
};
</script>
