/**
 * Get list of property reservations
 */

const client_middleware = require('./../../../../middleware/client_authorized')
const user_middleware = require('./../../../../middleware/user_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getPropertReservations = async (parent, {id}, context) =>  {
    client_middleware(context)
        //first get the property
       const property = await firestore.collection(collections.property.main).doc(id).get()
       if(property.exists){
            const reservations = []
           user_middleware(context, [property.data().user_id])

           const QuerySnapshots = await firestore.collection(collections.reservation.main).where('property.id', '==', id).get()
           QuerySnapshots.forEach((snapshot) => {
               let r = snapshot.data()
               r.id = snapshot.ref.id
               reservations.push(r)
           })
           return reservations
       }else{
           throw new Error('The property doess not exist')
       }
}
module.exports = getPropertReservations