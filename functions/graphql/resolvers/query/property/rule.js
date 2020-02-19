const rule = {
    rule: (parent) => parent.rule,
    added_by: (parent) => parent.added_by,
    created_at: (parent) => parent.created_at,
    updated_at: (parent) => parent.updated_at
}

module.exports = rule;