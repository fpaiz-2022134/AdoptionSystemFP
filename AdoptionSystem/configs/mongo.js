
//Conexión a MongoDB
'use strict'

import mongoose from 'mongoose';


export const connect = async()=>{
    try {

        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', ()=> console.log('Mongo DB || Try connecting'))
        mongoose.connection.on('connected', ()=> console.log('Mongo DB || Connected to mongodb'))
        mongoose.connection.on('open', ()=> console.log('Mongo DB || Connected to database'))
        mongoose.connection.on('disconnected', ()=> console.log('mongoDB | disconnected'))
        mongoose.connection.on('reconnected', ()=> console.log('mongoDB | reconnected'))
        await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystem2022134')  
        
    } catch (err) {
        console.error('Database connection failed',err)
    }
}