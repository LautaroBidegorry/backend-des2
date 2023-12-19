const fs = require("fs");
class UserManager {
  static #user = [];

  constructor() {
    this.path = "./data/user.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      UserManager.#user = JSON.parse(fs.readFileSync(this.path, this.conf));
    } else {
      this.saveData([]);
    }
  }

  create(data) {
    try {
      const validateData = () => {
        if (!data.name || !data.photo || !data.email) {
          throw new Error("Todos los campos son obligatorios");
        }
      };

      const UserId = () => {
        return UserManager.#user.length === 0
          ? 1
          : UserManager.#user[UserManager.#user.length - 1].id + 1;
      };

      validateData();

      const newUser = {
        id: UserId(),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      UserManager.#user.push(newUser);
      this.saveData(UserManager.#user);
      return "Usuario creado";
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      const userExist = () => {
        if (UserManager.#user.length === 0) {
          throw new Error("No se encontraron usuarios");
        }
      };

      userExist();
      return UserManager.#user;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const userExist = () => {
        if (UserManager.#user.length === 0) {
          throw new Error("No se encontraron usuarios");
        }
      };

      userExist();

      const user = UserManager.#user.find((user) => user.id === Number(id));
      if (!user) {
        throw new Error("No se encontró usuario con ese ID");
      } else {
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }

  saveData(userData) {
    fs.writeFileSync(this.path, JSON.stringify(userData, null, 2));
  }
}

const Manager = new UserManager();
console.log(Manager.read());
console.log(Manager.create({ photo: "https://picsum.photos/200", email: "placeholder@gmail.com"}));
console.log(Manager.create({name: "Marian", photo: "https://picsum.photos/200/300?grayscale", email: "placeholder@gmail.com"}))
console.log(Manager.read());
console.log(Manager.readOne(1));
console.log(Manager.readOne(5))