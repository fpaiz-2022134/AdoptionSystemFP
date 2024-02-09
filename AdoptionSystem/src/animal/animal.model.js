import mongoose from 'mongoose'

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
      keeper:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },  
    description:{
        type: String,
        required: true
    }
})

export default mongoose.model('animal', animalSchema)