'use strict'

const pool = require('../..data/db')
const errorHandler = require('../errorHandler')

module.exports = {
    getCourses: async () => {
        let courses = []
        try {
            const client = await pool.connect()
            const { rows } = await client.query('SELECT * FROM course')
            courses = rows
        } catch (error) {
            errorHandler(error)
        }
        return courses
    },
    getCourse: async (root, args) => {
        let course
        try {
            const client = await pool.connect()
            const { rows } = await client.query('SELECT * FROM course WHERE uuid_course=$1',[args.uuid_course])
            course = rows[0]
            console.log('rows',rows)
        } catch (error) {
            errorHandler(error)
        }
        return course
    }
}