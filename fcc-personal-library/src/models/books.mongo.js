const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },

    comments: [String],
    commentcount: {
        type: Number,
        default: 0
    }
},
    { versionKey: false })

// bookSchema.pre('save', next => {
//     this.commentcount = this.comments ? this.comments.length : 0;
//     next();
// })

module.exports = mongoose.model('Books', bookSchema)