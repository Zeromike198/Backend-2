"use strict";

const { checkEmpty, checkNatural } = require("../../helpers/validator");

/**
 * User base class.
 *
 * @class UserBase
 * @abstract
 */
exports.UserBase = class UserBase {

  /**
   * User base constructor.
   *
   * @param {number} id User identification
   * @param {string} name User name
   */
  constructor(id, name) {
    this._id = checkNatural(id, `id is not valid`);
    this._name = checkEmpty(name, `name is not valid`);
  }

  /** Set user name. */
  set name(name) { this._name = checkEmpty(name); }

  /** User identification. */
  get id() { return this._id; }

  /** User name. */
  get name() { return this._name; }

}
