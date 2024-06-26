import { db } from "@/firebase.config"
import { NextResponse } from "next/server"
import { doc, getDoc } from "firebase/firestore"

// Get event by id
export async function GET(request, { params }) {
  const { id } = params
  try {
    const eventRef = doc(db, 'events', id)
    const eventSnap = await getDoc(eventRef)
    if (!eventSnap.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    const event = eventSnap.data()
    event.id = id;
    const response = { id, ...event }
    return NextResponse.json(response, { status: 200 })
  } catch (err) {
    return NextResponse.json({ err: 'Error fetching event' }, { status: 500 })
  }
}

