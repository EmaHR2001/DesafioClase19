const socket= io()
const logger = require('../../config/logger.config');

socket.on('wellcome', (data)=> {
    logger.info(data)
})

socket.on('messages-all', (data)=>{
    render(data)

})

function render(data) {
    const html = data.map(element=>{
        return (`
        <div>
            <h5><strong>${element.user}: ${element.message}</strong></h5>
        </div>
        `)
    }).join(' ') // Se le agrega el join para que quite las comas del mapeo
    document.getElementById('caja').innerHTML = html 
}

//en esta funcion vamos a crear un objeto con lo que envie el formulario, el username y el message
function addMessage(){
    const mensaje={
        user:document.getElementById('username').value,
        message:document.getElementById('message').value
    }
    
    socket.emit('new-message', mensaje) // creamos el evento new-message, y pasamos el msj, y vamos a configurar el evento en el socket del servidor
    return false // esto es para eliminar el comportamiento del submit de refrescar la pagina al dar click
}