class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan datos por ingresar");
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    if (!existingProduct) {
      const product = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      console.log(`Se agregó ${product.title}`);
    } else {
      console.log("Ya existe un producto con este código");
    }
  }

  getProducts() {
    return this.products
  }

  getProductByID(id){
    const productoEncontrado = this.products.find(
        (product) => product.id === id
      )
      if(!productoEncontrado){
        console.log("Producto no encontrado por su código")
      } else {
        console.log(`El producto se encuentra en el inventario`)
        console.log(productoEncontrado)
      }
  }

}

const productManager = new ProductManager()

console.log(productManager)

productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abd123",25)

console.log(productManager)

productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abd123",25)

productManager.getProductByID(1)
