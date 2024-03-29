const graphql = require('graphql')
const users = require('./users.json')

let knowledgeType = new graphql.GraphQLObjectType({
    name: 'Knowledge',
    fields: {
        language: { type: graphql.GraphQLString },
        frameworks: { type: new graphql.GraphQLList(graphql.GraphQLString) }
    }
})

let userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        full_name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        city: { type: graphql.GraphQLString },
        tag: { type: graphql.GraphQLString },
        url: { type: graphql.GraphQLString },
        knowledge: { type: new graphql.GraphQLList(knowledgeType) }
    }
})

let schema = new graphql.GraphQLSchema({
    mutation: new graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: {
            newUser: {
                type: userType,
                args: {
                    user: userType
                },
                resolve: (_, args) => {
                    return {
                        id: args.id,
                        name: args.name
                    };
                }
            },
            updateUser: {
                type: userType,
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    }
                },
                resolve: (_, args) => {
                    let response = users.find(function (user) {
                        return (user.id === args.id)
                    })
                    return response
                }
            },
            deleteUser: {
                type: userType,
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    }
                },
                resolve: (_, args) => {
                    let response = users.find(function (user) {
                        return (user.id === args.id)
                    })
                    return response
                }
            }
        }
    }),
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userType,
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    }
                },
                resolve: function (_, args) {
                    let response = users.find(function (user) {
                        return (user.id === args.id)
                    })
                    return response
                }
            },
            users: {
                type: new graphql.GraphQLList(userType),
                resolve: function (_, args) {
                    return users
                }
            }
        }
    })
})

module.exports = schema