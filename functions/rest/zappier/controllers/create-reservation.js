const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');
const { app } = require('../../../config');
const { generateNanoID } = require('../../../helpers/database');

firebaseAdmin.firestore().settings({
    ignoreUndefinedProperties: true
});

const createReservation = async (req, res) => {

    const firestore = firebaseAdmin.firestore();

    const property = req.property;
    const {
        name, 
        room,
        balance,
        booking_reference, 
        checkin_date, 
        checkout_date, 
        charges, 
        agreements, 
        questions,
        instructions,
    } = req.body;

    // const parseArrayValue = (value) => {
    //     if(!value) return [];
    //     if(value instanceof Array) return value.map(v => v instanceof Object ? v : JSON.parse(v));
    //     return value;
    // };
      
    try {
        const reservation = {
            property_id: property.id,
            name, 
            room,
            balance,
            booking_reference, 
            checkin_date, 
            checkout_date, 
            charges, 
            agreements, 
            questions, 
            instructions,
        };

        const uniqueId = await generateNanoID(collections.reservation.main, 8);
        const reference = firestore.collection(collections.reservation.main).doc(uniqueId);

        await reference.set(reservation);
        
        res.status(200).send({
            checkin_url: `${app.url}/r/${uniqueId}`
        });

        res.status(200).send({
            ...reservation,
            property : {
                name: property.name,
                address: property.full_address
            },
            checkin_url: `${app.url}/r/${property.id}`
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        })
    }
}

module.exports = createReservation;
