import {Router} from "express";
import {graphqlHTTP} from "express-graphql";
import {graphQLTodoSchema} from "../models/TodoGraph";

export class TodoRouter {
    private readonly _router: Router;

    constructor() {
        this._router = Router();
        this._routes();
    }

    get router(): Router {
        return this._router;
    }

    private _routes(): void {
        this._router.get('/', graphqlHTTP({
            schema:graphQLTodoSchema,
            graphiql: false
        }));
    }
}