const User = require('../models/user.model');
const createError = require('http-errors');


module.exports.create = (req, res, next) => {
    const user = new User ({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phone : req.body.phone,
        gender : req.body.gender,
        description : req.body.description,
        password : req.body.password,
        img : req.body.img, 
        validated : req.body.validated
    })

    user.save()
    .then((user) => res.status(201).json(user))
    .catch(next)
}

module.exports.doLogin = (req, res, next) => {
    const { email, password} = req.body

    if (!email || !password) {
        throw   createError(400, 'Credentials not found')
    } 

    User.findOne({ email: email })
    .populate('post')
    .then( user => {
        if (!user) {
            throw createError(404, 'User not found')
        } else {
            return user.checkPassword(password)
            .then(match => {
                if (!match) {
                    throw createError(400, 'Invalid password')
                } else {
                    req.session.user = user;
                    res.json(user)
                }
            })
        }
    })
    .catch(next)
}


module.exports.profile = (req, res, next) => {
    const id = req.params.id || req.currentUser.id

    User.findById(id)
        .then(user =>  {
            if (user) {
                res.json(user)
            } else {
                throw createError(404, "User not found")
            }
        })
        .catch(next)
}

module.exports.edit = (req, res, next) => {
    if (req.params.id !== req.currentUser.id) {
        throw createError(403, "Can't update other user")
    }

   User.findByIdAndUpdate(req.params.id, req.body, { new:true })
    .then(user => {
        if(!user) {
            throw createError(404, 'User not found')
        } else {
            res.json(user)
        }
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.status(204).json();
}

 
