const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        required: true
    },
    author: {
        type: String,
        minlength: 4,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number, default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    comments:[{comment:{type:String, default:null}}]
})
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)