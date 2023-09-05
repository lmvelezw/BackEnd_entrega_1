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

module.exports = ProductManager;

// const productManager = new ProductManager();

// productManager.addProduct("producto prueba","Este es un producto prueba",2001,"Sin imagen","abd1231",251);
// productManager.addProduct("producto prueba2","Este es un producto prueba2",2002,"Sin imagen","abd1232",252);
// productManager.addProduct("producto prueba3","Este es un producto prueba3",2003,"Sin imagen","abd1233",253);
// productManager.addProduct("producto prueba4","Este es un producto prueba4",2004,"Sin imagen","abd1234",254);
// productManager.addProduct("producto prueba5","Este es un producto prueba5",2005,"Sin imagen","abd1235",255);
// productManager.addProduct("producto prueba6","Este es un producto prueba6",2006,"Sin imagen","abd1236",256);
// productManager.addProduct("producto prueba7","Este es un producto prueba7",2007,"Sin imagen","abd1237",257);
// productManager.addProduct("producto prueba8","Este es un producto prueba8",2008,"Sin imagen","abd1238",258);
// productManager.addProduct("producto prueba9","Este es un producto prueba9",2009,"Sin imagen","abd1239",259);


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
