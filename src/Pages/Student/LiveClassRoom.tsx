import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * LiveClassRoom — Same-origin wrapper page for the meet link.
 * 
 * Opens at: /student/live-class?url=<meetLink>
 * 
 * Since this page is on localhost:5173 (same-origin),
 * the parent tab can reliably track `meetWindow.closed`.
 * 
 * The meet link is loaded in a full-screen iframe.
 * When the student closes THIS tab, the parent detects it → triggers /sessions/leave.
 */
const LiveClassRoom = () => {
    const [params] = useSearchParams();
    const meetUrl = params.get("url");

    useEffect(() => {
        // Set page title
        document.title = "Live Class — CoiRei LMS";
    }, []);

    if (!meetUrl) {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontFamily: "sans-serif",
                color: "#666",
            }}>
                <p>No meeting link provided.</p>
            </div>
        );
    }

    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
            <iframe
                src={meetUrl}
                title="Live Class"
                allow="camera; microphone; display-capture; autoplay; fullscreen"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
            />
        </div>
    );
};

export default LiveClassRoom;
