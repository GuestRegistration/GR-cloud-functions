const helloWorld = require('../Foundation/resolver');
const register = require('../ResolversRegister');
let rootQuery = {
    helloWorldQ: helloWorld.helloWorldQ
};
let rootMutation = {
    helloWorldM: helloWorld.helloWorldM,
    subscribeHelloWorld: helloWorld.subscribeHelloWorld
};
let rootSubscription = {
    helloWorldS: helloWorld.helloWorldS
};

let rootTypes = {};

register.forEach(p=> {
    let queries = p.queries;
    let mutations = p.mutations;
    let subscriptions = p.subscriptions;
    let types = p.types;
    
    rootQuery = {...rootQuery, ...queries};
    rootMutation = {...rootMutation, ...mutations};
    rootSubscription = {...rootSubscription, ...subscriptions};
    rootTypes = { ...rootTypes, ...types };

});

const resolvers =  {
    Query: rootQuery,
    Mutation: rootMutation,
    Subscription: rootSubscription,
    ...rootTypes
};

module.exports = resolvers;