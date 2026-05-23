import { useState, useEffect } from "react";
import AddItemInput from "../components/AddItemInput";
import type { Item } from "../types/ItemType";
import ItemList from "../components/ItemList";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { ENV } from "../config";

function ListPage() {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthHeaders = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${ENV.API_BASE_URL}/api/tasks`, { headers });
        if (!res.ok) {
          if (res.status === 401) {
            await supabase.auth.signOut(); 
            navigate("/");
            return;
          }
          throw new Error(`Server responded with status: ${res.status}`);
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch tasks: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const onAddItem = async (title: string) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${ENV.API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify({title, completed: false }),
    });

    const newItem = await res.json();
    setItems((prev) => [newItem, ...prev])
  }

  const onDeleteItem = async (id: number) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers,
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onToggleItem = async (id: number, completed: boolean) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ completed: !completed }),
    });
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, completed: !completed } : i)
    );
  };

  const onEditItem = async (id: number, title: string) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers,
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
      <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Check List</h1>
        <button
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition cursor-pointer"
        >
          Sign out
        </button>
      </nav>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Your List</h1>
          <AddItemInput onAddItem={onAddItem} />
          <ItemList items={items} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
          <p className="mt-4 text-sm text-black-400 font-bold italic">Remaining item{remainingCount !== 1 ? "s" : ""}: {remainingCount}</p>
        </div>
    </div>
  );
}

export default ListPage;