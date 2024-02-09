'use strict';

import User from './user.model.js' //Único que puede ir en mayúscula
import { encrypt, checkPassword , checkUpdate} from '../utils/validator.js';

// Esta funcionalidad permite 
export const test = (req, res) => {
    return res.send('Hello, world')
}

//Express nos dice si hay una req y resp.


//AGREGAR
export const register = async(req, res)=>{ //Solo para los rol de cliente
    try {
        //Capturar la información del cliente (body)
        let data = req.body;

        //Encriptar la contraseña
        
        data.password = await encrypt(data.password)
        console.log(data);
        //Asignar el rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, asiga el rol
        /* data.password = await bcrypt.hash(data.password, 10); */ //Encriptar la contraseña
        // Crear una instancia del modelo(schema)

        let user = new User(data)

        //Guardar la información
       
        await user.save()
        //Respondo al usuario
        return res.send({message: 'Registered successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error registering user', err})
    }
}

// Login
export const login = async(req, res) => {
    try {
        //Recibir informacion
        let {username, password} = req.body
        //Validar informacion
        let user = await User.findOne({username}) //Verifica el usuario
        //Verifica la contraseña
        if(user && await checkPassword(password, user.password)) {
            // Envia unicamente los datos necesarios
            let loggerUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Dar acceso
            return res.send({message: `Welcome ${user.name}`, loggerUser})
        }
        return res.status(404).send({message: 'User or password incorrect'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error logging in', err})
    }
}

//DELETE

export const deleteUser = async(req, res) =>{
    // Capturar el usuario que se desee eliminar

        let {username} = req.body
    try {
        //Encuentra el usuario
        let userDeleted = await User.findOneAndDelete({username}) //true o false

        if (!userDeleted) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User deleted successfully' });


    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting user', err})
    } 
   
}

//UPDATE

export const update = async(req, res)=>{ //Usuarios logeados
    
    try {
        //Obtener el id del usuario a actualizar
        let {id} = req.params

        //Obtener datos que vamos a actualizar
        let data = req.body

        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)

        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data '})
        //Validar si tiene permisos (tokenización) X HOY NO LO VEMOS X

        //Actualizamos en la BD
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, //objectId - Hexadecimal (Hora sys, versión mongo, llave privada)
            data, //Datos que va a actualizar
            {new: true} //Objeto de la BD ya actualizado
        )
        //Validar si se actualizó

        if(!updatedUser) return res.status(401).send({message:'User not found and not updated'})
        //Responder con el dato actualizado
    return res.send({message: 'Update user', updatedUser})


    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message:`Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try {
        //Obtener id
        let {id} = req.params
        //Vaslidar si está logheado y es el mismo X hoy no lo vemos X

        //Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar si se eliminó

        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})

        //Responder

        return res.send({message: `Account with name ${deletedUser.name} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}




/* export const update = async(req, res)=>{
    // Obtener los datos que se desean actualizar.
    let data = req.body
    let {username} = req.body 

    try {


        let userUpdated = await User.findOndeAndUpdate({username},{data})

        if (!userUpdated) {
            return res.estatus(404).send({message: 'User not found'})

        }

        return res.send({message: 'The user has been updated successfully.'})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error updating the user.'})
    }


}
 */

/* export const updateUser = async(req, res) =>{
    // Capturar el usuario que se desea actualizar

        let {name, password} = req.body
    try {
        let userUpdated = await User.findOneAndUpdate({name}, {password})

        if (!userUpdated) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User updated successfully' });


    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating user', err})
    } 
   
} */