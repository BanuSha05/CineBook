from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 3306)),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "event_ticket_booking")
        )
        return connection
    except Exception as e:
        print("Database connection error:", e)
        return None

class BookingCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    movie: str
    booking_date: str
    show_time: str
    members: int

@app.post("/bookings")
def create_booking(booking: BookingCreate):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    cursor = conn.cursor()
    booking_id = str(uuid.uuid4())[:8].upper()
    
    sql = """INSERT INTO bookings 
             (booking_id, customer_name, email, phone, movie, booking_date, show_time, members, status) 
             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    val = (
        booking_id, booking.customer_name, booking.email, booking.phone, 
        booking.movie, booking.booking_date, booking.show_time, booking.members, "CONFIRMED"
    )
    
    try:
        cursor.execute(sql, val)
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
    
    cursor.close()
    conn.close()
    
    return {
        "message": "Booking Successful",
        "booking_id": booking_id,
        "customer_name": booking.customer_name,
        "movie": booking.movie,
        "booking_date": booking.booking_date,
        "show_time": booking.show_time,
        "members": booking.members,
        "status": "CONFIRMED"
    }

@app.get("/bookings")
def get_bookings():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM bookings ORDER BY created_at DESC")
    bookings = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return bookings
