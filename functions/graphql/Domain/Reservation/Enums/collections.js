const collections = {
    main: 'graphQL_reservations',
    meta: {
        name: 'reservation_documents',
        documents: {
            checkin: 'checkin'
        }
    },
    subcollections: {
       payments: 'reservation_payments'
    },
    trash: 'graphQL_reservations_trash'
};

module.exports = collections;