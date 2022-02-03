/**
 * @param {Uint8Array} bytes
 * @return {string} Base64 encoded string
 */
 function base64Encode(bytes) {
    let encoding = '';
    for (let group of groups24Bits(bytes)) {
       for (let value of values6Bits(group)) {
          if (value !== undefined) {
             encoding += ALPHABET[value];
          } else {
             encoding += PAD;
          }
       }
    }
    return encoding;
 }
 
 const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
 const PAD = '=';
 
 /**
  * @param {Uint8Array} bytes
  * @return {Uint8Array} The next input group (yielded on each execution)
  */
 function* groups24Bits(bytes) {
    for (let i = 0; i < bytes.length; i += 3) {
       yield bytes.slice(i, i + 3); // 3 bytes/3 octets/24 bits
    }
 }
 
 /**
  * @param {Uint8Array} group Expected to be array of 1 to 3 bytes
  * @return {number|undefined} The next 6-bit value from the 
  * input group (yielded on each execution)
  */
 function* values6Bits(group) {
    const paddedGroup = Uint8Array.from([0, 0, 0]);
    paddedGroup.set(group);
 
    let numValues = Math.ceil((group.length * 8) / 6);
    for (let i = 0; i < numValues; i++) { let base64Value; 
    if (i == 0) { base64Value = (paddedGroup[0] & 0b11111100) >> 2;
       } else if (i == 1) {
          base64Value = (paddedGroup[0] & 0b00000011) << 4; base64Value = base64Value | ((paddedGroup[1] & 0b11110000) >> 4);
       } else if (i == 2) {
          base64Value = (paddedGroup[1] & 0b00001111) << 2; base64Value = base64Value | ((paddedGroup[2] & 0b11000000) >> 6);
       } else if (i == 3) {
          base64Value = paddedGroup[2] & 0b00111111;
       }
       yield base64Value;
    }
 
    let numPaddingValues = 4 - numValues;
    for (let j = 0; j < numPaddingValues; j++) {
       yield undefined;
    }
 }