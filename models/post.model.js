const mongoose = require('mongoose');
require('./user.model');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
    },
    img: {
        type: String,
        require: true
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

// postSchema.pre('save', function (next) {
//     this.hashtags = this.body.match(/#[a-z]+/gi);
//     next()
// });

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false,
});
  
postSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post',
    justOne: false,
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
