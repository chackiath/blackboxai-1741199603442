from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('appointments.db')
    c = conn.cursor()
    
    # Create users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create appointments table
    c.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            start_time TEXT NOT NULL,
            duration INTEGER NOT NULL,
            organizer_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organizer_id) REFERENCES users (id)
        )
    ''')
    
    # Create attendees table
    c.execute('''
        CREATE TABLE IF NOT EXISTS attendees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            appointment_id INTEGER NOT NULL,
            email TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (appointment_id) REFERENCES appointments (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Helper function to get database connection
def get_db():
    conn = sqlite3.connect('appointments.db')
    conn.row_factory = sqlite3.Row
    return conn

# User Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                 (data['name'], data['email'], data['password']))  # Note: In production, hash the password
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 409
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(key in data for key in ['email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = get_db()
    c = conn.cursor()
    user = c.execute('SELECT * FROM users WHERE email = ? AND password = ?',
                    (data['email'], data['password'])).fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'id': user['id'],
            'name': user['name'],
            'email': user['email']
        })
    return jsonify({'error': 'Invalid credentials'}), 401

# Appointment Routes
@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    required_fields = ['title', 'date', 'start_time', 'duration', 'organizer_id']
    
    if not all(key in data for key in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        conn = get_db()
        c = conn.cursor()
        
        # Insert appointment
        c.execute('''
            INSERT INTO appointments (title, description, date, start_time, duration, organizer_id)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['title'],
            data.get('description', ''),
            data['date'],
            data['start_time'],
            data['duration'],
            data['organizer_id']
        ))
        
        appointment_id = c.lastrowid
        
        # Add attendees if provided
        if 'attendees' in data and isinstance(data['attendees'], list):
            for email in data['attendees']:
                c.execute('INSERT INTO attendees (appointment_id, email) VALUES (?, ?)',
                         (appointment_id, email))
        
        conn.commit()
        return jsonify({'id': appointment_id, 'message': 'Appointment created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    conn = get_db()
    c = conn.cursor()
    
    # Get appointments where user is organizer
    appointments = c.execute('''
        SELECT a.*, GROUP_CONCAT(att.email) as attendees
        FROM appointments a
        LEFT JOIN attendees att ON a.id = att.appointment_id
        WHERE a.organizer_id = ?
        GROUP BY a.id
        ORDER BY date, start_time
    ''', (user_id,)).fetchall()
    
    result = [{
        'id': row['id'],
        'title': row['title'],
        'description': row['description'],
        'date': row['date'],
        'start_time': row['start_time'],
        'duration': row['duration'],
        'attendees': row['attendees'].split(',') if row['attendees'] else []
    } for row in appointments]
    
    conn.close()
    return jsonify(result)

@app.route('/api/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    try:
        conn = get_db()
        c = conn.cursor()
        
        # Delete attendees first (due to foreign key constraint)
        c.execute('DELETE FROM attendees WHERE appointment_id = ?', (id,))
        c.execute('DELETE FROM appointments WHERE id = ?', (id,))
        
        conn.commit()
        return jsonify({'message': 'Appointment deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
