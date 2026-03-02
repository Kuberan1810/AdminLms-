import API_BASE from "../config/axios";

export const startLiveSession = async (
    courseid: string,
    batchName: string
) => {
    return API_BASE.post(
        "/sessions/start",
        null,
        {
            params: {
                course_id: courseid,
                batch_name: batchName,
            },
            headers: {
                'ngrok-skip-browser-warning': 'true',
            },
        }
    );
};
