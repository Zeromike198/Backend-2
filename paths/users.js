const { getUsers, getUserBySKU, pushUser, deleteUser } = require("../db");

/**
 * List users.
 *
 * @type {import("express").RequestHandler}
 */
exports.listUsers = async (req, res) => {
  // Get list of users and returns it
  const users = await getUsers();
  res.send(users.map(user => user.json));
};

/**
 * Get user.
 *
 * @type {import("express").RequestHandler}
 */
exports.getUser = async (req, res, next) => {
  // Get and validate user
  const user = await getUserByID(req.params.id);

  if (user === undefined) {
    return next({ code: 404, msg: `user not found` });
  }

  // Return user
  res.send(user.json);
};

/**
 * Create a new user.
 *
 * @type {import("express").RequestHandler}
 */
exports.createUser = async (req, res, next) => {
  try {
    // Insert new user
    const user = await pushUser(
      req.body.username,
      req.body.admin,
      req.body.password
    );

    // Return inserted user
    res.send(user.json);
  }
  catch(err) {
    next({ code: 400, msg: err.message });
  }
};

/**
 * Update user.
 *
 * @type {import("express").RequestHandler}
 */
exports.updateUser = async (req, res, next) => {
  // Get and validate user
  const user = await getUserBySKU(req.params.id);

  if (user === undefined) {
    return next({ code: 404, msg: `user not found` });
  }

  if (user.id === req.session.user.id && user.admin !== req.session.user.admin) {
    return next({ code: 403, msg: `a user cannot remove the administrator flag itself` });
  }

  // Update user
  user.username = req.body.username;
  user.admin = req.body.admin;
  user.password = req.body.password;

  // Return user
  res.send(user.json);
};

/**
 * Delete user.
 *
 * @type {import("express").RequestHandler}
 */
exports.deleteUser = async (req, res, next) => {
  // Delete and validate user
  const user = await deleteUser(req.params.sku);

  if (user === undefined) {
    return next({ code: 404, msg: `user not found` });
  }

  if (user === req.user.id) {
    return next({ code: 403, msg: `a user cannot delete itself`})
  }

  // Return deleted user
  res.send(user.json);
};
