var CryptoJS = require('crypto-js');    
var key = '' //加密秘钥  
var iv = ''   //偏移量  
module.exports = {   
    /**  
     * 加密  
     */  
    encryptByDES:function (account, password, newPassword) {
	var keyStr = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Latin1);
	var accountBase64Str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(account));
	var plainText = accountBase64Str;
	if (typeof password != "undefined") {
		plainText = plainText + "." + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
		if (typeof newPassword != "undefined") {
			plainText = plainText + "." + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(newPassword))
		}
	}
	var key = CryptoJS.enc.Latin1.parse(keyStr);
	var encryptedData = CryptoJS.AES.encrypt(plainText, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var encryptedBase64Str = encryptedData.toString();
	var encryptedStr = encryptedData.ciphertext.toString();
	var keyBase64Str = CryptoJS.enc.Base64.stringify(key);
	return encryptedBase64Str + "." + keyBase64Str
},

    /**  
     * 解密  
     */  
    decryptByDES:function (ciphertext) {   
        const keyHex = CryptoJS.enc.Utf8.parse(key);  
        // direct decrypt ciphertext  
        const decrypted = CryptoJS.TripleDES.decrypt({  
                    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)  
         }, keyHex, {  
                    iv: CryptoJS.enc.Utf8.parse(iv),  
                    mode: CryptoJS.mode.CBC,  
                    padding: CryptoJS.pad.Pkcs7  
        });  
        return decrypted.toString(CryptoJS.enc.Utf8);  
    }  
}