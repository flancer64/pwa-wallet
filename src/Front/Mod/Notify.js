/**
 * The wrapper for the Quasar Notify functionality.
 */
export default class Wallet_Front_Mod_Notify {
    constructor() {
        // VARS
        const {Notify} = self.window.Quasar; // get the part of the Quasar UMD
        const timeout = 4000; // 4 seconds
        const position = 'bottom-right'; // where to show the message

        // FUNCS
        function _notify(message, type) {
            Notify.create({
                message,
                position,
                timeout,
                type,
                actions: [
                    {icon: 'close', round: true}
                ]
            });
        }

        // INSTANCE METHODS

        this.info = function (message) {
            _notify(message, 'info');
        };
        this.negative = function (message) {
            _notify(message, 'negative');
        };

        this.ongoing = function (message) {
            _notify(message, 'ongoing');
        };

        this.positive = function (message) {
            _notify(message, 'positive');
        };

        this.warning = function (message) {
            _notify(message, 'warning');
        };
    }
}
