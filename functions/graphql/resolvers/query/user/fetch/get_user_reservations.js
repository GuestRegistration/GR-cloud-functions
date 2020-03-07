/**
 * Get a user reservations list
 */
const collections = require('./../../../../../enums/collections')
const client_middleware = require('./../../../../middleware/client_authorized')
const auth_middleware = require('./../../../../middleware/user_authenticated')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

 const getUserReservations = async (parent, args, context) => {
    client_middleware(context)
    
    //if an id was specified, perhaps for admin purpose
    if(args.id){
        user_id = args.id
    }else{
        // Get the Id from the authentication
        user_id = auth_middleware(context)
    }
    const reservations = []
    if(user_id){
        const QuerySnapshots = await firestore.collection(collections.reservation.main).where('user_id', '==', user_id).get()
        
        QuerySnapshots.forEach((snapshot) => {
            let reservation = snapshot.data()
            reservation.id = snapshot.ref.id
            reservations.push(reservation)
        })        
    }
    return reservations;
 }

 module.exports = getUserReservations