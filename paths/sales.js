const { getSales, getSaleByID, pushSale, getArticleBySKU, getClientByCode, pushClient } = require("../db");

/**
 * List sales.
 *
 * @type {import("express").RequestHandler}
 */
exports.listSales = async (req, res) => {
  // Get list of sales and returns it
  const sales = await getSales();
  res.send(sales.map(sale => sale.json));
};

/**
 * Get sale.
 *
 * @type {import("express").RequestHandler}
 */
exports.getSale = async (req, res, next) => {
  // Get and validate sale
  const sale = await getSaleByID(req.params.id);

  if (sale === undefined) {
    return next({ code: 404, msg: `sale not found` });
  }

  // Return sale
  res.send(sale.json);
};


/**
 * Create a new sale.
 *
 * @type {import("express").RequestHandler}
 */
exports.createSale = async (req, res, next) => {
  // Check if the article exsits
  const article = await getArticleBySKU(req.body.sku);

  if (article === undefined) {
    return next({ code: 404, msg: `the article does not exist` });
  }

  // Get client and create it if not exists
  let client = await getClientByCode(req.body.client.code);

  if (client === undefined) {
    try {
      client = await pushClient(
        req.body.client.id,
        req.body.client.name,
        req.body.client.address
      );
    }
    catch (err) {
      return next({ code: 400, msg: err.message });
    }
  }

  try {
    // Insert new sale
    const sale = await pushSale(
      article.sku,
      client.code,
      req.body.payment,
      req.body.observations,
      new Date(req.body.date)
    );

    // Return sale
    res.send(sale.json);
  }
  catch (err) {
    next({ code: 400, msg: err.message });
  }
};
