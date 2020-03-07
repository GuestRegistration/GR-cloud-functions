/**
 * Get list of properties belonging to a user
 */
const collections = require('./../../../../../enums/collections')
const client_middleware = require('./../../../../middleware/client_authorized')
const auth_middleware = require('./../../../../middleware/user_authenticated')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

 const getUserProperties = async (parent, args, context) => {
    client_middleware(context)
    let user_id = null

    //if an id was specified, perhaps for admin purpose
    if(args.id){
        user_id = args.id
    }else{
        // Get the Id from the authentication
        user_id = auth_middleware(context)
    }
    const properties = []
    if(user_id){
        const QuerySnapshots = await firestore.collection(collections.property.main).where('user_id', '==', user_id).get()
        
        QuerySnapshots.forEach((snapshot) => {
            let property = snapshot.data()
            property.id = snapshot.ref.id
            properties.push(property)
        })        
    }
    return properties;

 }

 module.exports = getUserProperties