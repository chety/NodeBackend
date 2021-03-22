const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);
const PersonSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        }
    ]
})
PersonSchema.plugin(AutoIncrement, {inc_field: "id"})

//delete some mongo generated properties
PersonSchema.set("toJSON", {
    transform: (document,returnedObject) => {  
        // console.log("Transform object",returnedObject)      
        // returnedObject.id = returnedObject.__id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

//mongo needs model to work
module.exports = mongoose.model("Person",PersonSchema)