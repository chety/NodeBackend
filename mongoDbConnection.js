const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://chety:12345@cluster0.52jzh.mongodb.net/note_store?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(_ => {
    console.log("Mongo DB Connection successfull.")
})
.catch(err => {
    console.error("Error occured while trying to connect to mongoose. Details -> ",err)
})