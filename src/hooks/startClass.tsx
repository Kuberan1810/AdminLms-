import api from "../config/axios";

interface StartClassParams {
    course_id: string;
    batchName: string;
}

export const startClass = async ({
    course_id,
    batchName,
}: StartClassParams) => {
    try {
        const res = await api.post(
            "/sessions/start",
            {},
            {
                params: {
                    course_id: course_id,
                    batch_name: batchName,
                },
            }
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};
