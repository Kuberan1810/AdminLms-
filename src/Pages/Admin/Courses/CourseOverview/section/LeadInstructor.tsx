interface Instructor {
  name: string;
  role: string;
  tags: string[];
  avatar: string;
}

interface Props {
  instructor: Instructor;
}

const LeadInstructor = ({ instructor }: Props) => {
  return (
    <div className="boxStyle">
      <h3 className="md:text-xl text-lg font-semibold text-[#0B1C30] dark:text-white mb-6">Lead Instructor</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={instructor.avatar} 
          alt={instructor.name} 
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div>
          <h4 className="text-base font-bold text-[#333333] dark:text-white">{instructor.name}</h4>
          <p className="text-sm text-[#64748B] dark:text-[#A3A3A3]">{instructor.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {instructor.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-[#F1F5F9] dark:bg-[#3B3B3B] text-[#475569] dark:text-[#A3A3A3] text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <button className="w-full py-3 border border-[#F67300] text-[#F67300] font-bold text-sm rounded-xl hover:bg-[#F67300] hover:text-white transition-all cursor-pointer">
        Contact Instructor
      </button>
    </div>
  );
};

export default LeadInstructor;
