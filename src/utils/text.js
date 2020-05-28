const numeral = require('numeral')
// load a locale
numeral.register('locale', 'vi-VN', {
    delimiters: {
        thousands: ' ',
        decimal: ',',
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
    },
    ordinal: function(number) {
        return number === 1 ? 'er' : 'ème'
    },
    currency: {
        symbol: 'đ',
    },
})

// switch between locales
// numeral.locale('fr');
export const formatNumber = x => {
    if (x && typeof x === 'number') {
        if (x < 1000) {
            return x.toString()
        }
        const rs = numeral(x).format('0.0a')
        return rs
    }
    return x
}