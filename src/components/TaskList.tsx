import { useState } from "react";
import type { Task } from "../types/TaskType";

type TaskListProps = {
    tasks: Task[];
    onDeleteTask: (id: number) => Promise<void>;
    onToggleTask: (id: number, completed: boolean) => Promise<void>;
    onEditTask: (id: number, title: string) => Promise<void>;
}

function TaskList(props: TaskListProps){

    const { tasks, onDeleteTask, onToggleTask, onEditTask } = props;
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState("");

    const onClickTitle = (task: Task) => {
        if (task.completed) return;
        setEditingId(task.id);
        setEditingTitle(task.title);
    }

    const onSave = async (id: number) => {
        if (editingTitle.trim() === "") return;
        await onEditTask(id, editingTitle);
        setEditingId(null);
    };

    if (tasks.length === 0) {
        return (
            <div className="mt-4 text-gray-400 text-sm">
                No tasks yet
            </div>
        );
    }

    return (
    <div className="flex flex-col gap-3">
        {tasks.map((task) => (
        <div
            key={task.id}
            onClick={() => onClickTitle(task)}
            className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-2xl"
        >
            <div className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id, task.completed)}
                onClick={(e) => e.stopPropagation()}
                className="w-5 h-5 rounded border-gray-300"
            />
            {editingId === task.id ? (
                <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => onSave(task.id)}
                    onKeyDown={(e) => { if (e.key === "Enter") onSave(task.id) }}
                    onClick={(e) => e.stopPropagation()}
                    className="border-b border-gray-300 outline-none"
                    autoFocus
                />
            ) : (
                <span
                    className={task.completed ? "line-through text-gray-400" : ""}
                >
                    {task.title}
                </span>
            )}
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                className="text-gray-400 hover:text-red-500 text-lg"
            >✕
            </button>
        </div>
        ))}
    </div>
    );
}

export default TaskList;
