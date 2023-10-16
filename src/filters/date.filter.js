export default function dateFilter(value) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(value).toLocaleDateString('ru-RU', options);
}
