const { getArticles, getArticleBySKU, pushArticle, deleteArticle } = require("../db");

/**
 * List articles.
 *
 * @type {import("express").RequestHandler}
 */
exports.listArticles = async (req, res) => {
  // Get list of articles and returns it
  const articles = await getArticles();
  res.send(articles.map(article => article.json));
};

/**
 * Get article.
 *
 * @type {import("express").RequestHandler}
 */
exports.getArticle = async (req, res, next) => {
  // Get and validate article
  const article = await getArticleBySKU(req.params.id);

  if (article === undefined) {
    return next({ code: 404, msg: `article not found` });
  }

  // Return article
  res.send(article.json);
};

/**
 * Create a new article.
 *
 * @type {import("express").RequestHandler}
 */
exports.createArticle = async (req, res, next) => {
  try {
    // Insert new article
    const article = await pushArticle(
      req.body.sku,
      req.body.name,
      req.body.description,
      req.body.brand
    );

    // Return inserted article
    res.send(article.json);
  }
  catch(err) {
    next({ code: 400, msg: err.message });
  }
};

/**
 * Update article.
 *
 * @type {import("express").RequestHandler}
 */
exports.updateArticle = async (req, res, next) => {
  // Get and validate article
  const article = await getArticleBySKU(req.params.id);

  if (article === undefined) {
    return next({ code: 404, msg: `article not found` });
  }

  // Update article
  article.sku = req.body.sku;
  article.name = req.body.name;
  article.desc = req.body.desc;
  article.brand = req.body.brand;

  // Return article
  res.send(article.json);
};

/**
 * Delete article.
 *
 * @type {import("express").RequestHandler}
 */
exports.deleteArticle = async (req, res, next) => {
  // Delete and validate article
  const article = await deleteArticle(req.params.sku);

  if (article === undefined) {
    return next({ code: 404, msg: `article not found` });
  }

  // Return deleted article
  res.send(article.json);
};
