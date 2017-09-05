import ContactModel from '../../model/contact'

export default class Contact {

  fetchByActive(active) {
    // console.log('fetchByActive in Contact context:')
    return ContactModel.find({active}).exec()
  }
}