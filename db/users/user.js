"use strict";

const { UserBase } = require("./user_base");
const { checkBoolean, checkEmpty } = require("../../helpers/validator");


/**
 * User class
 *
 * @class User
 */
exports.User = class User extends UserBase {

  /**
   * User constructor.
   *
   * @param {number} id User identification
   * @param {string} username User name
   * @param {boolean} admin User administrator flag
   * @param {string} password User password
   */
  constructor(id, username, admin, password) {
    super(id, username);
    this._admin = checkBoolean(admin, `admin is not valid`);
    this._password = checkEmpty(password, `password is not valid`);
  }

  /** Set user administrator flag. */
  set admin(admin) { this._admin = checkBoolean(admin); }

  /**
   * Set the user password.
   *
   * @param {string} password User password
   */
  set password(password) { this._password = checkEmpty(password); }

  /** Username. */
  get username() { return this._name; }

  /** User administrator flag. */
  get admin() { return this._admin; }

  /** Get the JSON object. */
  get json() {
    return {
      id: this._id,
      username: this._username,
      admin: this._admin,
      password: this._password
    };
  }

  /**
   * Check if the given password match.
   *
   * @param {string} pass Password to check
   * @returns `true` is the password match
   */
  checkPassword(pass) {
    return this._password === pass;
  }

}
