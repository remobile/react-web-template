module.exports = {
    genQRString (type, id) {
        const str = JSON.stringify({ c: 's', t: type, d: id });
        let output = '';
        for (let x = 0, y = str.length, charCode, hexCode; x < y; ++x) {
            charCode = str.charCodeAt(x);
            if (charCode < 128) {
                charCode += 128;
            } else if (charCode > 127) {
                charCode -= 128;
            }
            charCode = 255 - charCode;
            hexCode = charCode.toString(16);
            if (hexCode.length < 2) {
                hexCode = '0' + hexCode;
            }
            output += hexCode;
        }
        return output;
    },
    getQRResult (str) {
        let output = '';
        for (let x = 0, y = str.length, charCode, hexCode; x < y; x += 2) {
            hexCode = str.substr(x, 2);
            charCode = parseInt(hexCode, 16);
            charCode = 255 - charCode;
            if (charCode < 128) {
                charCode += 128;
            } else if (charCode > 127) {
                charCode -= 128;
            }
            output += String.fromCharCode(charCode);
        }
        try {
            const result = JSON.parse(output);
            if (result.c !== 's') {
                return undefined;
            }
            return { type: result.t, id: result.d };
        } catch (e) {
            return undefined;
        }
    },
};
