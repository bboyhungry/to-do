import React from "react";
import type { Item } from "../types/ItemType";

type ItemListProps = {
    items: Item[];
}

function ItemList(props: ItemListProps){

    const { items } = props;

    if (ItemList.length === 0) {
        return (
            <div className="mt-4 text-gray-400 text-sm">
                No Items yet
            </div>
        );
    }

    return (
        <div className="mt-4 flex flex-col gap-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-2 border rounded-lg"
                >
                    <span
                        className={`text-left ${item.completed ? "line-through text-gray-400" : ""}`}
                    >
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
