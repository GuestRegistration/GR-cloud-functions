/**
 * create a new property
 */

//  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const auth_middleware = require('./../../../middleware/user_authenticated')
const user_middleware = require('./../../../middleware/user_authorized')


const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()
const helper = require('./../../../../helper')
const jwt = require('jsonwebtoken')
const signature = require('./../../../../key/jwt-key')

 const createOrganization = async (parent, {name}, context) => {
    client_middleware(context)
    const auth = auth_middleware(context)
    if(auth){
        if(!(await firestore.collection(collections.organization.main).where('name','==',name).get()).empty){
            throw new Error(`Name ${name} already exist`)
        }
        const user = (await firestore.collection(collections.user.main).doc(auth).get()).data()
        
        let organization = {
            name,
            members: [{
                user_id: auth,
                name: user.name,
                role: 'owner'
            }],
            token: jwt.sign({auth, name}, signature)
        }
        const result = await firestore.collection(collections.organization.main).add(organization)
        
        organization = (await firestore.collection(collections.organization.main).doc(result.id).get()).data()
        organization.id = result.id
        return organization;
    }
    return null
   
}

 module.exports = createOrganization