import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList, GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";
import { TodoModel } from "./Todo.model";
import {GraphQLISODateTime} from "type-graphql";

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: {
            type: GraphQLID
        },
        task: {
            type: GraphQLString,
        },
        dueDate: {
            type: GraphQLString,
        },
        addedOn: {
            type: GraphQLString,
        },
        priority: {
            type: GraphQLInt,
        },
        deleted: {
            type: GraphQLBoolean
        }

    }
});

export const graphQLTodoSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            todos: {
                type: GraphQLList(TodoType),
                resolve: (root, args, context, info) => {
                    return TodoModel.find().exec();
                }
            },
            todo: {
                type: TodoType,
                args: {
                    id: {
                        type: GraphQLID
                    }
                },
                resolve: (root, args, context, info) => {
                    return TodoModel.findById(args.id).exec();
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            todo: {
                type: TodoType,
                args: {
                    id: {
                        type: GraphQLID
                    },
                    task: {
                        type: GraphQLNonNull(GraphQLString)
                    },
                    priority: {
                        type: GraphQLInt
                    },
                    deleted: {
                        type: GraphQLBoolean
                    },
                    dueDate: {
                        type: GraphQLISODateTime
                    }
                },
                resolve: async (root, args, context, info) => {
                    let todo;
                    const id = args.id;
                    if(id){
                        todo = await TodoModel.findById(args.id).exec();
                        todo.update(new TodoModel(args));
                    }else {
                        todo = new TodoModel(args);
                    }
                    return todo.save();
                }
            }
        }
    })
});
