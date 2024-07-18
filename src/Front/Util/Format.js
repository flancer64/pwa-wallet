/**
 * This is a set of pure functions to format data.
 */
export default class Wallet_Front_Util_Format {
    /**
     * Convert local date to YYYY/MM/DD.
     * @param {Date|string|null} dateIn
     * @param {boolean} withYear
     * @return {string}
     */
    date(dateIn = null, withYear = true) {
        /** @type {Date} */
        const date = (dateIn) ?
            (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
            new Date();
        const y = (withYear) ? date.getFullYear() + '/' : '';
        const m = `${date.getMonth() + 1}`.padStart(2, '0');
        const d = `${date.getDate()}`.padStart(2, '0');
        return `${y}${m}/${d}`;
    }

    /**
     * Convert local date to YYYY/MM/DD HH:MM:SS.
     * @param {Date|string|null} dateIn
     * @param {boolean} withSeconds
     * @param {boolean} withYear
     * @return {string}
     */
    dateTime(dateIn = null, withSeconds = true, withYear = true) {
        /** @type {Date} */
        const date = (dateIn) ?
            (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
            new Date();
        const y = date.getFullYear();
        const m = `${date.getMonth() + 1}`.padStart(2, '0');
        const d = `${date.getDate()}`.padStart(2, '0');
        const h = `${date.getHours()}`.padStart(2, '0');
        const i = `${date.getMinutes()}`.padStart(2, '0');
        const s = `${date.getSeconds()}`.padStart(2, '0');
        const ymd = (withYear) ? `${y}/${m}/${d}` : `${m}/${d}`;
        const time = (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
        return `${ymd} ${time}`;
    }

    /**
     * Convert local time to HH:MM:SS.
     * @param {Date|string|null} dateIn
     * @param {boolean} withSeconds
     * @return {string}
     */
    time(dateIn = null, withSeconds = true) {
        /** @type {Date} */
        const date = (dateIn) ?
            (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
            new Date();
        const h = `${date.getHours()}`.padStart(2, '0');
        const i = `${date.getMinutes()}`.padStart(2, '0');
        const s = `${date.getSeconds()}`.padStart(2, '0');
        return (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
    }
}
