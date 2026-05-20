import { useState, useEffect } from "react";
import AddItemInput from './components/AddItemInput'
import type { Item } from "./types/ItemType";
import ItemList from "./components/ItemList";


function App() {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5017/api/tasks");
      const data = await res.json();
      setItems(data);
      setLoading(false);
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

  const onDeleteItem = async (id: number) => {
    await fetch(`http://localhost:5017/api/tasks/${id}`, {
      method: "DELETE",
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onToggleItem = async (id: number, completed: boolean) => {
    await fetch(`http://localhost:5017/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, completed: !completed } : i)
    );
  };

  const onEditItem = async (id: number, title: string) => {
    await fetch(`http://localhost:5017/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, title } : item)
    );
  };

  const remainingCount = items.filter(item => !item.completed).length;

  if (loading) {
    return <p className="text-center mt-8 text-gray-400">Loading...</p>;
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your List</h1>
      <AddItemInput onAddItem={onAddItem} />
      <ItemList items={items} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
      <p className="mt-4 text-sm text-black-400 font-bold italic">Remaining item{remainingCount !== 1 ? "s" : ""}: {remainingCount}</p>
    </div>
  );
}

export default App;