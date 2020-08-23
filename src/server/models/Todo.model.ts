import Mongoose, {Schema} from "mongoose";

export enum Priority {
    HIGH,
    MEDIUM,
    LOW
}

export interface ITodo {
    task: string;
    dueDate: Date;
    addedOn: Date;
    priority: Priority;
    deleted: boolean;
}

const TodoSchema: Schema = new Schema<ITodo>({
    task: {
        type: String,
        required: [true, 'Task is required!!'],
        trim: true
    },
    dueDate: Date,
    addedOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    priority: {
        type: Priority,
        required: false
    },
    deleted: {
        type: Boolean
    }
});

export const TodoModel = Mongoose.model('Todo', TodoSchema);