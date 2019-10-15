'use strict'

const types = require('./types')
const { courseResolvers } = require('./courseResolvers');
const { personResolvers } = require('./personResolvers');

const resolvers = [
    courseResolvers,
    personResolvers,
    ...types
]

module.exports = {
  resolvers
}
