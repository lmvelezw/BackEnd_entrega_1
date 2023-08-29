const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.route = "./productos.txt";
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan datos por ingresar");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    if (!existingProduct) {
      let product = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
    } else {
      console.log("Ya existe un producto con este código");
    }
    await fs.promises.writeFile(this.route, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let answer = await fs.promises.readFile(this.route, "utf-8");
    return JSON.parse(answer);
  };

  getProducts = async () => {
    let products = await this.readProducts();
    return console.log(products);
  };

  getProductByID = async (id) => {
    let products = await this.readProducts();
    let filter = products.find((product) => product.id === id);

    if (!filter) {
      console.log("Producto no encontrado por su código");
    } else {
      console.log(`El producto se encuentra en el inventario`);
      console.log(filter);
    }
  };

  deleteProductByID = async (id) => {
    let products = await this.readProducts()
    let filter = products.filter((product) => product.id !== id)

    await fs.promises.writeFile(this.route, JSON.stringify(filter))
  }

  updateProduct = async ({id, ...productUpdate}) => {
    await this.deleteProductByID(id);
    let existingProducts = await this.readProducts()

    let newProductList = [{id, ...productUpdate}, ...existingProducts]

    await fs.promises.writeFile(this.route, JSON.stringify(newProductList)) 
  }

}



const productManager = new ProductManager();
// productManager.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abd123",
//   25
// );
// productManager.addProduct(
//   "producto prueba2",
//   "Este es un producto prueba2",
//   20022,
//   "Sin imagen2",
//   "abd123222",
//   252
// );

// productManager.getProducts()

// productManager.getProductByID(1);

// productManager.deleteProductByID(2);

// productManager.updateProduct({
//   title: "producto prueba",
//   description: "Este es un producto prueba",
//   price: 9955,
//   thumbnail: "Sin imagen",
//   code: "abd123",
//   stock: 25,
//   id: "1"}
//   )
