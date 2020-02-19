
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
                                    verification: 'verification',
                                },
                                trash: 'graphQL_users_trash'
                            },
                        property: {
                            main: 'graphQL_properties',
                            subcollections: {

                            },
                            trash: 'graphQL_properties_trash'
                        },
                        reservation: {
                            main: 'graphQL_reservations',
                            subcollections: {
                                
                            },
                            trash: 'graphQL_reservations_trash'
                        }
                    }
module.exports = collections