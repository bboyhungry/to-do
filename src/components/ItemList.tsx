import { useState } from "react";
import type { Item } from "../types/ItemType";

type ItemListProps = {
    items: Item[];
    onDeleteItem: (id: number) => Promise<void>;
    onToggleItem: (id: number, completed: boolean) => Promise<void>;
    onEditItem: (id: number, title: string) => Promise<void>;
}

function ItemList(props: ItemListProps){

    const { items, onDeleteItem, onToggleItem, onEditItem  } = props;
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState("");

    const onClickTitle = (item: Item) => {
        if (item.completed) return;
        setEditingId(item.id);
        setEditingTitle(item.title);
    }

    const onSave = async (id: number) => {
        if (editingTitle.trim() === "") return;
        await onEditItem(id, editingTitle);
        setEditingId(null);
    };

    if (items.length === 0) {
        return (
            <div className="mt-4 text-gray-400 text-sm">
                No Items yet
            </div>
        );
    }

    return (
    <div className="flex flex-col gap-3">
        {items.map((item) => (
        <div
            key={item.id}
            onClick={() => onClickTitle(item)}
            className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-2xl"
        >
            <div className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(item.id, item.completed)}
                onClick={(e) => e.stopPropagation()}
                className="w-5 h-5 rounded border-gray-300"
            />
            {editingId === item.id ? (
                <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => onSave(item.id)}
                    onKeyDown={(e) => { if (e.key === "Enter") onSave(item.id) }}
                    onClick={(e) => e.stopPropagation()}
                    className="border-b border-gray-300 outline-none"
                    autoFocus
                />
            ) : (
                <span
                    className={item.completed ? "line-through text-gray-400" : ""}
                >
                    {item.title}
                </span>
            )}
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onDeleteItem(item.id); }}
                className="text-gray-400 hover:text-red-500 text-lg"
            >✕
            </button>
        </div>
        ))}
    </div>
    );
}

export default ItemList;
