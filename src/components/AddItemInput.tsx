import { useState } from "react";

type AddItemInputProps = {
    onAddItem: (name: string) => void;
};

function AddItemInput(props: AddItemInputProps) {

    const [input, setInput] = useState("");

    const { onAddItem } = props;

    const onSubmit = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        onAddItem(trimmed);
        setInput("");
    };

    return (
        <div className="flex gap-2 p-2">
            <input
                type="text"
                placeholder="Add item..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {if (e.key == "Enter") onSubmit() }}
                className="flex-1 border rounded px-3 py-2"
                />
            <button
                onClick={onSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"    
            >
                Add
            </button>
        </div>
    );
}

export default AddItemInput;
