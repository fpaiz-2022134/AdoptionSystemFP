// Configuración de express

//Importaciones 
import express from 'express'
import cors from 'cors' //Políticas de acceso
import helmet from 'helmet' //Seguridad del servidor
import morgan from 'morgan' //Logger manejo de logs
import {config} from 'dotenv' // tokens
import userRoutes from '../src/user/user.routes.js' 
import animalRoutes from '../src/animal/animal.routes.js'



console.log('Aquí vamos a configurar express')

// Configuraciones

const app = express() //Creamos el servidor llamado app.
config()

const port = process.env.PORT || 3200

//process.env.PORT  Define el puerto disponible.

//Configurar el servidor de express

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())  //Aceptar las solicitudes de diferentes orígenes local o original (políticas de acceso)
app.use(helmet()) //Aplica capa de seguridad
app.use(morgan('dev')) //Crea loghs de solicitudes al servidor HTTP

//Declaración de rutas

app.use(userRoutes)
app.use(animalRoutes) 




//Levantar el servidor

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}






//Levantar el servidor