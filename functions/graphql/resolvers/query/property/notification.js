const helper = require('./../../../../helper');
const notification = {
    text: (parent) => parent.text,
    type: (parent) => parent.type,
    timestamp: (parent) => parent.timestamp,
    time: (parent) => helper.resolveTimestamp(parent.timestamp),
    read: (parent) => parent.read,
    property: (parent) => parent.property,
    payload: (parent) => parent.payload
}

module.exports = notification;