/**
 * Add a new team member to a property
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

 const addNewTeam = async (parent, {id, prospect_id, role}) => {
    const propertyRef = firestore.collection(collections.property.main).doc(id)
    const prospectRef = firestore.collection(collections.user.main).doc(prospect_id)

    const property = await propertyRef.get()
        if(property.exists){
            const prospect = await prospectRef.get()
            if(prospect.exists){
                const new_team = {
                        user_id: prospect.id,
                        name: prospect.data().name,
                        email: prospect.data().email,
                        role: role
                }
                // add the team in the property document
                await propertyRef.update({
                    team: admin.firestore.FieldValue.arrayUnion(new_team)
                })
        
        
                //add the property to the user document too
                await prospect.ref.update({
                    properties: admin.firestore.FieldValue.arrayUnion({
                        id: snapshot.id,
                        name: property.data().name,
                        city: property.data().address.city,
                        country: property.data().address.country,
                        role: role //set the creator as owner by default
                    })
                })
                return new_team
            }else{
                throw new Error("User not found")
            }
        }else{
        throw new Error("Property does not exist")
    }
 }