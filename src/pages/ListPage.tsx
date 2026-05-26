import { useState, useEffect } from "react";
import type { Task } from "../types/TaskType";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { ENV } from "../config";
import Spinner from "../components/Spinner";
import TaskList from "../components/TaskList";
import AddTaskInput from "../components/AddTaskInput";

function ListPage() {

  const [tasks, setTasks] = useState<Task[]>([]);
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
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [navigate]);

  const onAddTask = async (title: string) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${ENV.API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, completed: false }),
    });

    const newTask = await res.json();
    setTasks((prev) => [newTask, ...prev]);
  }

  const onDeleteTask = async (id: number) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers,
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onToggleTask = async (id: number, completed: boolean) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ completed: !completed }),
    });
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, completed: !completed } : t)
    );
  };

  const onEditTask = async (id: number, title: string) => {
    const headers = await getAuthHeaders();
    await fetch(`${ENV.API_BASE_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ title }),
    });
    setTasks((prev) =>
      prev.map((task) => task.id === id ? { ...task, title } : task)
    );
  };

  const remainingCount = tasks.filter(task => !task.completed).length;

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
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
        <AddTaskInput onAddTask={onAddTask} />
        <TaskList tasks={tasks} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        <p className="mt-4 text-sm text-black-400 font-bold italic">Remaining task{remainingCount !== 1 ? "s" : ""}: {remainingCount}</p>
      </div>
    </div>
  );
}

export default ListPage;