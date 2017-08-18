import ContactModel from '../model/contact'

export default class Contact {
  constructor() {

    this.create = fields => {
      const { contact } = fields
      return new ContactModel(contact).save()
    }

    this.update = input => {
      const { contact } = input
      return ContactModel.findByIdAndUpdate(contact._id, contact, {new: true}).exec()
    }

    this.remove = _id => {
      return ContactModel.remove({_id}).exec().then(res => {
        return res.result
      })
    }

    this.fetchById = ({ _id }) => {
      return ContactModel.findOne({_id}).exec()
    }

    this.fetchByEmail = ({ email }) => {
      return ContactModel.findOne({email}).exec()
    }

    this.searchByEmail = fields => {
      const { active, email } = fields
      const q = {
        active,
        email: new RegExp(`^${email}`, 'i'),
      }
      return ContactModel.find(q).exec()
    }

  }
}