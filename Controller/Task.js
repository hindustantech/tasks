import Task from "../Modal/Task.js";

export const AddTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            userId
        })
        res.status(201).json({
            success: true,
            task,
            message: "Task Created"
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Task Created"
        })
    }


}


export const getAllTask = async (req, res) => {

    const userId = req.user.id;
    console.log("userId", userId);
    const task = await Task.find({ userId }).sort({ createdAt: -1 });
    if (!task) {
        res.status(404).json({
            success: false,
            message: "Data Not Found "
        })
    }
    res.status(200).json({
        task, success: true, message: "Data Getting  Perfect"
    })
}


export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params; // Task ID from URL
        const userId = req.user.id; // Authenticated user ID
        const updateData = req.body; // Data to update

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId }, // Ensure task belongs to the user
            updateData,
            { new: true, runValidators: true } // Return updated task & validate fields
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you don't have permission to update it",
            });
        }

        res.status(200).json({
            success: true,
            task: updatedTask,
            message: "Task updated successfully",
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params; // Task ID from URL
        const userId = req.user.id; // Authenticated user ID

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you don't have permission to delete it",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
