/**
 * Get list of property rules
 */

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getPropertRules = async (parent, {id}) =>  {
    const rules = []
    const QuerySnapshots = await firestore.collection(`${collections.property}`).doc(id).collection('rules').get()
    QuerySnapshots.forEach((snapshot) => {
        rules.push(snapshot.data())
    })
}
module.exports = getPropertRules