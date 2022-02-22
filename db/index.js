"use strict";

const { Article } = require("./stock/article");
const { Sale } = require("./stock/sale");
const { Client } = require("./users/client");
const { User } = require("./users/user");

/**
 * Users array.
 *
 * @type {User[]}
*/
let users = [
  new User(0, `Administrator`, true, `secretpass`)
];

/**
 * Clients array.
 *
 * @type {Client[]}
 */
let clients = [];

/**
 * Articles array.
 *
 * @type {Article[]}
 */
let articles = [];

/**
 * Sales array.
 *
 * @type {Sale[]}
 */
let sales = [];


/**
 * Get the users list.
 *
 * @returns Users list
 */
exports.getUsers = async () => users;

/**
 * Get user by ID.
 *
 * @param {number} id User ID
 * @returns {Promise<User|undefined>} Found user
 */
exports.getUserByID = async id => users.find(user => user.id === id);

/**
 * Get user by username.
 *
 * @param {number} username User name
 * @returns {Promise<User|undefined>} Found user
 */
exports.getUserByName = async username => users.find(user => user.username === username);

/**
 * Insert a new user.
 *
 * @param {string} username User name
 * @param {boolean} admin Administrator flag
 * @param {string} password User password
 */
exports.pushUser = async (username, admin, password) => {
  const user = await this.getUserByName(username);

  if (user === undefined) {
    const newUser = new User(users.length, username, admin, password);
    users.push(newUser);
    return newUser;
  }

  throw new Error(`cannot be inserted, an user with this username already exists`);
};

/**
 * Delete user by ID.
 *
 * @param {number} id User ID
 */
exports.deleteUserByID = async (id) => {
  const user = await this.getUserByID(id);

  if (user !== undefined) {
    users = users.filter(user => user.id !== id);
  }
};

/**
 * Delete user by username.
 *
 * @param {number} username User ID
 */
exports.deleteUserByName = async (username) => {
  const user = await this.getUserByName(username);

  if (user !== undefined) {
    users = users.filter(user => user.username !== username);
  }
};

/**
 * Get the clients list.
 *
 * @returns clients list
 */
exports.getClients = async () => clients;

/**
 * Get client by code.
 *
 * @param {number} code Client code
 * @returns {Promise<Client|undefined>} Found client
 */
exports.getClientByCode = async code => clients.find(client => client.code === code);

/**
 * Insert a new client.
 *
 * @param {number} id Client ID
 * @param {string} name Client name
 * @param {string} address Client address
 */
exports.pushClient = async (id, name, address) => {
  const client = new Client(id, clients.length, name, address);
  clients.push(client);
  return client;
};

/**
 * Delete client by code.
 *
 * @param {number} code Client code
 */
exports.deleteClient = async (code) => {
  const client = await this.getClientByCode(code);

  if (client !== undefined) {
    clients = clients.filter(client => client.code !== code);
  }
};

/**
 * Get the articles list.
 *
 * @returns Articles list
 */
exports.getArticles = async () => articles;

/**
 * Get article by id.
 *
 * @param {number} sku Article SKU
 * @returns {Promise<Article|undefined>} Found article
 */
exports.getArticleBySKU = async sku => articles.find(article => article.sku === sku);

/**
* Insert a new article.
*
* @param {number} sku Article SKU
* @param {string} name Article name
* @param {string} desc Article description
* @param {string} brand Article brand
*/
exports.pushArticle = async (sku, name, description, brand) => {
  const article = await this.getArticleBySKU(sku);

  if (article === undefined) {
    const newArticle = new Article(sku, name, description, brand);
    articles.push(newArticle);
    return newArticle;
  }

  throw new Error(`cannot be inserted, an item with this SKU already exists`);
};

/**
* Delete article by SKU.
*
* @param {number} sku Article SKU
*/
exports.deleteArticle = async (sku) => {
  const article = await this.getArticleBySKU(sku);

  if (article !== undefined) {
    articles = articles.filter(article => article.sku !== sku);
  }
};

/**
 * Get the sales list.
 *
 * @returns Sales list
 */
exports.getSales = async () => sales;

/**
 * Get sale by id.
 *
 * @param {number} id Sale id
 * @returns {Promise<Sale|undefined>} Found sale
 */
exports.getSaleByID = async id => sales.find(sale => sale.id === id);

/**
 * Insert a new sale.
 *
 * @param {number} sku Article SKU
 * @param {number} client Client code
 * @param {number} payment Payment reference
 * @param {string} observations Sale observations
 * @param {Date} date Sale date
 */
exports.pushSale = async (sku, client, payment, observations, date) => {
  const sale = new Sale(sales.length, sku, client, payment, observations, date);
  sales.push(sale);
  return sale;
};

/**
 * Delete sale by code.
 *
 * @param {number} id Sale code
 */
exports.deleteSale = async (id) => {
  const sale = await this.getSaleByID(id);

  if (sale !== undefined) {
    sales = sales.filter(sale => sale.id !== id);
  }
};
