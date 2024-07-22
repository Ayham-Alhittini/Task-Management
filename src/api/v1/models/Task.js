
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        validate: {
            validator: function(value) {
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
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);

// taskListId: {},
// taskPriority: {},
// taskDueDate: {},
// taskReminderDatetime: {}

