"use strict";

const { UserBase } = require("./user_base");
const { checkEmpty, checkNatural } = require(`../../helpers/validator`);

/**
 * Client class.
 *
 * @class Client
 */
exports.Client = class Client extends UserBase {

  /**
   * Client constructor.
   *
   * @param {number} id User identification
   * @param {number} code Client code
   * @param {string} name User name
   * @param {string} address Client address
   */
  constructor(id, code, name, address) {
    super(id, name);
    this._code = checkNatural(code, `code is not valid`);
    this._address = checkEmpty(address, `address is not valid`);
  }

  /** Client identification. */
  get id() { return this._id; }

  /** Client identification. */
  get code() { return this._code; }

  /** Client identification. */
  get address() { return this._address; }

  /** Get the JSON object. */
  get json() {
    return {
      id: this._id,
      code: this._code,
      name: this._name,
      address: this._address
    };
  }
};
