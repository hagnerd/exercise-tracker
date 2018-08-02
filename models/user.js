const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate(),
  },
  username: String,
  exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise' }]
});

module.exports = mongoose.model('User', UserSchema);