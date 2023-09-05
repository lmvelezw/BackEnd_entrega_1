const express = require("express");
const ProductManager = require("./components/ProductManager.js");

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

const products = new ProductManager();

async function readProducts() {
  const readProducts = await products.readProducts();
  return readProducts;
}

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  let allProducts = await readProducts();

  !limit ? res.send(allProducts) : res.send(allProducts.slice(0, limit));
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts();
    let productByID = allProducts.find(product => product.id === id)
    res.send(productByID)

})

const server = app.listen(PORT, () => {
  console.log(`Express en Localhost ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error del  servidor ${error}`));
