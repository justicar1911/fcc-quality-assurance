const BookDatabase = require('../models/books.mongo')

async function getAllBooks() {
    return await BookDatabase.find({}).select('-comments')
}

async function getBook(id) {
    try {
        return await BookDatabase.findOne({ _id: id })
    } catch {
        return []
    }
}

async function createBook(title) {
    return await BookDatabase.create(title)
}

async function updateBook(id, comment) {
    try {
        return await BookDatabase.findOneAndUpdate(
            { _id: id },
            {
                $push: { comments: comment },
                $inc: { commentcount: 1 }
            },
            { new: true }
        )
    } catch {
        return []
    }
}

async function deleteAllBooks() {
    await BookDatabase.deleteMany({})

}
async function deleteBook(id) {
    try {
        return await BookDatabase.findOneAndDelete({ _id: id })

    } catch {
        return []
    }

}


module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteAllBooks,
    deleteBook
}
