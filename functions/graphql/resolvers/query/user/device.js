const device = {
    user_id: (parent) => parent.user_id,
    device_id: (parent) => parent.device_id,
    device_name: (parent) => parent.device_name,
    device_ip: (parent) => parent.device_ip,
    last_updated: (parent) => parent.last_updated,
}

module.exports = device