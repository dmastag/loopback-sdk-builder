
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieBrowser
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/

export class CookieBrowser {
  
  /**
   * @type {CookieInterface}
   **/
  cookies = {};
  /**
   * @method get
   * @param {string} key Cookie key name
   * @return {any}
   * @description
   * The getter will return any type of data persisted in cookies.
   **/
  get(key) {
    if (!this.cookies[key]) {
      let cookie = window.document
                         .cookie.split('; ')
                         .filter((item) => item.split('=')[0] === key).pop();
      if (!cookie) {
        return null;
      }

      this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
    }

    return this.cookies[key];
  }
  /**
   * @method set
   * @param {string} key Cookie key name
   * @param {any} value Any value
   * @param {Date=} expires The date of expiration (Optional)
   * @return {void}
   * @description
   * The setter will return any type of data persisted in cookies.
   **/
  set(key, value, expires) {
    this.cookies[key] = value;
    let cookie = `${key}=${value}; path=/${expires ? `; expires=${ expires.toUTCString() }` : ''}`;
    window.document.cookie = cookie;
  }
  /**
   * @method remove
   * @param {string} key Cookie key name
   * @return {void}
   * @description
   * This method will remove a cookie from the client.
   **/
  remove(key) {
    document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete this.cookies[key];
  }
  /**
   * @method parse
   * @param {any} value Input data expected to be JSON
   * @return {void}
   * @description
   * This method will parse the string as JSON if possible, otherwise will
   * return the value itself.
   **/
  parse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
  }
  
}
