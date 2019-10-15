export default `

    type Course {
        uuid_course: ID!
        title: String!
        teacher: String
        description: String!
        topic: String @deprecated
        students: [Person]
        level: Level
    }

    type Query {
        "Return all courses"
        getCourses: [Course]
        "Return a course"
        getCourse(uuid_course: ID!): Course
    }

    input CourseInput {
        title: String!
        teacher: String
        description: String!
        topic: String
        level: Level
    }

    input CourseEditInput {
        title: String
        teacher: String 
        description: String
        topic: String
        level: Level
    }

    type Mutation {
        "Create a course"
        createCourse(input: CourseInput!): Course
        "Edit a course"
        editCourse(uuid_course:ID! ,input: CourseEditInput!): Course
        "Delete a course"
        deleteCourse(uuid_course:ID!): Boolean
    }
`
