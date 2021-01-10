const helper = require('../../../../helpers');

const notification =  {
    text: (parent) => parent.text,
    timestamp: (parent) => parent.timestamp,
    time: (parent) => helper.resolveTimestamp(parent.timestamp),
    read: (parent) => parent.read,
    payload: (parent) => parent.payload
};

module.exports = notification;