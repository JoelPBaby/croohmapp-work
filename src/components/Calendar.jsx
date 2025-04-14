import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlus, FiX } from 'react-icons/fi';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('day');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    color: 'bg-blue-100'
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Marketing Sprint',
      start: new Date(2024, 1, 16, 9, 0),
      end: new Date(2024, 1, 16, 10, 0),
      color: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Sales Catchup',
      start: new Date(2024, 1, 16, 10, 0),
      end: new Date(2024, 1, 16, 11, 0),
      color: 'bg-blue-100'
    },
    {
      id: 3,
      title: 'Renew driver\'s license',
      start: new Date(2024, 1, 16, 11, 0),
      end: new Date(2024, 1, 16, 12, 0),
      color: 'bg-pink-100'
    }
  ]);

  const colors = [
    'bg-blue-100',
    'bg-pink-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-orange-100'
  ];

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !newEvent.start || !newEvent.end) return;

    const event = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      color: newEvent.color
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      start: '',
      end: '',
      color: 'bg-blue-100'
    });
    setShowAddEvent(false);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (date) => {
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 1);
    
    setSelectedTimeSlot(date);
    setNewEvent({
      ...newEvent,
      start: date.toISOString().slice(0, 16),
      end: endDate.toISOString().slice(0, 16)
    });
    setShowAddEvent(true);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${ampm}`;
  });

  const getHeaderText = () => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    switch (view) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', options);
      case 'week': {
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.getDate()}–${end.toLocaleDateString('en-US', options)}`;
      }
      case 'month':
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      default:
        return '';
    }
  };

  const getDayEvents = (date) => {
    return events.filter(event => 
      event.start.getDate() === date.getDate() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getFullYear() === date.getFullYear()
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  const getWeekDays = () => {
    const days = [];
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getMonthDays = () => {
    const days = [];
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Add days from previous month to start on Sunday
    const firstDay = start.getDay();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = new Date(start);
      day.setDate(start.getDate() - i - 1);
      days.push(day);
    }
    
    // Add days of current month
    for (let i = 1; i <= end.getDate(); i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(day);
    }
    
    // Add days from next month to complete the grid
    const lastDay = end.getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      const day = new Date(end);
      day.setDate(end.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Custom Scrollbar Styles */}
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

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {getHeaderText()}
            </h1>
          </div>
          <button
            onClick={() => {
              setSelectedTimeSlot(new Date());
              setShowAddEvent(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
          >
            <FiPlus size={20} />
            <span className="font-bold">Add Event</span>
          </button>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Event</h2>
                <button
                  onClick={() => {
                    setShowAddEvent(false);
                    setSelectedTimeSlot(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event Title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event Description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.start}
                      onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.end}
                      onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ffd43b] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Color
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewEvent({ ...newEvent, color })}
                        className={`w-8 h-8 rounded-full ${color} ${
                          newEvent.color === color ? 'ring-2 ring-[#ffd43b]' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ffd43b] text-gray-900 rounded-lg hover:bg-[#fcc419] transition-colors duration-150"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['Day', 'Week', 'Month'].map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption.toLowerCase())}
                className={`relative px-6 py-2 text-sm font-bold rounded-md transition-all duration-200 ${
                  view === viewOption.toLowerCase()
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {view === viewOption.toLowerCase() && (
                  <motion.div
                    layoutId="viewIndicator"
                    className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md shadow-sm"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{viewOption}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            {view === 'day' && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
                {timeSlots.map((time, index) => {
                  const currentTime = new Date(currentDate);
                  currentTime.setHours(index);
                  currentTime.setMinutes(0);
                  const dayEvents = getDayEvents(currentTime);

                  return (
                    <div 
                      key={time} 
                      className="flex items-start hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                      onClick={() => handleTimeSlotClick(currentTime)}
                    >
                      <div className="w-20 py-4 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {time}
                      </div>
                      <div className="flex-1 py-4 px-4 min-h-[60px]">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`${event.color} dark:bg-opacity-70 p-3 rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow`}
                          >
                            <h3 className="font-bold text-gray-800 dark:text-gray-900 mb-1">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-700 mb-2">
                                {event.description}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 dark:text-gray-700 font-medium">
                              {formatTime(event.start)} - {formatTime(event.end)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {view === 'week' && (
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                {getWeekDays().map((day, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800">
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {day.getDate()}
                      </div>
                    </div>
                    <div className="max-h-[calc(100vh-280px)] overflow-y-auto p-2">
                      {getDayEvents(day).map(event => (
                        <div
                          key={event.id}
                          className={`${event.color} dark:bg-opacity-70 p-2 rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow`}
                        >
                          <h3 className="font-bold text-gray-800 dark:text-gray-900 text-sm">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-700 font-medium">
                            {formatTime(event.start)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === 'month' && (
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                <div className="col-span-7 grid grid-cols-7 gap-px">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-white dark:bg-gray-800 p-2 text-center sticky top-0 z-10">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="col-span-7 grid grid-cols-7 gap-px max-h-[calc(100vh-280px)] overflow-y-auto">
                  {getMonthDays().map((day, index) => (
                    <div 
                      key={index}
                      className={`bg-white dark:bg-gray-800 min-h-[120px] p-2 ${
                        day.getMonth() === currentDate.getMonth()
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="text-right mb-2">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                          {day.getDate()}
                        </span>
                      </div>
                      <div className="space-y-1 overflow-y-auto">
                        {getDayEvents(day).map(event => (
                          <div
                            key={event.id}
                            className={`${event.color} dark:bg-opacity-70 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                          >
                            <span className="font-bold text-gray-800 dark:text-gray-900 text-xs block truncate">
                              {event.title}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-700">
                              {formatTime(event.start)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Calendar; 