import { useState, useEffect } from "react";
import { ArrowLeft } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorHeader from "../../../Components/instructor/InstructorHeader";
import { reviewSubmission } from "../../../services/testService";
import type { ReviewSubmissionResponse, SubmissionAnswer } from "../../../services/testService";

/* ================= COMPONENT ================= */

const ReviewTestPage = () => {
  const navigate = useNavigate();
  const { testId, submissionId } = useParams<{ testId: string; submissionId: string }>();

  const [reviewData, setReviewData] = useState<ReviewSubmissionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      if (testId && submissionId) {
        try {
          setLoading(true);
          const data = await reviewSubmission(Number(testId), Number(submissionId));
          setReviewData(data);
        } catch (error) {
          console.error("Failed to fetch review data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReview();
  }, [testId, submissionId]);

  if (loading) {
    return (
        <>
            <InstructorHeader />
            <div className="flex items-center justify-center h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F67300]"></div>
            </div>
        </>
    );
  }

  if (!reviewData) {
    return (
        <div className="p-10 text-center">
            <h2 className="text-xl font-bold">Review data not found.</h2>
            <button onClick={() => navigate(-1)} className="text-[#F67300] mt-4">Go Back</button>
        </div>
    );
  }

  return (
    <div className="font-['Urbanist']">
      <InstructorHeader />

      <div className="bg-[#FAFAFA] min-h-screen px-4 sm:px-6 lg:px-10 py-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="cursor-pointer hover:opacity-70 transition-opacity">
            <ArrowLeft size={20}  color="black" />
          </button>

          <h2 className="text-lg sm:text-xl font-bold">Test Performance Review</h2>

          <span className="bg-green-100 text-green-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
            {reviewData.status}
          </span>
        </div>

        {/* ================= STUDENT DETAILS ================= */}
        <div className="p-3 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p className="font-bold text-gray-900 text-base">
                {reviewData.student_name}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-400">Submitted:</span> 
                {new Date(reviewData.submitted_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>

            <span className="inline-block mt-2 border border-[#E6E6E6] bg-white px-3 py-1 rounded-lg text-xs font-medium text-gray-500">
              Student ID: <span className="text-[#F67300] font-bold">{reviewData.student_id}</span>
            </span>
          </div>

          <div className="bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-2xl text-lg font-bold w-fit flex items-baseline gap-1">
            <span className="text-[#1A1A1A]">{reviewData.score}</span>
            <span className="text-gray-300 text-sm font-medium">Points</span>
          </div>
        </div>

        {/* ================= QUESTIONS ================= */}
        <div className="max-w-5xl mx-auto space-y-6">
            {reviewData.answers.map((ans: SubmissionAnswer, index: number) => (
            <div
                key={index}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100"
            >
                <div className="flex justify-between items-start mb-4 gap-3">
                    <p className="font-bold text-base sm:text-lg text-[#1A1A1A]">
                        {index + 1}. {ans.question_text}
                    </p>
                    <div className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg ${ans.is_correct ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {ans.is_correct ? 'Correct' : 'Incorrect'}
                    </div>
                </div>

                <div className="space-y-3">
                    {/* User's Selection */}
                    <div className={`flex items-center justify-between gap-3 p-4 rounded-xl border transition-all ${ans.is_correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">Student Answer</span>
                            <span className={`text-sm font-bold ${ans.is_correct ? 'text-emerald-700' : 'text-red-700'}`}>{ans.selected_option_text}</span>
                        </div>
                        <span className={`text-base font-bold ${ans.is_correct ? 'text-emerald-600' : 'text-red-600'}`}>
                            {ans.is_correct ? "✔" : "✖"}
                        </span>
                    </div>

                    {/* Correct Answer if student was wrong */}
                    {!ans.is_correct && (
                        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                            <span className="text-[10px] text-emerald-600 font-bold uppercase block mb-1">Correct Answer</span>
                            <span className="text-sm text-emerald-700 font-medium">
                                {ans.correct_option_text}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            ))}
        </div>

        {/* ================= DONE BUTTON ================= */}
        <div className="flex justify-end mt-10 max-w-5xl mx-auto pb-10">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-[#F67300] hover:bg-orange-600 text-white px-10 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-orange-100 cursor-pointer"
          >
            Finished Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTestPage;
