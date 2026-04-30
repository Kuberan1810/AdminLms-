import { useAppSelector } from "../../../store/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import TestSectionNew from './section/TestSectionNew';
import TestListCard from './section/TestListCard';
import logo from "../../../assets/Images/home/coirei-logo-orange.png";

const Test = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const testsById = useAppSelector((state) => state.resource.tests.byId);
    const testIds = useAppSelector((state) => state.resource.tests.allIds);
    const tests = testIds.map(id => testsById[id]);

    const handleTestClick = (test: any) => {
        navigate('/student/test', { state: { test } });
    };

    // If we have a test in the state, show the welcome/countdown page
    const hasSelectedTest = location.state?.test;

    if (hasSelectedTest) {
        return <TestSectionNew />;
    }

    return (
        <div className="p-6 md:p-10 bg-[#F9FAFB] min-h-screen font-['Urbanist']">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-[#333333]">Available Tests</h1>
                    <p className="text-gray-500 mt-2 text-lg">Choose a test to view details and start when scheduled.</p>
                </div>
                <img src={logo} alt="logo" className="w-32 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {tests.length > 0 ? (
                    tests.map((test) => (
                        <TestListCard 
                            key={test.id} 
                            test={test} 
                            onClick={() => handleTestClick(test)} 
                        />
                    ))
                ) : (
                    <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-[#F67300]">📝</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800">No Tests Found</h3>
                        <p className="text-gray-500 mt-2">There are no tests assigned to you at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Test;