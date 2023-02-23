import validator from 'validator';
import moment from 'moment-timezone';

const username = 'asdasd0900909_.';

console.log('using validator', validator.matches(username, "^[a-z0-9_\.]*$"));

console.log('using username',/^[a-z0-9_\.]*$/.test(username));

console.log("undefined === ''", undefined === '');
console.log('validator.isEmpty undifined', validator.isEmpty(''));

console.log(new Date('06/28/2023'));
console.log('new Date ngaco',typeof new Date('sdsdsd06/28/2023'));
const tglNgaco = new Date('sdsdsdsdsd');
console.log(typeof tglNgaco);
console.log(tglNgaco instanceof Date);

console.log('6 jam', Date.now() + 6 * 60 * 60 * 1000);
console.log('jam biner:', Date.now());
console.log('benarkah 6 jam?', new Date(Date.now() + 6 * 60 * 60 * 1000 - Date.now())); // betul
console.log('benarkah 6 jam dari sekarang?', moment.tz(new Date(Date.now() + 6 * 60 * 60 * 1000), 'Asia/Jakarta')); // betul

/*
  sumber : https://stackoverflow.com/questions/59441959/validator-npm-username-validation
      https://www.w3docs.com/snippets/javascript/how-to-check-whether-a-string-matches-a-regex-in-javascript.html#:~:text=Regex%20or%20Regular%20expressions%20are%20patterns%20used%20for,match%20between%20a%20regex%20and%20a%20specified%20string.
*/