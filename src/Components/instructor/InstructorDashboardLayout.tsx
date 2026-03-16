import InstructorHeader from "./InstructorHeader";

interface Props {
    children?: React.ReactNode;
}

const InstructorDashboardLayout = ({ children }: Props) => {
    return (




        <div className="h-screen flex flex-col overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] transition-colors">

            <div className="shrink-0">
                <InstructorHeader />
            </div>

            <main className="flex-1 overflow-y-auto px-4 md:px-5 pb-5 ">
                {children}
            </main>

        </div>


    );
};

export default InstructorDashboardLayout;