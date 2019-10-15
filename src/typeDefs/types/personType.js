export default `

    interface Person {
        uuid_student: ID!
        name: String!
        email: String!
    }

    type Monitor implements Person {
        uuid_student: ID!
        name: String!
        email: String!
        phone: String
    }

    type Student implements Person {
        uuid_student: ID!
        name: String!
        email: String!
        avatar: String
    }

    type Query {
        "Return all students"
        getPeople: [Person]
        "Return a student"
        getPerson(uuid_student: ID!): Person
        "Execute a global search"
        searchItems(keywords: String!): [GlobalSearch]
    }

    input PersonInput {
        name: String!
        email: String!
        phone: String
        avatar: String
    }

    input PersonEditInput {
        name: String
        email: String
        phone: String
        avatar: String
    }

    type Mutation {
        "Create a erson"
        createPerson(input: PersonInput!): Person
        "Edit a person"
        editPerson(uuid_student:ID!, input: PersonEditInput!): Student
        "Delete a person"
        deletePerson(uuid_student:ID!): Boolean
        "Add a people to course"
        addPeople(uuid_course: ID!, uuid_student: ID!): Course
    }
`