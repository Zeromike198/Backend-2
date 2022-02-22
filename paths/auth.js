"use strict";

const { getUserByName } = require("../db");

/**
 * Authenticate user.
 *
 * @type {import("express").RequestHandler}
 */
exports.login = async (req, res, next) => {
  // Get and validate user
  const user = await getUserByName(req.body.username);
  if (user === undefined) {
    return next({ code: 404, msg: `not found`});
  }

  // Authenticate user
  if (!user.checkPassword(req.body.password)) {
    return next({ code: 401, msg: `not valid username or password` });
  }

  // Update session
  req.session.user = {
    id: user.id,
    name: user.name,
    admin: user.admin
  };

  // Send user information
  res.send(req.session.user);
};

/**
 * Close use session.
 *
 * @type {import("express").RequestHandler}
 */
exports.logout = (req, res) => {
  req.session.destroy();
  res.send({ msg: `session closed` });
};
