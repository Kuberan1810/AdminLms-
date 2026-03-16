import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { resetTest, fullResetTest, tickTimer } from "../../../../../store/slices/TestPageSlice";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Clock } from "lucide-react";

const TestSummaryModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Dynamically pull stats from Redux store
  const stats = useAppSelector((state) => state.counter.stats);
  const timer = useAppSelector((state) => state.counter.timer);

  // Ref for timer auto-submit to prevent closure staleness
  const timerRef = useRef(timer);
  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  // Tick timer even while summary modal is open
  useEffect(() => {
    // Only run this if we are still somewhat active (though technically testFinished is true while in this modal)
    // We just want visual consistency if they hit "cancel".
    const interval = setInterval(() => {
      if (timerRef.current <= 1) {
        clearInterval(interval);
        // Auto submit the test permanently when time is up in the summary screen too
        toast.success("Time's up! Your test has been automatically submitted.");
        dispatch(fullResetTest());
        navigate("student/dashboard");
      } else {
        dispatch(tickTimer());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  const total = stats?.total || 20;
  const attempted = stats?.attempted || 0;
  const marked = stats?.marked || 0;
  const unattempted = stats?.unattempted || total;

  // Calculate degrees for pie chart segments
  const attemptedDeg = total > 0 ? (attempted / total) * 360 : 0;
  const markedDeg = total > 0 ? (marked / total) * 360 : 0;

  const finishtest = () => {
    toast.success("Test Submitted Successfully!");
    dispatch(fullResetTest());
    navigate("/student/dashboard");
  }

  const handleGoBack = () => {
    dispatch(resetTest())
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-xl text-gray-800">Finish Test</h2>
          <span className="text-sm font-medium text-gray-500 flex gap-2.5 items-center">
            <Clock className="w-5 h-5" /> Remaining time {formatTime(timer)}
          </span>
        </div>

        {/* Content Area with custom scrollbar */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50/50 rounded-xl p-8 border border-gray-100">

            {/* Pie Chart Section */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 drop-shadow-sm">
                <div
                  className="w-full h-full rounded-full border-4 border-white shadow-inner"
                  style={{
                    background: `conic-gradient(
                      #22c55e 0deg ${attemptedDeg}deg,
                      #facc15 ${attemptedDeg}deg ${attemptedDeg + markedDeg}deg,
                      #f87171 ${attemptedDeg + markedDeg}deg 360deg
                    )`,
                  }}
                />
                {/* Inner circle for donut chart effect */}
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-3xl font-bold text-gray-800">{total}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</span>
                </div>
              </div>
            </div>

            {/* Key Stats Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Your Test Summary</h3>
                <p className="text-sm text-gray-500">Breakdown of your responses in Full Stack test</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Answered</span>
                  </div>
                  <span className="font-bold text-gray-800 bg-green-50 px-2 py-0.5 rounded text-sm">{attempted}</span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Marked for Revisit</span>
                  </div>
                  <span className="font-bold text-gray-800 bg-yellow-50 px-2 py-0.5 rounded text-sm">{marked}</span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-red-400 rounded-full shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Not Answered</span>
                  </div>
                  <span className="font-bold text-gray-800 bg-red-50 px-2 py-0.5 rounded text-sm">{unattempted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Section Summary */}
          <div className="mt-8">
            <h4 className="font-bold text-gray-800 mb-4 px-1">Section Details</h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Section Name</th>
                    <th className="px-6 py-4 font-semibold text-center">Answered</th>
                    <th className="px-6 py-4 font-semibold text-center">Marked</th>
                    <th className="px-6 py-4 font-semibold text-center">Not Answered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Full Stack test
                      <div className="text-xs text-gray-500 mt-1 font-normal">Core Module</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {attempted}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {marked}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {unattempted}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-colors cursor-pointer"
            onClick={handleGoBack}
          >
            Cancel, return to test
          </button>
          <button
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 transition-colors cursor-pointer"
            onClick={finishtest}
          >
            Submit Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestSummaryModal;
