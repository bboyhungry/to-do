import { useState } from "react";
import AddItemInput from './components/AddItemInput'
import type { Item } from "./types/ItemType";
import ItemList from "./components/ItemList";


function App() {

  const [items, setItems] = useState<Item[]>([]);

  const onAddItem = (name: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      name,
      completed: false
    };
    setItems((prev) => [newItem, ...prev]);
  }

  return (
    <>
      <AddItemInput onAddItem={onAddItem} />
      <ItemList items={items} />
    </>
  )
}

export default App
