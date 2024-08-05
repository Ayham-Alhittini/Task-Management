import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        validate: {
            validator: function (value) {
                return value.trim().length > 0; // Ensure the value is not just spaces
            },
            message: 'Task title cannot be empty'
        }
    },
    taskDescription: {
        type: String,
        trim: true
    },
    taskAssociatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isTaskCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    taskDueDate: {
        type: Date,
        required: false,
        default: null
    },
    taskDay: {
        type: Date,
        required: false,
        default: null
    },
    taskPriority: {
        type: String,
        enum: ['Regular', 'Moderate', 'High'],
        default: 'Regular',
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true
    }
});

export default mongoose.model('Task', taskSchema);
