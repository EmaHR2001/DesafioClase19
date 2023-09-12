const User = require("../models/users.model");

class UserServices {
  async getAll() {
    const users = await User.find();
    return users;
  }
  async getById(_id) {
    const user = await User.findOne({ _id: _id });
    return user;
  }
  async getByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }
  async createOne(data) {
    const user = await User.create(data);
    return user;
  }
  async deletedOne(_id) {
    const deleted = await User.deleteOne({ _id: _id });
    return deleted;
  }
  async updateOne(_id, first_name, last_name, email, age, password, rol) {
    const userUpDate = await User.updateOne(
      { _id: _id },
      { first_name, last_name, email, age, password, rol }
    );
    return userUpDate;
  }
  async updatePassword(email, newPassword) {
    const user = await this.getByEmail(email);
    if (!user) {
      logger.info("Usuario no encontrado");
      return
    }

    const currentPassword = user.password
    if (currentPassword === newPassword) {
      logger.info("La nueva contraseña debe ser diferente de la contraseña actual");
      return
    }

    user.password = newPassword;
    const updatedUser = await user.save();

    return updatedUser;
  }
}

module.exports = UserServices;
