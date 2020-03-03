/**
 * Add a new guest to a reservation
 */
const collections = require('../../../../enums/collections')
const admin = require('../../../../admin')
const helper = require('../../../../helper')
const firestore = admin.firestore()


 const checkinReservation = async (parent, {reservation_id, user_id, accepted_tnc}) => {
    const userRef = firestore.collection(collections.user.main).doc(user_id)
    const reservationRef = firestore.collection(collections.reservation.main).doc(reservation_id)
    if(accepted_tnc){
        const user = await userRef.get()
        let reservation = await reservationRef.get()
        if(user.exists && reservation.exists){
            const checkin = {
                accepted_tnc,
                name: user.data().name,
                checkedin_at: helper.nowTimestamp(),
            }
            // create the checkin document
            await firestore.collection(collections.reservation.main)
                    .doc(reservation_id)
                    .collection(collections.reservation.meta.name)
                    .doc(collections.reservation.meta.documents.checkin)
                    .set(checkin)
            // update the reservation document
            await reservationRef.update({
                user_id: user_id,
                checkedin_at: checkin.checkedin_at
            })

        return (await reservationRef.get()).data() //refetch the reservation data
        }
    }
    
    return null
    
}

 module.exports = checkinReservation