const helper = require('./../../../../helper');
const notification = {
    text: (parent) => parent.text,
    timestamp: (parent) => parent.timestamp,
    time: (parent) => helper.resolveTimestamp(parent.timestamp),
    read: (parent) => parent.read,
}

module.exports = notification;