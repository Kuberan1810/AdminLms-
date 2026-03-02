import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";
import { resetTest } from "../../../../../store/slices/TestPageSlice";


const TestSummaryModal = () => {
  const total = 20;
  const attempted = 18;
  const marked = 1;
  const unattempted = 1;

  const attemptedDeg = (attempted / total) * 360;
  const markedDeg = (marked / total) * 360;

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const finishtest = () => {
    navigate("/dashboard");
  }

  const handleGoBack = () => {
    dispatch(resetTest())
  }

  return (
    <div className="fixed inset-0 bg-white/95 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white w-full max-w-7xl rounded-lg max-h-screen overflow-y-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-3 md:px-4 py-2 gap-2">
          <h2 className="font-semibold text-base md:text-lg">Finish Test</h2>
          <span className="text-xs md:text-sm text-gray-500">
            ⏱ Remaining time 00:00:10
          </span>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 p-3 md:p-6">

          {/* Pie Chart */}
          <div className="relative w-32 h-32 md:w-44 md:h-44 mx-auto md:mx-0">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
                  #2f9e44 0deg ${attemptedDeg}deg,
                  #f59f00 ${attemptedDeg}deg ${attemptedDeg + markedDeg}deg,
                  #e03131 ${attemptedDeg + markedDeg}deg 360deg
                )`,
              }}
            />
          </div>

          {/* Test Summary */}
          <div className="flex flex-col justify-center w-auto">
            <h3 className="font-semibold mb-1 text-sm md:text-base">Your Test Summary</h3>
            <p className="text-lg md:text-2xl font-bold mb-4">
              {total} <span className="text-xs md:text-sm font-normal">Total Question</span>
            </p>

            <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 md:w-3 h-2 md:h-3 bg-green-600 rounded-full" />
                Attempted : {attempted}/{total}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 md:w-3 h-2 md:h-3 bg-orange-500 rounded-full" />
                Marked for Revisit : {marked}/{total}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 md:w-3 h-2 md:h-3 bg-red-600 rounded-full" />
                Unattempted : {unattempted}/{total}
              </div>
            </div>
          </div>
        </div>

        {/* Section Summary */}
        <div className="px-3 md:px-6 py-3 md:py-4">
          <h4 className="font-semibold mb-3 text-sm md:text-base">Section Summary</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-1 md:px-2 py-1 md:py-2">#</th>
                  <th className="px-1 md:px-2 py-1 md:py-2 text-left">Test name</th>
                  <th className="px-1 md:px-2 py-1 md:py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-1 md:px-2 py-1 md:py-2 text-center">1</td>
                  <td className="px-1 md:px-2 py-1 md:py-2">
                    Test name <br />
                    <span className="text-xs text-gray-500">
                      Remaining time: 00:00:00
                    </span>
                  </td>
                  <td className="px-1 md:px-2 py-1 md:py-2 space-y-1">
                    <div className="flex justify-center items-center gap-2 text-xs md:text-sm">
                      <span className="w-2 h-2 bg-green-600 rounded-full" />
                      Attempted: 18
                    </div>
                    <div className="flex justify-center items-center gap-2 text-xs md:text-sm">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      Marked: 1
                    </div>
                    <div className="flex justify-center items-center gap-2 text-xs md:text-sm">
                      <span className="w-2 h-2 bg-red-600 rounded-full" />
                      Unattempted: 1
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4 px-3 md:px-6 py-3 md:py-4">
          <button className="bg-orange-500 text-white px-4 md:px-6 py-2 rounded-md font-semibold text-sm md:text-base" onClick={finishtest}>
            Yes, End Test!
          </button>
          <button className="border border-gray-400 px-4 md:px-6 py-2 rounded-md text-sm md:text-base" onClick={handleGoBack}>
            No, Back to test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSummaryModal;
