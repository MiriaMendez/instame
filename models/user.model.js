const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: [EMAIL_PATTERN]
    },
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    validated: {
        type: Boolean
    },
    phone: {
        type: Number
    },
    gender: {
        type: String
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }  
})

userSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
          .then(salt => {
            return bcrypt.hash(user.password, salt)
              .then(hash => {
                user.password = hash;
                next();
              });
          })
          .catch(error => next(error));
      } else {
        next();
    } 
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

// userSchema.virtual('posts', {
//     ref: 'Post',
//     localField: '_id',
//     foreignField: 'user',
//     justOne: false,
// });

const User = mongoose.model('User', userSchema);

module.exports = User;