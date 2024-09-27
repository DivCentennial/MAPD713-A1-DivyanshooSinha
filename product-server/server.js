const express = require('express');
const app = express();
const port = 5000;

let products = [];
let getRequestCount = 0;
let postRequestCount = 0;

// Middleware to parse JSON request body
app.use(express.json());

// Log start-up information
app.listen(port, () => {
  console.log(`Server is listening at http://127.0.0.1:${port}`);
  console.log(`Endpoints:\nGET/POST/DELETE: http://127.0.0.1:${port}/products`);
});

// Log request and response
app.use((req, res, next) => {
  console.log(`> ${req.method} ${req.url}: received request`);
  next();
});

// GET request to retrieve products
app.get('/products', (req, res) => {
  getRequestCount++;
  console.log(`< GET: sending response`);
  res.json(products);
  console.log(`Processed Request Count--> Get:${getRequestCount}, Post:${postRequestCount}`);
});

// POST request to add a product
app.post('/products', (req, res) => {
  postRequestCount++;
  products.push(req.body);
  console.log(`< POST: storing product`);
  res.status(201).send('Product added successfully');
  console.log(`Processed Request Count--> Get:${getRequestCount}, Post:${postRequestCount}`);
});

// DELETE request to remove all products
app.delete('/products', (req, res) => {
  products = [];
  console.log(`< DELETE: all products deleted`);
  res.status(200).send('All products deleted');
});

