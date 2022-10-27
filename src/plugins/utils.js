export const Utils = {
    formatCurrency(value){
    let val = (value / 1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatCPF(value){
        return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
    formatDate(value){
        value = new Date(value);
        let date, month, year;

        date = value.getDate();
        month = value.getMonth() + 1;
        year = value.getFullYear();

        date = date
            .toString()
            .padStart(2, '0');

        month = month
            .toString()
            .padStart(2, '0');

        return `${date}/${month}/${year}`;
    }
}