"use strict";

const { checkEmpty, checkNatural } = require("../../helpers/validator")

/**
 * Article base class.
 *
 * @class ArticleBase
 * @abstract
 */
exports.ArticleBase = class ArticleBase {

  /**
   * ArticleBase constructor
   *
   * @param {number} sku Stock keep unique
   * @param {string} desc Article description
   */
  constructor(sku, desc) {
    this._sku = checkNatural(sku);
    this._desc = checkEmpty(desc);
  }

  /** Set article SKU. */
  set sku(sku) { this._sku = checkNatural(sku); }

  /** Set article description. */
  set desc(desc) { this._desc = checkEmpty(desc); }

  /** Article SKU. */
  get sku() { return this._sku; }

  /** Article description. */
  get desc() { return this._desc; }

}
