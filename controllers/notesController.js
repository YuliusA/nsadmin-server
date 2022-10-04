const Note = require('../model/Note');
const User = require('../model/User');
const Booking = require('../model/Booking');

const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    if (!notes) return res.status(204).json({ 'message': 'No Notes found.' });
    res.json(notes);
};

const createNote = async (req, res) => {
    const { user, booking, content } = req.body;

    if (!user || !booking || !content) {
        res.status(400).json({ 'message': 'All fields are required' });
    }

    try {
        const result = await Note.create({
            user: user,
            booking: booking,
            content: content,
        });

        if (result) {
            try {
                await Booking.findByIdAndUpdate(booking, {
                    $push: { notes: result._id }
                });

                await User.findByIdAndUpdate(user, {
                    $push: { notes: result._id }
                });
            } catch(err) {
                console.error(err)
            }
        }

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const updateNote = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Note ID required.' });
    }

    const note = await Note.findOne({ _id: req.params.id }).exec();
    if (!note) {
        return res.status(204).json({ 'message': `No note matches ID ${req.params.id}.` });
    }
    if(req.body?.content) {
        note.content = req.body.content;
    }

    const result = await note.save();
    res.json(result);
};

const deleteNote = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Note ID required.' });
    }

    try {
        const foundNote = await Note.findOne({ _id: req.params.id }).exec();
        const foundUser = await User.findById(foundNote.user);
        const foundBooking = await Booking.findById(foundNote.booking);

        if (!foundNote || !foundUser || !foundBooking) {
            const err = new Error('Could not find note / user / booking');
            err.statusCode = 404;
            throw err;
        }

        foundUser.notes.pull({ _id: req.params.id });
        await foundUser.save();

        foundBooking.notes.pull({ _id: req.params.id });
        await foundBooking.save();

        const result = await foundNote.deleteOne(); //{ _id: req.params.id }
        res.json(result);
    }
    catch (err) {
        console.error(err);
    }
};

const getNote = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Note ID required.' });

    const note = await Note.findOne({ _id: req.params.id }).exec();

    if (!note) {
        return res.status(204).json({ 'message': `No Note matches ID ${req.params.id}.` });
    }
    res.json(note);
};

module.exports = {
    getAllNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
}