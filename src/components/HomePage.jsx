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
  FiChevronsRight,
  FiX
} from 'react-icons/fi';
import { 
  BsListTask,
  BsCalendarEvent,
  BsStickyFill
} from 'react-icons/bs';
import StickyWall from './StickyWall';
import Calendar from './Calendar';

const HomePage = () => {
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('today');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddTaskTomorrow, setShowAddTaskTomorrow] = useState(false);
  const [showAddTaskWeek, setShowAddTaskWeek] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    todo: '',
    description: '',
    dueDate: '',
    list: 'Personal',
    tags: [],
    subtasks: [],
    section: 'today'
  });
  const [tomorrowTaskData, setTomorrowTaskData] = useState({
    todo: '',
    description: '',
    dueDate: '',
    list: 'Personal',
    tags: [],
    subtasks: [],
    section: 'tomorrow'
  });
  const [weekTaskData, setWeekTaskData] = useState({
    todo: '',
    description: '',
    dueDate: '',
    list: 'Personal',
    tags: [],
    subtasks: [],
    section: 'week'
  });
  const [stickyNotes, setStickyNotes] = useState([
    {
      id: 1,
      title: 'Social Media',
      content: '- Plan social content\n- Build content calendar\n- Plan promotion and distribution',
      color: 'bg-yellow-100',
    },
    {
      id: 2,
      title: 'Content Strategy',
      content: 'Would need time to get insights (goals, personals, budget, audits), but after, it would be good to focus on assembling my team (start with SEO specialist, then perhaps an email marketer?). Also need to brainstorm on tooling.',
      color: 'bg-blue-100',
    },
    {
      id: 3,
      title: 'Email A/B Tests',
      content: '- Subject lines\n- Sender\n- CTA\n- Sending times',
      color: 'bg-pink-100',
    },
    {
      id: 4,
      title: 'Banner Ads',
      content: 'Notes from the workshop:\n- Sizing matters\n- Choose distinctive imagery\n- The landing page must match the display ad',
      color: 'bg-orange-100',
    }
  ]);
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, setTodos } = useStore();
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState('Personal');

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

  // Add this effect to handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to handle new task submission
  const handleNewTaskSubmit = (e, section) => {
    e.preventDefault();
    let taskData;
    let resetFunction;

    switch (section) {
      case 'tomorrow':
        taskData = tomorrowTaskData;
        resetFunction = () => {
          setTomorrowTaskData({
            todo: '',
            description: '',
            dueDate: '',
            list: 'Personal',
            tags: [],
            subtasks: [],
            section: 'tomorrow'
          });
          setShowAddTaskTomorrow(false);
        };
        break;
      case 'week':
        taskData = weekTaskData;
        resetFunction = () => {
          setWeekTaskData({
            todo: '',
            description: '',
            dueDate: '',
            list: 'Personal',
            tags: [],
            subtasks: [],
            section: 'week'
          });
          setShowAddTaskWeek(false);
        };
        break;
      default:
        taskData = newTaskData;
        resetFunction = () => {
          setNewTaskData({
            todo: '',
            description: '',
            dueDate: '',
            list: 'Personal',
            tags: [],
            subtasks: [],
            section: 'today'
          });
          setShowAddTask(false);
        };
    }

    if (!taskData.todo.trim()) return;

    const task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      userId: 1,
    };

    addTodo(task);
    resetFunction();
  };

  // Function to handle task update
  const handleTaskUpdate = (taskId, updatedData) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === taskId) {
        return { ...todo, ...updatedData };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to add subtask
  const handleAddSubtask = (taskId, subtask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === taskId) {
        const currentSubtasks = todo.subtasks || [];
        return {
          ...todo,
          subtasks: [...currentSubtasks, { id: Date.now(), text: subtask, completed: false }]
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to handle todo toggle
  const handleToggleTodo = (taskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to handle todo deletion
  const handleDeleteTodo = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId);
    setTodos(updatedTodos);
    setShowEditPanel(false);
    setSelectedTask(null);
  };

  // Update selectedTask when a task is modified
  useEffect(() => {
    if (selectedTask) {
      const updatedSelectedTask = todos.find(todo => todo.id === selectedTask.id);
      if (updatedSelectedTask) {
        setSelectedTask(updatedSelectedTask);
      }
    }
  }, [todos, selectedTask?.id]);

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

  const filteredTodos = todos.filter((todo) => {
    // First apply search filter if exists
    if (searchQuery) {
      return todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Then apply list filter if not in Today section
    if (activeSection !== 'today' && todo.list !== activeList) {
      return false;
    }
    
    // Then apply section filters
    if (activeSection === 'upcoming') {
      return !todo.completed;
    }
    
    // Filter based on completed/pending toggle
    return showCompleted ? todo.completed : !todo.completed;
  });

  const incompleteTodosCount = todos.filter(todo => !todo.completed).length;

  const handleLogout = () => {
    // Here you can add any cleanup logic like clearing local storage, resetting states, etc.
    setTodos([]); // Clear todos
    navigate('/signin'); // Navigate to sign in page
  };

  // Filter todos based on section
  const getTodosBySection = (section) => {
    return todos.filter(todo => todo.section === section);
  };

  // Add function to count todos by list
  const getTodoCountByList = (list) => {
    return todos.filter(todo => todo.list === list && !todo.completed).length;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-gray-900 flex"
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
        initial={{ x: -400 }}
        animate={{ x: isMenuOpen ? 0 : -400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed h-[calc(100vh-40px)] bg-[#f4f4f4] dark:bg-gray-800 w-[400px] py-6 transition-all duration-300 z-40 top-5 left-5 rounded-[20px] flex flex-col`}
      >
        <div className="flex flex-col h-full px-6">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-700 dark:text-white font-medium">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiMenu size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
            {/* Search */}
            <div className="relative mb-8">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#f4f4f4] dark:bg-gray-900 border-none text-gray-600 dark:text-gray-200 text-sm focus:ring-0 focus:border-gray-400 dark:focus:border-gray-600"
              />
            </div>

            {/* Tasks Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2">TASKS</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveSection('upcoming')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeSection === 'upcoming' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg group transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <FiChevronsRight className="text-gray-400 dark:text-gray-500" />
                    <span className="font-medium">Upcoming</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{incompleteTodosCount}</span>
                </button>
                <button 
                  onClick={() => setActiveSection('today')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeSection === 'today' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg group`}
                >
                  <div className="flex items-center gap-3">
                    <BsListTask className="text-gray-400 dark:text-gray-500" />
                    <span className="font-medium">Today</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{filteredTodos.length}</span>
                </button>
                <button 
                  onClick={() => setActiveSection('calendar')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeSection === 'calendar' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg group transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <BsCalendarEvent className="text-gray-400 dark:text-gray-500" />
                    <span className="font-medium">Calendar</span>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveSection('sticky-wall')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeSection === 'sticky-wall' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg group transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <BsStickyFill className="text-gray-400 dark:text-gray-500" />
                    <span className="font-medium">Sticky Wall</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{stickyNotes.length}</span>
                </button>
              </div>
            </div>

            {/* Lists Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2">LISTS</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveList('Personal')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeList === 'Personal' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="font-medium">Personal</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{getTodoCountByList('Personal')}</span>
                </button>
                <button 
                  onClick={() => setActiveList('Work')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeList === 'Work' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                    <span className="font-medium">Work</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{getTodoCountByList('Work')}</span>
                </button>
                <button 
                  onClick={() => setActiveList('List 1')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 ${
                    activeList === 'List 1' 
                      ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' 
                      : 'hover:bg-white dark:hover:bg-gray-700'
                  } rounded-lg transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="font-medium">List 1</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{getTodoCountByList('List 1')}</span>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <FiPlus className="text-gray-400 dark:text-gray-500" />
                    <span className="font-medium">Add New List</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Tags Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-4 px-2">TAGS</h3>
              <div className="flex flex-wrap gap-2 px-2">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-gray-700 dark:text-gray-200 rounded-full text-sm">Tag 1</span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-gray-700 dark:text-gray-200 rounded-full text-sm">Tag 2</span>
                <button className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm flex items-center gap-1 transition-colors">
                  <FiPlus size={14} />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions - Fixed */}
          <div className="mt-auto space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
              <FiSettings className="text-gray-400 dark:text-gray-500" />
              <span className="font-medium">Settings</span>
            </button>
            
            {/* Dark Mode Toggle */}
            <div className="w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400 dark:text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span className="font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiLogOut className="text-gray-400 dark:text-gray-500" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'ml-[400px]' : 'ml-0'} ${showEditPanel ? 'mr-[400px]' : 'mr-0'}`}>
        {activeSection === 'sticky-wall' ? (
          <StickyWall initialNotes={stickyNotes} onNotesChange={setStickyNotes} />
        ) : activeSection === 'calendar' ? (
          <Calendar />
        ) : (
          <div className="max-w-4xl mx-auto pl-4 pr-8 py-8 bg-white dark:bg-gray-900 min-h-screen">
            <style jsx global>{`
              /* Custom Scrollbar Styles */
              ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              
              ::-webkit-scrollbar-track {
                background: #f4f4f4;
                border-radius: 4px;
              }
              
              ::-webkit-scrollbar-thumb {
                background: #ffd43b;
                border-radius: 4px;
                transition: all 0.3s ease;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                background: #fcc419;
              }
              
              .dark ::-webkit-scrollbar-track {
                background: #1f2937;
              }
              
              .dark ::-webkit-scrollbar-thumb {
                background: #ffd43b;
              }
              
              .dark ::-webkit-scrollbar-thumb:hover {
                background: #fcc419;
              }
            `}</style>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white">
                  {activeSection === 'upcoming' ? 'Upcoming' : 'Today'}
                  {activeList !== 'Personal' && (
                    <span className="text-3xl font-bold text-gray-400 dark:text-gray-300 ml-4">
                      • {activeList}
                    </span>
                  )}
                </h1>
                <span className="text-6xl font-bold text-gray-400 dark:text-gray-300">
                  {filteredTodos.length}
                </span>
              </div>
            </div>

            {activeSection === 'today' ? (
              <>
                {/* Add New Task Button and Form */}
                <div className="mb-6">
                  {!showAddTask ? (
                    <button 
                      className="flex items-center gap-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white group transition-colors duration-150"
                      onClick={() => setShowAddTask(true)}
                    >
                      <span className="text-2xl font-bold">+</span>
                      <span className="text-base font-medium">Add New Task</span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#f4f4f4] dark:bg-gray-700 rounded-lg p-4"
                    >
                      <form onSubmit={(e) => handleNewTaskSubmit(e, 'today')} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={newTaskData.todo}
                            onChange={(e) => setNewTaskData({...newTaskData, todo: e.target.value})}
                            placeholder="Task name"
                            className="w-full py-2 px-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                            autoFocus
                          />
                        </div>
                        
                        <div>
                          <textarea
                            value={newTaskData.description}
                            onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
                            placeholder="Description"
                            className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none resize-none h-20"
                          />
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <select
                              value={newTaskData.list}
                              onChange={(e) => setNewTaskData({...newTaskData, list: e.target.value})}
                              className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                            >
                              <option value="Personal">Personal</option>
                              <option value="Work">Work</option>
                              <option value="List 1">List 1</option>
                            </select>
                          </div>
                          
                          <div className="flex-1">
                            <input
                              type="date"
                              value={newTaskData.dueDate}
                              onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
                              className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {newTaskData.tags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm flex items-center">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => setNewTaskData({
                                    ...newTaskData,
                                    tags: newTaskData.tags.filter((_, i) => i !== index)
                                  })}
                                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Add tag"
                              className="flex-1 py-1 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-full focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none text-sm"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (e.target.value.trim()) {
                                    setNewTaskData({
                                      ...newTaskData,
                                      tags: [...newTaskData.tags, e.target.value.trim()]
                                    });
                                    e.target.value = '';
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddTask(false);
                              setNewTaskData({
                                todo: '',
                                description: '',
                                dueDate: '',
                                list: 'Personal',
                                tags: [],
                                subtasks: [],
                                section: 'today'
                              });
                            }}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                          >
                            Add Task
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>

                {/* Toggle Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setShowCompleted(false)}
                    className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                      !showCompleted 
                        ? 'bg-gray-800 dark:bg-gray-700 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium">Pending ({todos.filter(todo => !todo.completed).length})</span>
                  </button>
                  <button
                    onClick={() => setShowCompleted(true)}
                    className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                      showCompleted 
                        ? 'bg-gray-800 dark:bg-gray-700 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium">Completed ({todos.filter(todo => todo.completed).length})</span>
                  </button>
                </div>

                {/* Todo List with enhanced task items */}
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
                      className="group border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            className="w-5 h-5 rounded border-gray-300 text-gray-400 focus:ring-gray-400"
                          />
                          <div className="flex flex-col">
                            <span className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'} font-semibold`}>
                              {todo.todo}
                            </span>
                            {todo.description && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {todo.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {todo.dueDate && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {todo.tags && todo.tags.length > 0 && (
                            <div className="flex gap-2">
                              {todo.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setSelectedTask(todo);
                              setShowEditPanel(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-150"
                          >
                            <FiChevronsRight size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              // Upcoming Section with Today's Tasks, Tomorrow and This Week
              <div className="space-y-8">
                {/* Today's First 5 Tasks */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Today's Tasks</h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4">
                      {!showAddTask ? (
                        <button 
                          className="flex items-center gap-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white group transition-colors duration-150"
                          onClick={() => setShowAddTask(true)}
                        >
                          <span className="text-2xl font-bold">+</span>
                          <span className="text-base font-medium">Add New Task</span>
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-[#f4f4f4] dark:bg-gray-700 rounded-lg p-4"
                        >
                          <form onSubmit={(e) => handleNewTaskSubmit(e, 'today')} className="space-y-4">
                            <div>
                              <input
                                type="text"
                                value={newTaskData.todo}
                                onChange={(e) => setNewTaskData({...newTaskData, todo: e.target.value})}
                                placeholder="Task name"
                                className="w-full py-2 px-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                                autoFocus
                              />
                            </div>
                            
                            <div>
                              <textarea
                                value={newTaskData.description}
                                onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
                                placeholder="Description"
                                className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none resize-none h-20"
                              />
                            </div>

                            <div className="flex gap-4">
                              <div className="flex-1">
                                <select
                                  value={newTaskData.list}
                                  onChange={(e) => setNewTaskData({...newTaskData, list: e.target.value})}
                                  className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                                >
                                  <option value="Personal">Personal</option>
                                  <option value="Work">Work</option>
                                  <option value="List 1">List 1</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowAddTask(false);
                                  setNewTaskData({
                                    todo: '',
                                    description: '',
                                    dueDate: '',
                                    list: 'Personal',
                                    tags: [],
                                    subtasks: [],
                                    section: 'today'
                                  });
                                }}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                              >
                                Add Task
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                      {todos.map((todo) => (
                        <motion.div
                          key={todo.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="group border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-4 flex-1">
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                                className="w-5 h-5 rounded border-gray-300 text-[#ffd43b] focus:ring-[#ffd43b]"
                              />
                              <div className="flex flex-col">
                                <span className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'} font-semibold`}>
                                  {todo.todo}
                                </span>
                                {todo.description && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {todo.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {todo.dueDate && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                              )}
                              {todo.tags && todo.tags.length > 0 && (
                                <div className="flex gap-2">
                                  {todo.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedTask(todo);
                                  setShowEditPanel(true);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-150"
                              >
                                <FiChevronsRight size={20} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Tomorrow Section */}
                  <div className="pr-4">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Tomorrow</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto p-4">
                        {!showAddTaskTomorrow ? (
                          <button 
                            className="flex items-center gap-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white group transition-colors duration-150"
                            onClick={() => setShowAddTaskTomorrow(true)}
                          >
                            <span className="text-2xl font-bold">+</span>
                            <span className="text-base font-medium">Add New Task</span>
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#f4f4f4] dark:bg-gray-700 rounded-lg p-4"
                          >
                            <form onSubmit={(e) => handleNewTaskSubmit(e, 'tomorrow')} className="space-y-4">
                              <div>
                                <input
                                  type="text"
                                  value={tomorrowTaskData.todo}
                                  onChange={(e) => setTomorrowTaskData({...tomorrowTaskData, todo: e.target.value})}
                                  placeholder="Task name"
                                  className="w-full py-2 px-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                                  autoFocus
                                />
                              </div>
                              
                              <div>
                                <textarea
                                  value={tomorrowTaskData.description}
                                  onChange={(e) => setTomorrowTaskData({...tomorrowTaskData, description: e.target.value})}
                                  placeholder="Description"
                                  className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none resize-none h-20"
                                />
                              </div>

                              <div className="flex justify-end gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddTaskTomorrow(false);
                                    setTomorrowTaskData({
                                      todo: '',
                                      description: '',
                                      dueDate: '',
                                      list: 'Personal',
                                      tags: [],
                                      subtasks: [],
                                      section: 'tomorrow'
                                    });
                                  }}
                                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                                >
                                  Add Task
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                        {/* Display Tomorrow's Tasks */}
                        {getTodosBySection('tomorrow').map((todo) => (
                          <motion.div
                            key={todo.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="group border-b border-gray-100 dark:border-gray-700 last:border-b-0 mt-4"
                          >
                            <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-4 flex-1">
                                <input
                                  type="checkbox"
                                  checked={todo.completed}
                                  onChange={() => handleToggleTodo(todo.id)}
                                  className="w-5 h-5 rounded border-gray-300 text-[#ffd43b] focus:ring-[#ffd43b]"
                                />
                                <div className="flex flex-col">
                                  <span className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'} font-semibold`}>
                                    {todo.todo}
                                  </span>
                                  {todo.description && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {todo.description}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                {todo.dueDate && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                {todo.tags && todo.tags.length > 0 && (
                                  <div className="flex gap-2">
                                    {todo.tags.map((tag, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedTask(todo);
                                    setShowEditPanel(true);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-150"
                                >
                                  <FiChevronsRight size={20} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* This Week Section */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">This Week</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto p-4">
                        {!showAddTaskWeek ? (
                          <button 
                            className="flex items-center gap-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white group transition-colors duration-150"
                            onClick={() => setShowAddTaskWeek(true)}
                          >
                            <span className="text-2xl font-bold">+</span>
                            <span className="text-base font-medium">Add New Task</span>
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#f4f4f4] dark:bg-gray-700 rounded-lg p-4"
                          >
                            <form onSubmit={(e) => handleNewTaskSubmit(e, 'week')} className="space-y-4">
                              <div>
                                <input
                                  type="text"
                                  value={weekTaskData.todo}
                                  onChange={(e) => setWeekTaskData({...weekTaskData, todo: e.target.value})}
                                  placeholder="Task name"
                                  className="w-full py-2 px-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                                  autoFocus
                                />
                              </div>
                              
                              <div>
                                <textarea
                                  value={weekTaskData.description}
                                  onChange={(e) => setWeekTaskData({...weekTaskData, description: e.target.value})}
                                  placeholder="Description"
                                  className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none resize-none h-20"
                                />
                              </div>

                              <div className="flex justify-end gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddTaskWeek(false);
                                    setWeekTaskData({
                                      todo: '',
                                      description: '',
                                      dueDate: '',
                                      list: 'Personal',
                                      tags: [],
                                      subtasks: [],
                                      section: 'week'
                                    });
                                  }}
                                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                                >
                                  Add Task
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                        {/* Display This Week's Tasks */}
                        {getTodosBySection('week').map((todo) => (
                          <motion.div
                            key={todo.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="group border-b border-gray-100 dark:border-gray-700 last:border-b-0 mt-4"
                          >
                            <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-4 flex-1">
                                <input
                                  type="checkbox"
                                  checked={todo.completed}
                                  onChange={() => handleToggleTodo(todo.id)}
                                  className="w-5 h-5 rounded border-gray-300 text-[#ffd43b] focus:ring-[#ffd43b]"
                                />
                                <div className="flex flex-col">
                                  <span className={`${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'} font-semibold`}>
                                    {todo.todo}
                                  </span>
                                  {todo.description && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {todo.description}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                {todo.dueDate && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                {todo.tags && todo.tags.length > 0 && (
                                  <div className="flex gap-2">
                                    {todo.tags.map((tag, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <button
                                  onClick={() => {
                                    setSelectedTask(todo);
                                    setShowEditPanel(true);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-150"
                                >
                                  <FiChevronsRight size={20} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Edit Panel */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: showEditPanel ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed right-5 top-5 h-[calc(100vh-40px)] bg-[#f4f4f4] dark:bg-gray-800 w-[400px] rounded-[20px] shadow-lg overflow-hidden ${showEditPanel ? 'block' : 'hidden'}`}
      >
        {selectedTask && (
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-800 dark:text-white">Edit Task</h2>
              <button
                onClick={() => {
                  setShowEditPanel(false);
                  setSelectedTask(null);
                }}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={selectedTask.todo || ''}
                    onChange={(e) => handleTaskUpdate(selectedTask.id, { todo: e.target.value })}
                    className="w-full py-2 px-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none text-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">List</label>
                  <select
                    value={selectedTask.list || 'Personal'}
                    onChange={(e) => handleTaskUpdate(selectedTask.id, { list: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Personal" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">Personal</option>
                    <option value="Work" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">Work</option>
                    <option value="List 1" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">List 1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</label>
                  <textarea
                    value={selectedTask.description || ''}
                    onChange={(e) => handleTaskUpdate(selectedTask.id, { description: e.target.value })}
                    className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none resize-none h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={selectedTask.dueDate || ''}
                    onChange={(e) => handleTaskUpdate(selectedTask.id, { dueDate: e.target.value })}
                    className="w-full py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-lg focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {(selectedTask.tags || []).map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm flex items-center">
                          {tag}
                          <button
                            onClick={() => {
                              const updatedTags = [...(selectedTask.tags || [])];
                              updatedTags.splice(index, 1);
                              handleTaskUpdate(selectedTask.id, {
                                tags: updatedTags
                              });
                            }}
                            className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add tag"
                        className="flex-1 py-1 px-3 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-full focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                              handleTaskUpdate(selectedTask.id, {
                                tags: [...(selectedTask.tags || []), e.target.value.trim()]
                              });
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Subtasks</label>
                  <div className="space-y-2">
                    {(selectedTask.subtasks || []).map((subtask, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => {
                            const updatedSubtasks = [...(selectedTask.subtasks || [])];
                            updatedSubtasks[index].completed = !subtask.completed;
                            handleTaskUpdate(selectedTask.id, { subtasks: updatedSubtasks });
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#ffd43b] focus:ring-[#ffd43b]"
                        />
                        <input
                          type="text"
                          value={subtask.text}
                          onChange={(e) => {
                            const updatedSubtasks = [...(selectedTask.subtasks || [])];
                            updatedSubtasks[index].text = e.target.value;
                            handleTaskUpdate(selectedTask.id, { subtasks: updatedSubtasks });
                          }}
                          className="flex-1 py-1 px-2 border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none text-sm"
                        />
                        <button
                          onClick={() => {
                            const updatedSubtasks = [...(selectedTask.subtasks || [])];
                            updatedSubtasks.splice(index, 1);
                            handleTaskUpdate(selectedTask.id, { subtasks: updatedSubtasks });
                          }}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add subtask"
                        className="flex-1 py-1 px-2 border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:border-[#ffd43b] dark:focus:border-[#ffd43b] outline-none text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                              handleAddSubtask(selectedTask.id, e.target.value.trim());
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => handleDeleteTodo(selectedTask.id)}
                className="px-4 py-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete Task
              </button>
              <button
                onClick={() => {
                  setShowEditPanel(false);
                  setSelectedTask(null);
                }}
                className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage; 