'use strict'

const pool = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
    getPeople: async () => {
        let students = []
        try {
            const client = await pool.connect()
            const { rows } = await client.query('SELECT * FROM student')
            students = rows
        } catch (error) {
            errorHandler(error)
        }
        return students
    }, 
    getPerson: async (root, args) => {
        let student
        try {
            const client = await pool.connect()
            const { rows } = await client.query('SELECT * FROM student WHERE uuid_student=$1',[args.uuid_student])
            student = rows[0]
            console.log('rows',rows)
        } catch (error) {
            errorHandler(error)
        }
        return student
    },
    searchItems: async (root, keywords) => {
        let items
        let courses
        let people
        try {
            console.log('keywords',keywords)
            console.log('keywords - text',keywords.keywords)

            const client = await pool.connect()
            let r_courses = await client.query(`SELECT * FROM course 
                WHERE to_tsvector(title ||' '|| description) @@ to_tsquery($1)`,
                [keywords.keywords]
            )
            courses = (r_courses.rowCount>0) ? r_courses.rows : []
            console.log('courses', courses)
            let r_people = await client.query(`SELECT * FROM student 
                WHERE to_tsvector(name ||' '|| email) @@ to_tsquery($1)`,
                [keywords.keywords]
            )

            people = (r_people.rowCount>0) ? r_people.rows : []
            console.log('people', people)
            items = [...courses, ...people ]
            console.log('items', items)

        } catch (error) {
            errorHandler(error)
        }
        return items
    }
}