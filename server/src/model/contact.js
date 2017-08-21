const Mongoose = require('mongoose')

const PhoneSchema = Mongoose.Schema({
  countryCode:  {
    type: String,
    trim: true,
    default: '1',
  },
  id:          String,
  extension:    Number,
  number:       String,
})

const ContactSchema = Mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    index:    true,
    trim:     true,
    unique:   true,
    match:    [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  name: {
    first:  String,
    last:   String,
    prefix: String,
  },
  phones: [PhoneSchema],
},{
  timestamps: true,
})

const Contact = Mongoose.model('Contact', ContactSchema)
module.exports = Contact