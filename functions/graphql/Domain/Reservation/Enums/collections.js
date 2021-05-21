const collections = {
    main: 'reservations',
    meta: {
        name: 'reservation_documents',
        documents: {
            checkin: 'checkin',
            id_verification: 'id_verification'
        }
    },
    subcollections: {
       payments: 'reservation_payments',
    },
    trash: 'reservations_trash'
};

module.exports = collections;