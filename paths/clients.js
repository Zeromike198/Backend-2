const { getClients, getClientByCode } = require("../db");

/**
 * List clients.
 *
 * @type {import("express").RequestHandler}
 */
exports.listClients = async (req, res) => {
  // Get list of clients and returns it
  const clients = await getClients();
  res.send(clients.map(client => client.json));
};

/**
 * Get client.
 *
 * @type {import("express").RequestHandler}
 */
exports.getClient = async (req, res, next) => {
  // Get and validate client
  const client = await getClientByCode(req.params.code);

  if (client === undefined) {
    return next({ code: 404, msg: `client not found` });
  }

  // Return client
  res.send(client.json);
};
