"use strict";

const express = require(`express`);
const session = require(`express-session`);

const { auth } = require("./middlewares/auth");
const { error404, error } = require("./middlewares/fallbacks");

const { login, logout } = require("./paths/auth");
const { listUsers, getUser, createUser, updateUser, deleteUser } = require("./paths/users");
const { listArticles, getArticle, createArticle, updateArticle, deleteArticle } = require("./paths/articles");
const { listSales, getSale, createSale } = require("./paths/sales");
const { getClient, listClients } = require("./paths/clients");


// Server application data
const app = express();
const port = 3000;
const hostname = `localhost`;


// Middlewares
app.use(express.json());
app.use(session({
  secret: `COOKIE_SECRET_STRING`,
  saveUninitialized: false,
  resave: false
}));


// Authentication paths
app.post(`/login`, login);
app.post(`/logout`, logout);

// Users paths
app.get(`/user`, listUsers);
app.get(`/user/:id`, getUser);
app.post(`/user`, auth, createUser);
app.put(`/user/:id`, auth, updateUser);
app.delete(`/user/:id`, auth, deleteUser);

// Articles paths
app.get(`/article`, listArticles);
app.get(`/article/:sku`, getArticle);
app.post(`/article`, auth, createArticle);
app.put(`/article/:sku`, auth, updateArticle);
app.delete(`/article/:sku`, auth, deleteArticle);

// Sales paths
app.get(`/sale`, listSales);
app.get(`/sale/:id`, getSale);
app.post(`/sale`, auth, createSale);

// Clients paths
app.get(`/client`, listClients);
app.get(`/client/:code`, getClient);


// Fallbacks
app.use(error404);
app.use(error);


// Start server
app.listen(port, hostname, () => {
  console.log(`Application running at http://${hostname}:${port}`);
});
