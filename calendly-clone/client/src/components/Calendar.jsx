import React, { useState } from 'react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock appointments data
  const appointments = [
    { date: '2024-01-20', time: '10:00', title: 'Project Review' },
    { date: '2024-01-20', time: '14:00', title: 'Team Meeting' },
    { date: '2024-01-22', time: '11:00', title: 'Client Call' }
  ];

  // Helper functions for calendar
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-chevron-left text-gray-600"></i>
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-chevron-right text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Week days header */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div 
              key={day} 
              className="bg-gray-50 p-4 text-center text-sm font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {generateCalendarDays().map((day, index) => (
            <div 
              key={index}
              className={`bg-white min-h-[120px] p-4 ${
                day ? 'hover:bg-gray-50' : ''
              } transition-colors`}
            >
              {day && (
                <>
                  <span className={`text-sm font-semibold ${
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear()
                      ? 'bg-blue-600 text-white px-2 py-1 rounded-full'
                      : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  
                  {/* Appointments for the day */}
                  <div className="mt-2 space-y-1">
                    {appointments
                      .filter(apt => {
                        const aptDate = new Date(apt.date);
                        return (
                          aptDate.getDate() === day &&
                          aptDate.getMonth() === currentDate.getMonth() &&
                          aptDate.getFullYear() === currentDate.getFullYear()
                        );
                      })
                      .map((apt, idx) => (
                        <div 
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs p-1 rounded truncate"
                        >
                          {apt.time} - {apt.title}
                        </div>
                      ))
                    }
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Add Button */}
      <button 
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default Calendar;
