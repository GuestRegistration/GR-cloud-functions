
const resolvers = {

        queries: {
                getAuth: require('./Queries/GetAuth')
        },
        
        mutations: {
                createToken: require('./Mutations/CreateToken')
        },

        subscriptions: {
                tokenChanged: require('./Subscriptions/TokenChanged')
        },

        types: {
                Auth: require('./Getters/Auth'),
                ClientToken: require('./Getters/ClientToken')
        }
};

module.exports = resolvers;
