"use strict";

const { ArticleBase } = require("./article_base");
const { checkEmpty } = require("../../helpers/validator");

/**
 * Article class.
 *
 * @class Article
 */
exports.Article = class Article extends ArticleBase {
  /**
   * Article constructor
   *
   * @param {number} sku Stock keep unique
   * @param {string} name Article name
   * @param {string} description Article description
   * @param {string} brand Article brand
   */
  constructor(sku, name, description, brand) {
    super(sku, description);
    this._name = checkEmpty(name);
    this._brand = checkEmpty(brand);
  }

  /** Set article name. */
  set name(name) { this._name = checkEmpty(name); }

  /** Set article brand. */
  set brand(brand) { this._brand = checkEmpty(brand); }

  /** Article name. */
  get name() { return this._name; }

  /** Article brand. */
  get brand() { return this._brand; }

  /** Get the JSON object. */
  get json() {
    return {
      sku: this._sku,
      name: this._name,
      desc: this._desc,
      breand: this._brand
    };
  }

}
