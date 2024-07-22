/**
 * This is a set of pure functions to handle geo data.
 */
export default class Wallet_Front_Util_Geo {
    /**
     * @param {Wallet_Front_Dto_Geo} dtoGeo
     */
    constructor(
        {
            Wallet_Front_Dto_Geo$: dtoGeo,
        }
    ) {
        // VARS
        const POS_ACCURACY_METERS = 10;

        // INSTANCE'S METHODS
        /**
         * Wrapper for Geolocation API to get the current position with predefined approximation.
         * @return {Promise<Wallet_Front_Dto_Geo.Dto>}
         */
        this.getCurrentPosition = async function () {
            const promise = new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {});
            });
            const pos = await promise;
            if (pos)
                return this.roundPosition(pos, POS_ACCURACY_METERS);
            else return null;
        };

        /**
         * Calculate the distance between 2 points (Haversine formula from AI).
         *
         * @param {number} lat1
         * @param {number} lng1
         * @param {number} lat2
         * @param {number} lng2
         * @return {number} distance in meters
         */
        this.calcDistance = function (lat1, lng1, lat2, lng2) {
            // Convert latitude and longitude from degrees to radians
            const toRadians = value => (value * Math.PI) / 180;
            lat1 = toRadians(lat1);
            lng1 = toRadians(lng1);
            lat2 = toRadians(lat2);
            lng2 = toRadians(lng2);
            // Haversine formula
            const dLat = lat2 - lat1;
            const dLng = lng2 - lng1;
            const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            // Radius of the Earth in meters (mean value)
            const R = 6371000; // 6371 km converted to meters
            // Calculate the distance
            return Math.round(R * c);
        };

        /**
         * Round the geolocation position up to 'meters'.
         * @param {GeolocationPosition} position
         * @param {number} meters accuracy in meters
         * @return {Wallet_Front_Dto_Geo.Dto}
         */
        this.roundPosition = function (position, meters) {
            // Calculate the number of decimal places needed
            const metersPerDegree = 111000; // Approximate meters per degree at the equator
            const decimalPlaces = Math.log10(metersPerDegree / meters);
            const factor = Math.pow(10, Math.floor(decimalPlaces));
            const res = dtoGeo.createDto();
            res.lat = Math.round(position.coords.latitude * factor) / factor;
            res.lng = Math.round(position.coords.longitude * factor) / factor;
            return res;
        };
    }

}
