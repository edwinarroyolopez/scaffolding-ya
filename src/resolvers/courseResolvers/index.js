'use strict'

const mutations = require('./mutations')
const queries = require('./queries')

const courseResolvers = {
    Query: queries,
    Mutation: mutations
}

module.exports = {
    courseResolvers
}