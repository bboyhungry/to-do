import { useState, useEffect } from "react";
import AddItemInput from './components/AddItemInput'
import type { Item } from "./types/ItemType";
import ItemList from "./components/ItemList";


function App() {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5017/api/tasks");
      const data = await res.json();
      setItems(data);
    }

    fetchTasks();
  }, []);

  const onAddItem = async (title: string) => {
    const res = await fetch("http://localhost:5017/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title, completed: false }),
    });

    const newItem = await res.json();
    setItems((prev) => [newItem, ...prev])
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your List</h1>
      <AddItemInput onAddItem={onAddItem} />
      <ItemList items={items} />
    </div>
  );
}

export default App
