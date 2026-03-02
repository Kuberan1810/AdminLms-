import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'iconsax-react';
import { ClipboardList } from 'lucide-react';

import { Calendar } from "../../../../assets/Images/icon/icon";
import type { Assignment } from '../CourseDetailsData';
import BtnCom from '../../../../Components/Student/BtnCom';

interface AssignmentsWidgetProps {
    assignments: Assignment[];
}

const AssignmentsWidget: React.FC<AssignmentsWidgetProps> = ({ assignments }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'In Progress', 'Completed', 'Over Due'];

    const filteredAssignments = activeTab === 'All'
        ? assignments
        : assignments.filter(a => a.status === activeTab);

    return (
        <div className="bg-white rounded-[28px] boxStyle border   flex flex-col gap-[30px] ">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-semibold text-gray-900 leading-[120%]" >Assignments</h2>
                    <p className="text-sm text-gray-500 mt-1">Friday, 15 Jan, 2024</p>
                </div>
                <BtnCom label="View all" onClick={() => navigate("/student/assignments")} />
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
                {filteredAssignments.map((assignment, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-[30px] boxStyle bg-white       "
                    >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-full bg-[#EF7A02] flex items-center justify-center ">
                                <ClipboardList className="w-6 h-6 text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[16px] font-semibold text-gray-900 leading-[120%] tracking-[0%]" >
                                    {assignment.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="p-1 rounded-[5px] bg-white border border-[#F3F5F7] flex items-center justify-center">
                                            <Calendar color="#626262" />
                                        </div>
                                        <span className="text-[#626262]">Due date: {assignment.dueDate}</span>
                                    </div>
                                    {assignment.dueTime && (
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1 rounded-[5px] bg-white border border-[#F3F5F7] flex items-center justify-center">
                                                <Clock size="16" color="#626262" variant="Outline" />
                                            </div>
                                            <span className="text-[#626262]">Due time: {assignment.dueTime}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`px-6 py-2.5 rounded-full text-sm font-medium text-center whitespace-nowrap ${assignment.status === 'Completed'
                            ? 'bg-[#E6F4EA] text-[#1E8E3E]' // Green
                            : assignment.status === 'In Progress'
                                ? 'bg-[#FFF0E6] text-[#FF8534]' // Orange
                                : 'bg-[#FFEDED] text-[#D93025]' // Red
                            }`}>
                            {assignment.status === 'In Progress' ? 'In progress' : assignment.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentsWidget;
