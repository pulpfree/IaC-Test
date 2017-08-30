import ContactModel from '../model/contact'

export default class Contact {

  fetchByActive(active) {
    return ContactModel.find({active}).exec()
  }
}