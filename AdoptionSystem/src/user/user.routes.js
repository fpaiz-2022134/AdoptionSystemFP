'use strict';

import express from 'express';
import {test, register, login, deleteUser, update, deleteU} from './user.controller.js'

const api = express.Router()

api.get('/test', test) //Maneja la ruta de la función del controlador
api.post('/register', register)
api.post('/login', login)
api.post('/deleteUser', deleteUser)
api.post('/update', update)
api.put('/update/:id', update)
api.delete('/deleteU/:id', deleteU)

/* export const api */  // Tengo si osi el nombre que está en el archivo
export default api  // Permite importar con otro nombre

