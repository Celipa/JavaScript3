import { NextResponse } from 'next/server';
import { db } from '@/firebase.config';
import { arrayUnion, updateDoc, doc, getDoc } from 'firebase/firestore';


// Create a booking for an event, or remove a booking if the user is already booked.

export async function POST(request) {
    try {
        const { eventId, email, id } = await request.json();
        if (!eventId ||  !email || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        } 
        
        const userRef = doc(db, 'users', id);
        const user = await getDoc(userRef);
        if (!user.exists()) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const eventRef = doc(db, 'events', eventId);
        const eventSnap = await getDoc(eventRef);
        if (!eventSnap.exists()) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        const event = { id: eventSnap.id, ...eventSnap.data() };

        if(event.bookedUsers.some(user => user.id === id)) {
            event.bookedUsers = event.bookedUsers.filter(user => user.id !== id);
            await updateDoc(eventRef, {
                bookedUsers: event.bookedUsers
            });
            return NextResponse.json({ message: 'Booking removed' }, { status: 200 });
        }
        
        if(event.bookedUsers.length >= event.numberOfSpots) {
            return NextResponse.json({ error: 'Event is fully booked' }, { status: 400 });
        }

        const newBooking = { email, id, bookedAt: new Date().toISOString() };
        await updateDoc(eventRef, {
            bookedUsers: arrayUnion(newBooking)
        });
        return NextResponse.json({ ...newBooking }, { status: 201 });
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}