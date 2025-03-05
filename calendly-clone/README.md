# Modern Scheduling App (Calendly Clone)

A modern web application for scheduling appointments and managing meetings, built with React, Tailwind CSS, and Flask.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📅 Interactive calendar view
- ✨ Easy appointment scheduling
- 👥 User authentication
- 📱 Mobile-friendly design
- 🔄 Real-time updates

## Project Structure

```
calendly-clone/
├── client/              # Frontend React application
│   ├── public/         
│   └── src/            
│       ├── components/  # React components
│       └── services/    # API services
└── server/             # Backend Flask application
    ├── app.py          # Main Flask application
    └── requirements.txt # Python dependencies
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd calendly-clone/server
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```bash
   python app.py
   ```
   The server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd calendly-clone/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login user

### Appointments
- GET `/api/appointments` - Get user's appointments
- POST `/api/appointments` - Create new appointment
- DELETE `/api/appointments/<id>` - Delete appointment

## Technologies Used

### Frontend
- React
- Tailwind CSS
- React Router
- Font Awesome Icons
- Google Fonts

### Backend
- Flask
- SQLite
- Flask-CORS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
