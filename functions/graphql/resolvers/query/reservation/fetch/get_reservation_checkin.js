/**
 * Get a reservation data
 */
const client_middleware = require('./../../../../middleware/client_authorized')
const auth_middleware = require('./../../../../middleware/user_authenticated')
const user_middleware = require('./../../../../middleware/user_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const helper = require('./../../../../../helper')
const firestore = admin.firestore()


const getReservationCheckin = async (parent, {id}, context) => {
    client_middleware(context)
    
    const reservationRef = firestore.collection(collections.reservation.main).doc(id)
    const reservationDoc = await reservationRef.get()

    if(reservationDoc.exists){
        const reservation = reservationDoc.data()
        reservation.id = reservationDoc.ref.id

        const auth = auth_middleware(context)

        const propertyRef = firestore.collection(collections.property.main).doc(reservation.property_id)
        const propertyDoc = await propertyRef.get()

        if(propertyDoc.exists){
            user_middleware(context, [propertyDoc.data().user_id])

            const checkinRef = reservationRef.collection(collections.reservation.meta.name).doc(collections.reservation.meta.documents.checkin)
            const checkinDoc = await checkinRef.get()
            const checkin = checkinDoc.data()
            checkin.id = checkinDoc.ref.id

            // check if the reservation is already checked in
            if(reservation.checkedin_at && checkinDoc.exists){
                // get the user data
                const userRef = firestore.collection(collections.user.main).doc(reservation.user_id)
                const userDoc = await userRef.get()
                const user = userDoc.data()
                user.id = userDoc.ref.id

                // get the identity data
                let identity = null
                if(checkin.identity_ref){
                    const idRef = firestore.doc(checkin.identity_ref)
                    const snapshot = await idRef.get()
                    if(snapshot.exists){
                        identity = snapshot.data()
                        identity.id = snapshot.ref.id
                        // update the view history
                        await idRef.collection('access_history').add({
                            user_id: auth,
                            client: context.auth.client_token,
                            accessed_at: helper.nowTimestamp()
                        })
                    }
                }
                return {
                    user,
                    reservation,
                    checkin,
                    identity
                }
            }else{
                throw new Error("The reservation is not checked in yet")
            }      
        }else{
            throw new Error("The affiliated property cannot be found")
        }
    }else{
        throw new Error("The reservation does not exist")
    }
}
module.exports = getReservationCheckin