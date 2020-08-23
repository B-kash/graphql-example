import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";
import {TodoModel} from "./Todo.model";

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
            }
        }
    })
});
