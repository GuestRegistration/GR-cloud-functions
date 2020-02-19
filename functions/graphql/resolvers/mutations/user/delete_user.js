
/**
 * soft delete a user account
 * 
 * */ 
const admin = require('./../../../../admin')
const firestore = admin.firestore()
const helper = require('./../../../../helper')
const collections = require('../../../../enums/collections')

const deleteUser = async (parent, {id}) => {
    
    const user = await firestore.collection(collections.user).doc(id).get()
    const update = user.ref.update({

        'timestamp.deleted_at': helper.nowTimestamp()
        
    })

    return user;
}

module.exports = deleteUser;