'use strict'

const mutations = require('./mutations')
const queries = require('./queries')

const personResolvers = {
    Query: queries,
    Mutation: mutations
}

module.exports = {
    personResolvers
}