import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      title: "Project Review",
      with: "John Doe",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "30 min"
    },
    {
      id: 2,
      title: "Team Meeting",
      with: "Development Team",
      date: "2024-01-21",
      time: "2:00 PM",
      duration: "1 hour"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, User!</h1>
            <p className="text-gray-600">Here's what's happening with your schedule</p>
          </div>
          <Link
            to="/schedule"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Schedule Meeting
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-calendar-check text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Upcoming Meetings</p>
              <h3 className="text-2xl font-bold text-gray-800">5</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-clock text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Hours Scheduled</p>
              <h3 className="text-2xl font-bold text-gray-800">12.5</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <i className="fas fa-users text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Participants</p>
              <h3 className="text-2xl font-bold text-gray-800">18</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <i className="fas fa-calendar text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{appointment.title}</h3>
                  <p className="text-gray-600">with {appointment.with}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <i className="far fa-clock mr-2"></i>
                    {appointment.date} at {appointment.time} ({appointment.duration})
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/calendar"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            View All Appointments
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
