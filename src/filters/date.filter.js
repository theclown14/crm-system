import store from '@/store';

export default function dateFilter(value) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const locale = store.getters.info.locale || 'ru-RU';
    return new Date(value).toLocaleDateString(locale, options);
}
