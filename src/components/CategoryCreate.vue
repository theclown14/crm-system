<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'Category_Create' | localize }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{
                            invalid: $v.title.$dirty && !$v.title.required,
                        }" />
                    <label for="name">{{ 'Input_Title' | localize }}</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.title.$dirty && !$v.title.required">
                        <label for="name">{{
                            'Enter_Category_Title' | localize
                        }}</label>
                    </span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model="limit"
                        :class="{
                            invalid: $v.limit.$dirty && !$v.limit.minValue,
                        }" />
                    <label for="limit">{{ 'Limit' | localize }}</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.limit.$dirty && !$v.limit.minValue">
                        {{ 'Enter_Limit' | localize }}
                        {{ $v.limit.$params.minValue.min }}</span
                    >
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ 'Create' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
export default {
    data: () => ({
        title: '',
        limit: 1,
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(100) },
    },
    mounted() {
        window.M.updateTextFields();
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            try {
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit,
                });
                this.title = '';
                this.limit = 100;
                this.$v.$reset();
                this.$message('Категория была создана');
                this.$emit('created', category);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
