const collections = {
    main: 'reservations',
    meta: {
        name: 'reservation_documents',
        documents: {
            checkin: 'checkin'
        }
    },
    subcollections: {
       payments: 'reservation_payments',
    },
    trash: 'reservations_trash'
};

module.exports = collections;