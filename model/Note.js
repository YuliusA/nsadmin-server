const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    booking: {
        type: String,
        required: true,
    },
    content: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);