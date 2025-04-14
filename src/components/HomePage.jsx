import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { 
  FiMenu, 
  FiSearch, 
  FiCalendar, 
  FiSettings, 
  FiLogOut,
  FiPlus,
  FiChevronsRight
} from 'react-icons/fi';
import { 
  BsListTask,
  BsCalendarEvent,
  BsStickyFill
} from 'react-icons/bs';

const HomePage = () => {
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, setTodos } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch todos from API
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [setTodos]);

  // Add mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMenuOpen) {
        // Show floating menu when cursor is within 50px of left edge
        setShowFloatingMenu(e.clientX < 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMenuOpen]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now(),
      todo: newTodo.trim(),
      completed: false,
      userId: 1,
    };

    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      addTodo(data);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
      addTodo(todo);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      deleteTodo(id);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await response.json();
      toggleTodo(id);
    } catch (error) {
      console.error('Error updating todo:', error);
      toggleTodo(id);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    if (searchQuery) {
      return todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleLogout = () => {
    // Here you can add any cleanup logic like clearing local storage, resetting states, etc.
    setTodos([]); // Clear todos
    navigate('/signin'); // Navigate to sign in page
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white flex"
    >
      {/* Floating Menu Button */}
      <AnimatePresence>
        {!isMenuOpen && showFloatingMenu && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(true)}
            className="fixed left-4 top-6 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu size={20} className="text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Left Menu Section */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isMenuOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed h-[calc(100vh-40px)] bg-[#f4f4f4] w-[300px] py-6 transition-all duration-300 z-40 top-5 left-5 rounded-[20px]`}
      >
        <div className="flex flex-col h-full px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-700 font-medium">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FiMenu size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#f4f4f4] border-none text-gray-600 text-sm focus:ring-0"
            />
          </div>

          {/* Tasks Section */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-gray-500 mb-4 px-2">TASKS</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <FiChevronsRight className="text-gray-400" />
                  <span className="font-medium">Upcoming</span>
                </div>
                <span className="text-sm text-gray-400">12</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 bg-white rounded-lg group">
                <div className="flex items-center gap-3">
                  <BsListTask className="text-gray-400" />
                  <span className="font-medium">Today</span>
                </div>
                <span className="text-sm text-gray-400">5</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-400" />
                  <span className="font-medium">Calendar</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <BsStickyFill className="text-gray-400" />
                  <span className="font-medium">Sticky Wall</span>
                </div>
              </button>
            </div>
          </div>

          {/* Lists Section */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-gray-500 mb-4 px-2">LISTS</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="font-medium">Personal</span>
                </div>
                <span className="text-sm text-gray-400">3</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="font-medium">Work</span>
                </div>
                <span className="text-sm text-gray-400">6</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="font-medium">List 1</span>
                </div>
                <span className="text-sm text-gray-400">3</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FiPlus className="text-gray-400" />
                  <span className="font-medium">Add New List</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-gray-500 mb-4 px-2">TAGS</h3>
            <div className="flex flex-wrap gap-2 px-2">
              <span className="px-3 py-1 bg-cyan-100 text-gray-700 rounded-full text-sm">Tag 1</span>
              <span className="px-3 py-1 bg-pink-100 text-gray-700 rounded-full text-sm">Tag 2</span>
              <button className="px-3 py-1 hover:bg-gray-200 text-gray-600 rounded-full text-sm flex items-center gap-1 transition-colors">
                <FiPlus size={14} />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors">
              <FiSettings className="text-gray-400" />
              <span className="font-medium">Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-white rounded-lg transition-colors"
            >
              <FiLogOut className="text-gray-400" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'ml-[300px]' : 'ml-0'}`}>
        <div className="max-w-4xl mx-auto p-8">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-8"
          >
            Organic Mind
          </motion.h1>

          {/* Add Todo Form */}
          <motion.form 
            onSubmit={handleAddTodo}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 p-4 rounded-lg border-2 border-gray-200 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] transition-all duration-150"
              />
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(255, 215, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-[#FFD700] text-gray-800 px-6 py-4 rounded-lg font-medium transition-all duration-150"
              >
                Add Task
              </motion.button>
            </div>
          </motion.form>

          {/* Todo List */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#FFD700] transition-all duration-150"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id, todo.completed)}
                    className="w-5 h-5 rounded border-gray-300 text-[#FFD700] focus:ring-[#FFD700]"
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.todo}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-150"
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage; 