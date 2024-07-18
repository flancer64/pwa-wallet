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

    }


}
