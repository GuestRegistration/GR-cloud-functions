/**
 * Get list of property reservations
 */

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getPropertReservations = async (parent, {id}) =>  {
    const reservations = []
    const QuerySnapshots = await firestore.collection(`${collections.reservation}`).where('property.id', '==', id).get()
    QuerySnapshots.forEach((snapshot) => {
        reservations.push(snapshot.data())
    })
    return reservations
}
module.exports = getPropertReservations