/**
 * Get user notification
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const firestore = firebaseAdmin.firestore();

const getNotifications = (property) => {

    return new Promise((resolve, reject) => {
        firestore.collection(collections.main).doc(property.id)
        .collection(collections.subcollections.notifications).get()
        .then(snapshot => {
            resolve({snapshot, property});
        })
        .catch(e => {
            reject(e);
        });
    });
 };

 const getPropertyNotifications = async (parent, args, context) => { 
    clientAuthorizedMiddleware(context);
    let user_id = userAuthenticatedMiddleware(context);
    let notifications = [];
    
    if(user_id){
        propertyQuerySnapshots = null;

        if(args.id){
            propertyQuerySnapshots = await firestore.collection(collections.main).where('user_id', '==', user_id).where('id', '==', args.id).get();
        }else{
            propertyQuerySnapshots = await firestore.collection(collections.main).where('user_id', '==', user_id).get();
        }

        const notificationPromises = [];

        propertyQuerySnapshots.forEach(snapshot => {
            let property = snapshot.data();
            property.id = snapshot.ref.id;
            notificationPromises.push(getNotifications(property));
        });

        (await Promise.all(notificationPromises))
        .forEach(response => {
            response.snapshot.forEach( notification => {
                let data = notification.data();
                data.id = notification.ref.id;
                data.property = response.property;
                notifications.push(data);
            });
        });
    }

    return notifications.sort((a,b) => b.timestamp - a.timestamp);           
 };

 module.exports = getPropertyNotifications;