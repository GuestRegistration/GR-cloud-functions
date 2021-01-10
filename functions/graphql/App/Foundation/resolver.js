const sub = require('../Providers/pubsub');

const helloWorld = {
    helloWorldQ: (parent, args, context) =>  {
        return "Hello world. This is resolved for the root query";
    },
    helloWorldM: (parent, args, context) =>  {
        sub.publish('HELLO_WORLD', {helloWorldS: "Hello world mutation just ran"});

        return "Hello world. This is resolved for the root mutation";
    },
    subscribeHelloWorld: (parent, args, context) =>  {
        if(args.subscribe){
            sub.subscribe("HELLO_WORLD", (args) => {
                console.log('This is from your "HELLO_WORLD" subscription: -->'+args);
            });
            return "You are now subscribed!";
        } 
        return "Not subscribed...";
    },
    helloWorldS: {
        subscribe: () => sub.asyncIterator(['HELLO_WORLD'])
    }
};

module.exports = helloWorld;