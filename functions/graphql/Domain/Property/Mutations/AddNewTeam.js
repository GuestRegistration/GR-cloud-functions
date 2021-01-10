/**
 * Add a new team member to a property
 */
const userCollections = require('../../User/Enums/collections');
const propertyCollections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

 const addNewTeam = async (parent, {id, prospect_id, role}) => {

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(propertyCollections.main).doc(id);
    const prospectRef = firestore.collection(userCollections.main).doc(prospect_id);

    const property = await propertyRef.get();
        if(property.exists){
            const prospect = await prospectRef.get();
            if(prospect.exists){
                const new_team = {
                        user_id: prospect.id,
                        name: prospect.data().name,
                        email: prospect.data().email,
                        role: role
                };
                // add the team in the property document
                await propertyRef.update({
                    team: firebase.firestore.FieldValue.arrayUnion(new_team)
                });
        
                //add the property to the user document too
                await prospect.ref.update({
                    properties: firebase.firestore.FieldValue.arrayUnion({
                        id: property.ref.id,
                        name: property.data().name,
                        city: property.data().address.city,
                        country: property.data().address.country,
                        role: role //set the creator as owner by default
                    })
                });
                return new_team;
            }else{
                throw new Error("User not found");
            }
        }else{
        throw new Error("Property does not exist");
    }
 };

 module.exports = addNewTeam;