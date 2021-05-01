const charge = {
    net_captured: (parent) => parent.amount_captured - parent.amount_refunded
}

module.exports = charge;