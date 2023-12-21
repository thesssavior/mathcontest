import { useState } from "react";
import { db } from "../firebase";
import { collection,query,orderBy } from "firebase/firestore";


export default function Leaderboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [leaderbord, setLeaderboard] = useState([]);
    const leaderboardRef = collection(db, "leaderboard")
    const q = query(leaderboardRef, orderBy('time', 'asc'))
    return null;
}

