<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Menu_NewRecord' | localize }}</h3>
        </div>

        <LoaderItem v-if="loading" />
        <p class="center" v-else-if="!categories.length">
            {{ 'Caterogies_Not_Found' | localize }}.
            <router-link to="/categories">{{
                'Category_Create' | localize
            }}</router-link>
        </p>
        <form class="form" v-else @submit.prevent="submitHandler">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id">
                        {{ category.title }}
                    </option>
                </select>
                <label>{{ 'Category_Choose' | localize }}</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type" />
                    <span>{{ 'Icome' | localize }}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome"
                        v-model="type" />
                    <span>{{ 'Outcome' | localize }}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="number"
                    v-model.number="amount"
                    :class="{
                        invalid: $v.amount.$dirty && !$v.amount.minValue,
                    }" />
                <label for="amount">{{ 'Amount' | localize }}</label>
                <span
                    v-if="$v.amount.$dirty && !$v.amount.minValue"
                    class="helper-text invalid"
                    >{{ 'Enter_Min_Value' | localize }}
                    {{ $v.amount.$params.minValue.min }}</span
                >
            </div>

            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model.number="description"
                    :class="{
                        invalid:
                            $v.description.$dirty && !$v.description.required,
                    }" />
                <label for="description">{{ 'Description' | localize }}</label>
                <span
                    class="helper-text invalid"
                    v-if="$v.description.$dirty && !$v.description.required"
                    >{{ 'Enter_Description' | localize }}
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'Create' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
    name: 'RecordPage',
    metaInfo() {
        return { title: this.$title('Menu_NewRecord') };
    },
    data() {
        return {
            categories: [],
            select: null,
            loading: true,
            category: null,
            type: 'outcome',
            amount: 1,
            description: '',
        };
    },
    validations: {
        amount: { minValue: minValue(1) },
        description: { required },
    },
    async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories');
        this.loading = false;

        if (this.categories.length) {
            this.category = this.categories[0].id;
        }

        setTimeout(() => {
            this.select = window.M.FormSelect.init(this.$refs.select);
            window.M.updateTextFields();
        }, 0);
    },
    computed: {
        ...mapGetters(['info']),
        canCreateRecord() {
            if (this.type === 'income') {
                return true;
            }
            return this.info.bill >= this.amount;
        },
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            if (this.canCreateRecord) {
                try {
                    const record = await this.$store.dispatch('createRecord', {
                        categoryId: this.category,
                        amount: this.amount,
                        description: this.description,
                        type: this.type,
                        date: new Date().toJSON(),
                    });
                    const bill =
                        this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount;
                    await this.$store.dispatch('updateInfo', { bill });

                    this.$message('Запись была создана');
                    this.$v.$reset();
                    this.description = '';
                    this.amount = 1;
                } catch (e) {
                    console.log(e);
                }
            } else {
                this.$message('Недостаточно средств');
            }
        },
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
        }
    },
};
</script>
