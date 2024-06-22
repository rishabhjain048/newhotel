const mongoose = require ('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 40,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        maxlength: 40,
        lowercase: true
    },
    password:{
        type: String,
    
    },
    name:{
        type: String,
        // required: true
    },
    address:{
        type: String,
        // required: true
    },
    phone:{
        type: String,
        // required: true
    },
    addhar_number:{
        type: String,
        // required: true
    },
    profile:{
        type: String,
        
    }
})

userSchema.plugin(plm)

const User = mongoose.model('User', userSchema);
module.exports = User