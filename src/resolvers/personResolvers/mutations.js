'use strict'

const pool = require('./db')
const errorHandler = require('./errorHandler')
var uuid = require('uuid-random');

module.exports = {
   createPerson: async (root, { input })  => {
      let student
      try {
         const uid = uuid()
         const { name, email, phone, avatar } = input
         const client = await pool.connect()
         const { rows } = await client.query('INSERT INTO student (uuid_student,name,email,phone,avatar) values ($1, $2, $3, $4, $5)  returning *', [uid, name, email, phone, avatar])
         student = rows[0]

      } catch (error) {
          errorHandler(error)
      }
      return student
   },
   editPerson: async (root, { uuid_student, input } ) => {
      let student
      try {
         const { name, email } = input   
         const client = await pool.connect()
         const { rows } = await client.query('UPDATE student SET name=$2, email=$3 WHERE uuid_student=$1 returning *',[
            uuid_student, name, email
         ])
         student = rows[0]
      } catch (error) {
         errorHandler(error)
      }
      return student
   },
   deletePerson: async (root, { uuid_student }) => {
      let isDeleted
      try {
         const client = await pool.connect()
         const { rowCount } = await client.query('DELETE FROM student WHERE uuid_student=$1',[uuid_student])         
         isDeleted = rowCount
      } catch (error) {
         console.log(error)
      }
      return isDeleted
   },
   addPeople: async (root, { uuid_course, uuid_student }) => {
      let course
      let student
      try {
         const client = await pool.connect()
         let r_course = await client.query('SELECT * FROM course WHERE uuid_course=$1',[uuid_course])
         course = (r_course.rowCount>0) ? r_course.rows[0] : undefined

         let r_student = await client.query('SELECT uuid_student FROM student WHERE uuid_student=$1',[uuid_student])
         student = (r_student.rowCount>0) ? r_student.rows[0] : undefined

         if(!course || !student) throw new Error('The Student or Course dont exist!')

         console.log('student',student)
         console.log('uuid_student',uuid_student)

         let { rows } = await client.query(`UPDATE course SET students = COALESCE(students,'[]')  || $2  WHERE uuid_course = $1 returning *`,[
            uuid_course, student 
         ])
         course = rows[0]

      } catch (error) {
         console.log(error)
      }
      return course
   }
} 