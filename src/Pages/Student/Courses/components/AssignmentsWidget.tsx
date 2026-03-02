import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { Clock } from 'iconsax-react';

import { Calendar } from "../../../../assets/Images/icon/icon";
import type { Assignment } from '../CourseDetailsData';
import BtnCom from '../../../../Components/Student/BtnCom';

interface AssignmentsWidgetProps {
    assignments: Assignment[];
}

const AssignmentsWidget: React.FC<AssignmentsWidgetProps> = ({ assignments }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');

    const today = new Date();
    const headerDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const tabs = ['All', 'In Progress', 'Completed', 'Over Due'];

    const filteredAssignments = activeTab === 'All'
        ? assignments
        : assignments.filter(a => a.status === activeTab);

    return (
        <div className="bg-white rounded-[28px] boxStyle border   flex flex-col gap-[30px] ">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl lg:text-2xl font-semibold text-primary" >Assignments</h2>
                    <p className="text-[#626262] md:text-xl text-base">{headerDate}</p>
                </div>
                {/* <BtnCom label="View all" onClick={() => navigate("/student/assignments")} /> */}

                <BtnCom label="View all"  />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer border-[#F2EEF4] ${activeTab === tab
                            ? 'bg-[#F67300] text-white '
                            : 'bg-white text-gray-500 hover:text-gray-700 border  '
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="p-4 bg-[#FFF0EF] rounded-full mb-4">
                            <Calendar size={32} color="#EF7A02" />
                        </div>
                        <p className="text-[#626262] text-base font-medium">No Assignments Found</p>
                        <p className="text-[#989898] text-sm mt-1">There are no assignments scheduled for this date.</p>
                    </div>
                ) : (
                    filteredAssignments.map((assignment, index) => (
                        <div
                            key={index}
                            className="group flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-5 md:gap-10 py-3 pr-5 pl-1 border border-[#F2EEF4] hover:bg-[#FAFAFA]"
                        >
                            {/* Left Section */}
                            <div className="flex items-center gap-4">
                                <div className="sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] bg-[#ECF9FC]">
                                    <ClipboardList size="24" color="#46C0E1" />
                                </div>

                                <div>
                                    <h4 className="text-sm md:text-lg font-medium text-[#4D4D4D] group-hover:text-[#333] transition-colors mb-1">
                                        {assignment.title}
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1 rounded-[5px] bg-white border border-[#F3F5F7] flex items-center justify-center">
                                                <Calendar size={16} color="#626262" />
                                            </div>
                                            <span className="text-[#626262]">Due date: {assignment.dueDate}</span>
                                        </div>
                                        {assignment.dueTime && (
                                            <div className="flex items-center gap-1.5">
                                                <div className="p-1 rounded-[5px] bg-white border border-[#F3F5F7] flex items-center justify-center">
                                                    <Clock size={16} color="#626262" />
                                                </div>
                                                <span className="text-[#626262]">Due time: {assignment.dueTime}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section / Badge */}
                            <div>
                                <span
                                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${assignment.status === 'Completed'
                                        ? 'bg-[#E5F1E8] text-[#2A9A46]'
                                        : assignment.status === 'In Progress'
                                            ? 'bg-[#FFEDDE] text-[#F67300]'
                                            : 'bg-[#FEE2E2] text-[#FF1313]'
                                        }`}
                                >
                                    {assignment.status === 'In Progress' ? 'In progress' : assignment.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AssignmentsWidget;
