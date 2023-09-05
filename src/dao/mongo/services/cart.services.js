const Cart = require("../models/cart.model");
const logger = require('../../../config/logger.config');
const uuid4 = require('uuid4')

class CartServices {

  async getCarts() {
    try {
      const result = await Cart.find();
      return result;
    } catch (err) {
      logger.info('Cartservice - getCart: ' + err)
      return null
    }

  }
  async getCartById(_id) {
    try {
      const result = await Cart.findOne({ _id: _id });
      return result;
    }
    catch (err) {
      logger.info('Cartservice - getCartByID: ' + err)
      return null
    }
  }
  async postCart(data) {
    try {
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      data.date = hoy.toDateString() + ' ' + uuid4()
      logger.debug(data.date);
      const result = await Cart.create(data);
      return result;
    }
    catch (err) {
      logger.error('Cartservice - postCart: ' + err)
      return null
    }

  }
  async updateCart(_id, data) {
    try {
      const result = await Cart.updateOne({ _id: _id }, data);
      return result;
    }
    catch (err) {
      logger.error('Cartservice - updateCart: ' + err)
      return null
    }
  }

  async delProductsCart(_id) {
    try {
      const data = await this.getCartById(_id)
      let arr = [];
      data.products = arr;
      let result = await this.updateCart(_id, data)
      return result;
    }
    catch (err) {
      logger.error('Cartservice - delProductsCart: ' + err)
      return null
    }
  }
}
module.exports = CartServices;
