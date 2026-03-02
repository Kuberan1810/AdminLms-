import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

const FAQsTabSection: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const faqs: FAQ[] = [
        {
            id: 1,
            question: "What is this course about?",
            answer: "This course focuses on building, deploying, and scaling real-world AI/ML and Generative AI systems. It covers the complete AI lifecycle—from fundamentals to production-ready applications."
        },
        {
            id: 2,
            question: "What tools and technologies are covered in this course?",
            answer: "We cover Python, LangChain, CrewAI, AutoGen, various LLMs (GPT, Claude), and vector databases for RAG-based agent workflows."
        },
        {
            id: 3,
            question: "What skills will I gain by the end of this course?",
            answer: "By the end of this course, you will be able to design, implement, and deploy multi-agent systems that can plan, act, and solve complex tasks autonomously."
        }
    ];

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-[10px]">
            {faqs.map((faq) => (
                <div
                    key={faq.id}
                    className="bg-white border border-gray-100 rounded-[10px] overflow-hidden transition-all "
                >
                    <div className="p-[20px] flex flex-col ">
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full flex items-start justify-between text-left hover:text-orange-500 transition-colors cursor-pointer"
                        >
                            <span
                                className="text-[#333333]"
                                style={{
                                   
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    lineHeight: '1.2',
                                    maxWidth: '700px'
                                }}
                            >
                                {faq.question}
                            </span>
                            <div className="pt-1">
                                {openId === faq.id ? (
                                    <ChevronUp className="w-6 h-6 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-500" />
                                )}
                            </div>
                        </button>

                        {openId === faq.id && (
                            <div
                                className="mt-[15px] text-[#626262] animate-in fade-in slide-in-from-top-1 duration-200 max-w-fit" 
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '1.5',
                                    letterSpacing: '0%',
                                   
                                }}
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
