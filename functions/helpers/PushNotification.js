const admin = require('../admin');
const userCollections = require('../graphql/Domain/User/Enums/collections');

const pushNotification = async ({user_id, token, payload}) => {
    let response = '';
    let devices = [];
    const firestore = admin.firestore();

    if(token){
        devices.push({ token });
    }else{
        const devicesSnapshot  = await firestore.collection(userCollections.main)
                                    .doc(user_id)
                                    .collection(userCollections.subcollections.devices)
                                    .get();

        devicesSnapshot.forEach(snapshot => {
            devices.push({
                id: snapshot.ref.id,
                token: snapshot.data().notification_token,
            });
        });
    }

    if(devices.length){
        let tokensToRemove = [];
        const notification = await admin.messaging().sendToDevice(devices.map(device => device.token), payload);
        notification.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                response += `Failure sending notification to ${devices[index].token}: ${error.code}`;
              // Cleanup the tokens who are not registered anymore.
              if (
                  (error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registered') && devices[index].id
                ) {
                tokensToRemove.push(
                    firestore.collection(userCollections.main)
                        .doc(user_id)
                        .collection(userCollections.subcollections.devices)
                        .doc(devices[index].id)
                        .delete()
                );
              }
            }else{
                response += `Notification sent to ${devices[index].token}`;
            }
          });
    }

    return response;
};

module.exports = pushNotification;  