/**
 * Add a new guest to a reservation
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')

const collections = require('../../../../enums/collections')
const admin = require('../../../../admin')
const firestore = admin.firestore()


 const addReservationGuest = async (parent, {id, name, gender, type}, context) => {
     client_middleware(context)

    const guest = {
        name, gender, type
    }
    const reservation = firestore.collection(collections.reservation.main).doc(id)
    await reservation.update({
        guests:  admin.firestore.FieldValue.arrayUnion(guest)
    })

    return guest;
}

 module.exports = addReservationGuest