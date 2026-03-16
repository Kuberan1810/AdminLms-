import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DocumentText } from 'iconsax-react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

const FAQsTabSection: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const faqs: FAQ[] = [
        // {
        //     id: 1,
        //     question: "What is this course about?",
        //     answer: "This course focuses on building, deploying, and scaling real-world AI/ML and Generative AI systems. It covers the complete AI lifecycle from fundamentals to production-ready applications."
        // },
        // {
        //     id: 2,
        //     question: "What tools and technologies are covered in this course?",
        //     answer: "We cover Python, LangChain, CrewAI, AutoGen, various LLMs (GPT, Claude), and vector databases for RAG-based agent workflows."
        // },
        // {
        //     id: 3,
        //     question: "What skills will I gain by the end of this course?",
        //     answer: "By the end of this course, you will be able to design, implement, and deploy multiagent systems that can plan, act, and solve complex tasks autonomously."
        // }
    ];

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    if (faqs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 w-full text-center">
                <div className="w-[64px] h-[64px] bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-full flex items-center justify-center mb-6">
                    <DocumentText size={32} color="#EF7A02" />
                </div>
                <h3 className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium mb-2">No FAQs Found</h3>
                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm ">There are no frequently asked questions available for this class.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[10px]">
            {faqs.map((faq) => (
                <div
                    key={faq.id}
                    className="bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#363636] rounded-[10px] overflow-hidden transition-all "
                >
                    <div className="p-[20px] flex flex-col ">
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full flex items-start justify-between text-left hover:text-orange-500 transition-colors cursor-pointer"
                        >
                            <span
                                className="text-[#333333] dark:text-white text-base font-medium"
                            >
                                {faq.question}
                            </span>
                            <div className="pt-1">
                                {openId === faq.id ? (
                                    <ChevronUp className="w-5 h-5 text-[#626262]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#626262]" />
                                )}
                            </div>
                        </button>

                        {openId === faq.id && (
                            <div
                                className="mt-[15px] text-[#4d4d4d] dark:text-gray-300 animate-in fade-in slide-in-from-top-1 duration-300 max-w-fit text-sm"
                            >
                                {faq.answer}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQsTabSection;