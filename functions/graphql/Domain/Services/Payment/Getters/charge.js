const charge = {
    net_captured: (parent) => parent.amount - parent.amount_refunded
}

module.exports = charge;