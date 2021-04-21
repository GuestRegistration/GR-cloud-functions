const admin = require('../admin');
const collections = require('../enums/collections');

const sendToUser = async (user_id, payload) => {
    const firestore = admin.firestore();

    return firestore.collection(collections.user.main).doc(user_id).collection(collections.user.subcollections.devices).get()
    .then(devicesSnapshot => {
        if(devicesSnapshot.empty) return Promise.resolve([]);
        const devices = [];
        devicesSnapshot.forEach(snapshot => {
            devices.push({
                id: snapshot.ref.id,
                token: snapshot.data().notification_token,
                ref: snapshot.ref
            });
        })

        return Promise.resolve(devices);
    })
    .then(devices => sendToDevice(devices, payload))
};

const sendToDevice = (devices , payload) => {
    return admin.messaging().sendToDevice(devices.map(device => device.token), payload)
    .then(notification => {
        const tokenCleanup = [];

        notification.results.forEach((result, index) => {
        const error = result.error;

        if (error) {
            // Cleanup the tokens who are not registered anymore.
            if (
                (error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registered') && devices[index].ref
            ) {
                tokenCleanup.push(devices[index].ref.delete()); 
            }
        }
        });
        return Promise.all(tokenCleanup)
    })
}

module.exports = { sendToUser, sendToDevice };  