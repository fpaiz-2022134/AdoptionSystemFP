'use strict';

import Animal from './animal.model.js'

import { checkUpdateAnimal } from '../utils/validator.js'; 

export const test = (req, res) => {
    return res.send('Hello, world')
}


// AGREGAR

export const addAnimal = async(req, res) =>{
    try {
       //Capturamos la información del animal
       let data = req.body; 

       console.log(data)
       //Realizmaos una instancia creando el animal
        let animal = new Animal(data)

        await animal.save()

        return res.send({message: 'Animal registered successfully'})

    } catch (err) {
        /* console.error(err); */
        return res.status(500).send({message: 'Error registering the pet', err})
    }
    
}


export const getAnimals = (req, res) =>{
    //Obtenemos todos los animales
    
    
}


//Buscar los animales

export const searchAnimal = async(req, res) =>{
    try {
        //Capturamos el nombre del animal
        let {name} = req.body

        //Realizamos una consulta
        let animal = await Animal.findOne({name: name})

        if (!animal) {
            return res.status(404).send({message: 'Animal not found'})
        }

        console.log(animal)
        return res.send({message: 'Animal found', animal})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error finding the animal', err})
    }
    
}


//ACTUALIZAR

export const updateAnimal = async(req, res) =>{
    //Obtenemos id del animal
    let {id} = req.params
    //Obtenemos los datos a actualizar
    let data = req.body

    //Validar si hay datos a actualizar
    let updateAnimal = checkUpdateAnimal(data, id)

    if (!updateAnimal) {
        return res.status(400).send({message: 'Have submitted some data of the animal that cannot be updated or missing data'})
    }
 
    let updatedAnimal = await Animal.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    )

    //Validamos la actualización
    if(!updatedAnimal) return res.status(401).send({message:'Animal not found and not updated'})

    return res.send({message: 'Update animal', updatedAnimal})
}

export const deleteUser = async(req, res) =>{
    // Capturar el usuario que se desee eliminar

        let {name} = req.body
    try {
        //Encuentra el usuario
        let userDeleted = await User.findOneAndDelete({name}) //true o false

        if (!userDeleted) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ message: 'User deleted successfully' });


    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting user', err})
    } 
   
}