/**
 * Convert a types of the bar codes for different libs.
 */
export default class Wallet_Front_Util_CodeType {
    /**
     * @param {typeof Wallet_Front_Enum_Code_Type} TYPE
     */
    constructor(
        {
            Wallet_Front_Enum_Code_Type$: TYPE,
        }
    ) {

        /**
         * Convert 'html5-qrcode' into internal enum.
         * @param {string} code
         * @return {null|string}
         * @see Wallet_Front_Enum_Code_Type
         */
        this.fromHtml5Qrcode = function (code) {
            switch (code) {
                case 'AZTEC':
                    return TYPE.AZTEC;
                case 'CODABAR':
                    return TYPE.CODABAR;
                case 'CODE_128':
                    return TYPE.CODE_128;
                case 'CODE_39':
                    return TYPE.CODE_39;
                case 'CODE_93':
                    return TYPE.CODE_93;
                case 'DATA_MATRIX':
                    return TYPE.DATA_MATRIX;
                case 'EAN_13':
                    return TYPE.EAN_13;
                case 'EAN_8':
                    return TYPE.EAN_8;
                case 'ITF':
                    return TYPE.ITF;
                case 'MAXICODE':
                    return TYPE.MAXICODE;
                case 'PDF_417':
                    return TYPE.PDF_417;
                case 'QR_CODE':
                    return TYPE.QR_CODE;
                case 'RSS_14':
                    return TYPE.RSS_14;
                case 'RSS_EXPANDED':
                    return TYPE.RSS_EXPANDED;
                case 'UPC_A':
                    return TYPE.UPC_A;
                case 'UPC_E':
                    return TYPE.UPC_E;
                case 'UPC_EAN_EXTENSION':
                    return TYPE.UPC_EAN_EXTENSION;
            }
            return null;
        };

        /**
         * Convert internal enum into 'bwipjs' code.
         * @param {string} code
         * @see Wallet_Front_Enum_Code_Type
         * @return {null|string}
         */
        this.toBwipjs = function (code) {
            switch (code) {
                case TYPE.AZTEC:
                    return 'azteccode';
                case TYPE.CODABAR:
                    return 'rationalizedCodabar';
                case TYPE.CODE_128:
                    return 'code128';
                case TYPE.CODE_39:
                    return 'code39';
                case TYPE.CODE_93:
                    return 'code93';
                case TYPE.DATA_MATRIX:
                    return 'datamatrix';
                case TYPE.EAN_13:
                    return 'ean13';
                case TYPE.EAN_8:
                    return 'ean8';
                case TYPE.ITF:
                    return 'itf14';
                case TYPE.MAXICODE:
                    return 'maxicode';
                case TYPE.PDF_417:
                    return 'pdf417';
                case TYPE.QR_CODE:
                    return 'qrcode';
                // case TYPE.RSS_14:
                //     return TYPE.RSS_14;
                // case TYPE.RSS_EXPANDED:
                //     return TYPE.RSS_EXPANDED;
                case TYPE.UPC_A:
                    return 'upca';
                case TYPE.UPC_E:
                    return 'upce';
                // case TYPE.UPC_EAN_EXTENSION:
                //     return TYPE.UPC_EAN_EXTENSION;
            }
            return null;
        };

    }


}
