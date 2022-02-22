"use strict";

const { ArticleBase } = require("./article_base");
const { checkDate, checkNatural } = require("../../helpers/validator");

/**
 * Sale class.
 *
 * @class Sale
 */
exports.Sale = class Sale extends ArticleBase {
  /**
   * Sale constructor
   *
   * @param {number} id Sale identification
   * @param {number} sku Article SKU
   * @param {number} client Client code
   * @param {number|null} payment Payment reference
   * @param {string} observations Sale observations
   * @param {Date} date Sale date
   */
  constructor(id, sku, client, payment, observations, date) {
    super(sku, observations);
    this._id = checkNatural(id);
    this._client = checkNatural(client);
    this._payment = payment === null ? null : checkNatural(payment);
    this._date = checkDate(date);
  }

  /** Sale identification. */
  get id() { return this._id; }

  /** Client code. */
  get client() { return this._client; }

  /** Paument reference. */
  get payment() { return this._payment; }

  /** Sale observations. */
  get observations() { return this.desc; }

  /** Sale client trustworthyness. */
  get trustworthy() { return this._payment !== null; }

  /** Sale date. */
  get date() { return this._date; }

  /** Get the JSON object. */
  get json() {
    return {
      id: this._id,
      sku: this._sku,
      client: this._client,
      payment: this._payment,
      trustworthy: this.trustworthy,
      observations: this._observations,
      date: this._date
    };
  }
}
