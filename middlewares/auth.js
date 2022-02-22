"use strict";

const { User } = require("../db/users/user");

/**
 * Check if the user is logged.
 *
 * @type {import("express").RequestHandler}
 */
exports.auth = (req, res, next) => {
  // Check if the user is logged in
  /** @type {User} */
  const user = req.session.user;
  if (user === undefined || !user.admin) {
    next({ code: 401, msg: `unauthenticated` });
  }

  // Continue
  return next();
};
