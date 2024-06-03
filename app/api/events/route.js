import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";


// Get all events
export async function GET(req, res) {
    try {
        const querySnapShot = await getDocs(collection(db, 'events'))
        const events = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return new Response(JSON.stringify(events), { status: 200 })
    } catch (err) {
        return new Response(
            JSON.stringify({ err: "failed to get events "}),
            { status: 500 }
        )
    }
}