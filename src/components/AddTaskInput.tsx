import { useState } from "react";

type AddTaskInputProps = {
    onAddTask: (title: string) => Promise<void>;
};

function AddTaskInput(props: AddTaskInputProps) {

    const [input, setInput] = useState("");

    const { onAddTask } = props;

    const onSubmit = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        onAddTask(trimmed);
        setInput("");
    };

    return (
        <div className="flex gap-2 items-center mb-4">
            <input
                type="text"
                placeholder="Add new task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") onSubmit() }}
                className="flex-1 border-b border-gray-300 px-2 py-2 outline-none text-base"
            />
            <button
                onClick={onSubmit}
                className="w-10 h-10 rounded-xl bg-gray-700 text-white flex items-center justify-center text-xl hover:bg-gray-900 cursor-pointer"
            >
            +
            </button>
        </div>
    );
}

export default AddTaskInput;
