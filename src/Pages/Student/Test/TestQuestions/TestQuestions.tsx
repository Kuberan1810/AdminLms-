import TestQuestionsSection from "./sections/TestQuestionsSection"
import { useAppSelector } from "../../../../store/hooks"
import TestSummaryModal from "./sections/TestSummary"

const TestQuestions = () => {
    const status = useAppSelector((state) => state.counter.finished)

  return (
    <div>
        {
            status?<TestSummaryModal />:<TestQuestionsSection />
        }
        
    </div>
  )
}

export default TestQuestions