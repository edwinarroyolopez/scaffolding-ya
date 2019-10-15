'use strict'

const pool = require('../data/db')
const errorHandler = require('../errorHandler')

module.exports = {
    Course: {
        students: async ({ students }) => {
            let studentsData
            let uuids
            try {
                const client = await pool.connect()
                uuids = students ? students.map( student =>  student.uuid_student ) : []
                studentsData  = uuids.length > 0 
                    ? await client.query('SELECT * FROM student where uuid_student in ($1)', [uuids.join(',')])
                    : []

                studentsData = Array.isArray(studentsData) ? [] : studentsData.rows
            } catch (error) {
                errorHandler(error)
            }

            return studentsData
        }
    },
    Person: {
        __resolveType: (person, context, info) => {
            if(person.phone){
                return 'Monitor'
            }
            return 'Student'
        }
    },
    GlobalSearch: {
        __resolveType: (item, conext, info) => {
            if(item.title){
                return 'Course'
            }

            if(item.phone){
                return 'Monitor'
            }
            return 'Student'
        }
    }
}