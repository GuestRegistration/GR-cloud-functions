
/**
 * Enumearation of collections and subcollections used by the application
 * 
 */

 const collections = {
                        user: {
                                main: 'graphQL_users',
                                meta: {
                                    name: 'user_meta',
                                    documents: {
                                        device: 'device',
                                        verification: 'verification',
                                    }
                                },
                                subcollections: {
                                    payments: 'payments',
                                },
                                trash: 'graphQL_users_trash'
                            },
                        property: {
                            main: 'graphQL_properties',
                            meta: {
                                name: 'property_meta',
                                documents: {
                                    rules: 'rules'
                                }
                            },
                            subcollections: {

                            },
                            trash: 'graphQL_properties_trash'
                        },
                        reservation: {
                            main: 'graphQL_reservations',
                            meta: {
                                name: 'reservation_documents',
                                documents: {
                                    checkin: 'checkin'
                                }
                            },
                            subcollections: {
                               
                            },
                            trash: 'graphQL_reservations_trash'
                        }
                    }
module.exports = collections