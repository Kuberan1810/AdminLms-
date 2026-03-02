// // import { useEffect, useRef, useState } from "react";
// // import api from "../config/axios";

// // export const useLiveClass = () => {
// //     const [liveClassId, setLiveClassId] = useState<number | null>(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //     const popupShown = useRef(false);

// //     useEffect(() => {
// //         const interval = setInterval(async () => {
// //             try {
// //                 const res = await api.get("/sessions/live");

// //                 console.log("LIVE API:", res.data); // 👈 MUST LOG

// //                 const id = res.data?.classroom_id ?? null;

// //                 if (id && !popupShown.current) {
// //                     setShowPopup(true);
// //                     popupShown.current = true;
// //                 }

// //                 setLiveClassId(id);
// //             } catch (err) {
// //                 console.error("Live polling failed", err);
// //             }
// //         }, 5000);

// //         return () => clearInterval(interval);
// //     }, []);

// //     return {
// //         liveClassId,
// //         showPopup,
// //         closePopup: () => setShowPopup(false),
// //     };
// // };

// import { useRef, useState } from "react";
// import api from "../config/axios";

// export const useLiveClass = () => {
//     const [liveClassId, setLiveClassId] = useState<number | null>(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const popupShown = useRef(false);
//     const [loading, setLoading] = useState(false);

//     // 👇 manual trigger
//     const checkLiveClass = async () => {
//         if (loading) return; // prevent double click

//         try {
//             setLoading(true);

//             const res = await api.get("/sessions/live");
//             console.log("LIVE API:", res.data);

//             const id = res.data?.classroom_id ?? null;

//             if (id && !popupShown.current) {
//                 setShowPopup(true);
//                 popupShown.current = true;
//             }

//             setLiveClassId(id);
//         } catch (err) {
//             console.error("Live class check failed", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         liveClassId,
//         showPopup,
//         loading,
//         checkLiveClass, // 👈 expose function
//         closePopup: () => setShowPopup(false),
//     };
// };


// import { useEffect, useState } from "react";
// import axios from "axios";

// export const useLiveClass = () => {
//     const [isLive, setIsLive] = useState(false);
//     const [joinUrl, setJoinUrl] = useState("");

//     useEffect(() => {
//         const checkLiveClass = async () => {
//             try {
//                 const res = await axios.get(
//                     "https://maya-phonogramic-dayton.ngrok-free.dev/sessions/current"
//                 );

//                 if (res.data.status === "live") {
//                     setIsLive(true);
//                     setJoinUrl(res.data.join_url);
//                 }
//             } catch (err) {
//                 console.log("No live class");
//             }
//         };

//         // poll every 5 seconds
//         const interval = setInterval(checkLiveClass, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     const joinClass = () => {
//         window.open(joinUrl, "_blank");
//     };

//     return { isLive, joinClass };
// };

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config/api";

// export const useLiveClass = () => {
//     const [liveClassId, setLiveClassId] = useState<number | null>(null);
//     const [showPopup, setShowPopup] = useState(false);

//     // 🔒 popup only once
//     const popupShownRef = useRef(false);

//     useEffect(() => {
//         const checkLiveClass = async () => {
//             try {
//                 const res = await axios.get(`${BASE_URL}/sessions/current`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 /**
//                  * expected response:
//                  * {
//                  *   session_id: 16,
//                  *   status: "live"
//                  * }
//                  */

//                 if (res.data?.status === "live") {
//                     const sessionId = res.data.session_id;

//                     // 🔥 set live class (THIS enables Join button)
//                     setLiveClassId(sessionId);

//                     // 🔥 show popup only once
//                     if (!popupShownRef.current) {
//                         setShowPopup(true);
//                         popupShownRef.current = true;
//                     }
//                 }
//             } catch (err) {
//                 // no live class → do nothing
//             }
//         };

//         checkLiveClass(); // initial check
//         const interval = setInterval(checkLiveClass, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     const closePopup = () => {
//         setShowPopup(false);
//         // ❗ DO NOT reset liveClassId here
//         // Join button must stay active
//     };

//     const joinClass = () => {
//         if (!liveClassId) return;

//         window.open(
//             `${BASE_URL}/sessions/join?session_id=${liveClassId}`,
//             "_blank"
//         );
//     };

//     return {
//         liveClassId,
//         showPopup,
//         closePopup,
//         joinClass,
//     };
// };


import { useEffect, useState } from "react";
import API_BASE from "../config/axios";

interface useLiveClass {
    session_id: number;
    join_url: string;
    status: "live" | "scheduled" | "completed";
}

export const useLiveClass = () => {
    const [liveClassId, setLiveClassId] = useState<number | null>(null);
    const [joinUrl, setJoinUrl] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const fetchLiveSession = async () => {
        try {
            const res = await API_BASE.get("/sessions/active", {
                headers: { 'ngrok-skip-browser-warning': 'true' },
            });
            // backend should return current live session if exists

            if (res.data && res.data.status === "live") {
                setLiveClassId(res.data.session_id);
                setJoinUrl(res.data.join_url);
                setShowPopup(true);
            } else {
                setLiveClassId(null);
                setJoinUrl(null);
            }
        } catch (error) {
            console.error("Live session check failed", error);
        }
    };

    useEffect(() => {
        fetchLiveSession(); // initial check

        const interval = setInterval(() => {
            fetchLiveSession();
        }, 8000); // 8 seconds polling

        return () => clearInterval(interval);
    }, []);

    const joinClass = () => {
        if (joinUrl) {
            window.open(joinUrl, "_blank");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return {
        liveClassId,
        joinClass,
        showPopup,
        closePopup,
    };
};
