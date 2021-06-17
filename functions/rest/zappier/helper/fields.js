const firebaseAdmin = require('../../../admin');
const collections = require('../../../enums/collections');
const firestore = firebaseAdmin.firestore();
/**
 * Get property reservation fields
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllFields = async (property) => {

    const charges = await getCharges(property);
    const instructions = await getInstructions(property);
    const agreements = await getAgreements(property);
    const questions = await getQuestions(property);
    
    return {
        charges,
        instructions,
        agreements,
        questions
    };
};

const getCharges = async (property) => {
    const charges = [];
    
    const QuerySnapshots = await firestore.collection(collections.property.main).doc(property.id)
    .collection(collections.property.subcollections.charges)
    .get();
    QuerySnapshots.forEach((snapshot) => {
      charges.push({
        id: snapshot.ref.id,
        ...snapshot.data()
      })
    }); 

    return charges;
}

const getInstructions = async (property) => {

    const instructions = [];

    const QuerySnapshots = await firestore.collection(collections.property.main).doc(property.id).collection(collections.property.subcollections.checkin_instructions).get();
    QuerySnapshots.forEach((snapshot) => {
      instructions.push({
        id: snapshot.ref.id,
        ...snapshot.data()
      })
    });

    return instructions;
}

const getAgreements = async (property) => {
    const document = await firestore.collection(collections.property.main).doc(property.id)
    .collection(collections.property.meta.name)
    .doc(collections.property.meta.documents.checkin_agreements).get();

    return document.exists ? document.data().agreements : []
}

const getQuestions = async (property) => {
    const document = await firestore.collection(collections.property.main).doc(property.id)
    .collection(collections.property.meta.name)
    .doc(collections.property.meta.documents.checkin_questions).get();
  
    return document.exists ? document.data().questions : []
}

module.exports = {
    getAllFields, getCharges, getInstructions, getAgreements, getQuestions
};