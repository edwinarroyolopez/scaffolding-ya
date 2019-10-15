'use strict'

const pool = require('../..data/db')
const errorHandler = require('../errorHandler')
var uuid = require('uuid-random');

module.exports = {
   createCourse: async (root, { input })  => {
      let defaults = {
         teacher: '',
         topic: ''
      }

      const newCourse = Object.assign(defaults, input)
      console.log('newCourse',newCourse)
      let course

      try {
         const uid = uuid()
         const { title, teacher, description, topic, level } = newCourse
         console.log(title, teacher, description, topic)
         const client = await pool.connect()
         const { rows } = await client.query('INSERT INTO course (uuid_course,title,teacher,description,topic,level) values ($1, $2, $3, $4, $5, $6)  returning *', [uid, title, teacher, description, topic, level])
         course = rows[0]

      } catch (error) {
          errorHandler(error)
      }
      return course
   },
   editCourse: async (root, { uuid_course, input } ) => {
      let course
      try {
         const { title, teacher, description, topic } = input   
         const client = await pool.connect()
         const { rows } = await client.query('UPDATE course SET title=$2, teacher=$3, description=$4, topic=$5, level=$6 WHERE uuid_course=$1 returning *',[
            uuid_course, title, teacher, description, topic, level
         ])
         course = rows[0]
      } catch (error) {
         errorHandler(error)
      }
      return course
   },
   deleteCourse: async (root, { uuid_course }) => {
      let isDeleted
      try {
         const client = await pool.connect()
         const { rowCount } = await client.query('DELETE FROM course WHERE uuid_course=$1',[uuid_course])         
         isDeleted = rowCount
      } catch (error) {
         console.log(error)
      }
      return isDeleted
   }
} 