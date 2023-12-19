const fs = require("fs");

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./data/products.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, this.conf)
      );
    } else {
      this.saveProductData([]);
    }
  }

  create(data) {
    try {
      const validateProductData = () => {
        if (!data.title || !data.photo || !data.price || !data.stock) {
          throw new Error("Todos los campos son obligatorios");
        }
      };

      const getNextProductId = () => {
        return ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1;
      };

      validateProductData();

      const newProduct = {
        id: getNextProductId(),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      ProductManager.#products.push(newProduct);
      this.saveProductData(ProductManager.#products);
      return "Producto creado";
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      this.checkProductExistence();

      return ProductManager.#products;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      this.checkProductExistence();

      const product = ProductManager.#products.find(
        (product) => product.id === Number(id)
      );

      if (!product) {
        throw new Error("No se encontró producto con ese ID");
      } else {
        return product;
      }
    } catch (error) {
      return error.message;
    }
  }

  
  saveProductData(productData) {
    fs.writeFileSync(this.path, JSON.stringify(productData, null, 2));
  }

  
  checkProductExistence() {
    if (ProductManager.#products.length === 0) {
      throw new Error("No se encontraron productos");
    }
  }
}

const Manager = new ProductManager();
console.log(Manager.create({photo: "https://picsum.photos/640/360", price: 100, stock: 10})); 
console.log(Manager.create({title: "tituloPHtest", photo: "https://picsum.photos/640/360", price: 100, stock: 10}));
console.log(Manager.read());
console.log(Manager.readOne(4));
console.log(Manager.readOne(2));
