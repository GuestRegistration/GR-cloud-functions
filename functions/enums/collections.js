
/**
 * Enumearation of collections and subcollections used by the application
 * 
 */

 const collections = {
                        user: {
                                main: 'graphQL_users',
                                subcollections: {
                                    device: 'device',
                                    payment: 'payment',
                                    id_verification: 'id_verification',
                                },
                                trash: 'graphQL_user_trash'
                            },
                        property: {
                            main: 'graphQL_properties',
                            subcollections: {

                            },
                            trash: 'graphQL_property_trash'
                        },
                        reservation: {
                            main: 'graphQL_reservations',
                            subcollections: {
                                
                            },
                            trash: 'graphQL_reservation_trash'
                        }
                    }
module.exports = collections