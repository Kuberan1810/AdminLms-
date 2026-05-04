export const getBatchData = (batchId: string) => {
  const data: Record<string, any> = {
    "b1": {
      id: "AM101-B01",
      stats: [
        { label: "Total Students", value: "32", icon: "users", iconColor: "text-[#F67300]", bgColor: "bg-[#FFF5EB]" },
        { label: "Duration", value: "12 Weeks", subtitle: "Current : Week 04 of 12", icon: "clock", iconColor: "text-[#3B82F6]", bgColor: "bg-[#EFF6FF]" },
        { label: "Next Session", value: "Tomorrow, 10:00 am", topic: "", icon: "calendar", iconColor: "text-[#A855F7]", bgColor: "bg-[#F5F3FF]" },
        { label: "Avg. Progress", value: "68% Completion", growth: "+4% from last week", icon: "trending", iconColor: "text-[#22C55E]", bgColor: "bg-[#F0FDF4]" },
      ],
      modules: [
        { id: "m1", number: "02", title: "Generative AI & LLM Engineering", lessons: [
          { id: "l1", title: "Implementing TanStack Query Hooks", isLive: true, isCompleted: false },
          { id: "l2", title: "Thinking in Server State", isCompleted: true, duration: "15:00" },
        ]},
        { id: "m2", number: "01", title: "AI & ML Foundations", lessons: [
          { id: "l3", title: "Intro to AI", isCompleted: true, duration: "10:00" },
        ]}
      ],
      sessions: [
        { id: "s1", month: "JAN", day: 12, title: "Lang chain", time: "10:00 AM - 12:00 PM", isToday: true },
        { id: "s2", month: "JAN", day: 15, title: "Custom Hook Design", time: "02:00 PM - 04:00 PM" },
      ],
      instructor: {
        name: "Dr. Dravid",
        role: "Frontier AI Engineer",
        tags: ["AI Expert", "ML Mentor"," Innovation Leader"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop"
      },
      enrollment: {
        total: 24,
        attendance: 92,
        completion: 74,
        students: [
          "https://i.pravatar.cc/150?u=s1", "https://i.pravatar.cc/150?u=s2", "https://i.pravatar.cc/150?u=s3"
        ]
      }
    },
    "b2": {
      id: "AM101-B02",
      stats: [
        { label: "Total Students", value: "28", icon: "users", iconColor: "text-[#F67300]", bgColor: "bg-[#FFF5EB]" },
        { label: "Duration", value: "10 Weeks", subtitle: "Current : Week 02 of 10", icon: "clock", iconColor: "text-[#3B82F6]", bgColor: "bg-[#EFF6FF]" },
        { label: "Next Session", value: "Monday, 02:00 pm", icon: "calendar", iconColor: "text-[#A855F7]", bgColor: "bg-[#F5F3FF]" },
        { label: "Avg. Progress", value: "45% Completion", icon: "trending", iconColor: "text-[#22C55E]", bgColor: "bg-[#F0FDF4]" },
      ],
      modules: [
        { id: "m1", number: "01", title: "Advanced React Patterns", lessons: [
          { id: "l1", title: "Higher Order Components", isCompleted: true, duration: "20:00" },
          { id: "l2", title: "Render Props vs Hooks", isLive: true, isCompleted: false },
        ]}
      ],
      sessions: [
        { id: "s1", month: "FEB", day: 5, title: "React Context API", time: "11:00 AM - 01:00 PM", isToday: true },
      ],
      instructor: {
        name: "Sarah Connor",
        role: "Senior React Dev",
        tags: ["Frontend Expert", "UI/UX Mentor"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop"
      },
      enrollment: {
        total: 28,
        attendance: 85,
        completion: 60,
        students: [
          "https://i.pravatar.cc/150?u=s10", "https://i.pravatar.cc/150?u=s11"
        ]
      }
    }
  };

  return data[batchId] || data["b1"];
};
