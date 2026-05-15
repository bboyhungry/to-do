import React from "react";
import type { Item } from "../types/ItemType";

type ItemListProps = {
    items: Item[];
}

function ItemList(props: ItemListProps){

    const { items } = props;

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
            className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-2xl"
        >
            <div className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {}}
                className="w-5 h-5 rounded border-gray-300"
            />
            <span className={item.completed ? "line-through text-gray-400" : ""}>
                {item.title}
            </span>
            </div>
            <button className="text-gray-400 hover:text-red-500 text-lg">✕</button>
        </div>
        ))}
    </div>
    );
}

export default ItemList;
