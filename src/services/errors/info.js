const addProductCartError = () => {
    return `Ups! Hubo un error y no se encontró el producto. Intente nuevamente más tarde.`
}

const getCartError = () => {
    return `Ups! Hubo un error al encontrar el carrito. Intente nuevamente más tarde.`
}

const idProductCartError = () => {
    return `Ups! Hubo un error al encontrar el producto. Intente nuevamente más tarde.`
}

const addProductErrorInfo = data => {
    return `Uno o más parámetros no son válidos:
    - title: necesita recibir un String, recibió: ${data.title}
    - descrption: necesita recibir un String, recibió: ${data.description}
    - code: necesita recibir un String, recibió: ${data.code}
    - price: necesita recibir un Number, recibió: ${data.price}
    - stock: necesita recibir un Number, recibió: ${data.stock}
    - category: necesita recibir un String, recibió: ${data.category}`
}

const delProductError = (id) => {
    return `No se a encontrado el producto a eliminar. Verifique el id enviado. ID enviado: ${id}.`
}

const updateProductError = (id) => {
    return `No se a encontrado el producto a actualizar. Verifique el id enviado. ID enviado: ${id}.`
}

module.exports = { addProductCartError, getCartError, addProductErrorInfo, delProductError, updateProductError, idProductCartError }