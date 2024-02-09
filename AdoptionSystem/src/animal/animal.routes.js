'use strict'


import express from 'express'

import {addAnimal} from './animal.controller.js'
import {test} from './animal.controller.js'
import { getAnimals}   from './animal.controller.js'
import { searchAnimal } from './animal.controller.js'
import { updateAnimal } from './animal.controller.js'

const api = express.Router()




api.get('/test', test) //Maneja la ruta en función al controlador
api.get('/getAnimals', getAnimals)
api.post('/addAnimal', addAnimal)
api.post('/searchAnimal', searchAnimal)
api.post('/updateAnimal/:id', updateAnimal)

export default api