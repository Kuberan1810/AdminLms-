import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";

export default function StudentLayout() {
    // const [collapsed, setCollapsed] = useState(
    //     window.innerWidth < 1024
    // );

    const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
     
     

                <div className="flex h-screen overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] transition-colors duration-300">
                    <div className="h-screen shrink-0">
                        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                    </div>  
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="shrink-0">
                            <Header />
                        </div>

                        <main className="flex-1 overflow-y-auto px-5 pb-5 ">
                            <Outlet />
                        </main>
                    </div>

                </div>
            
        
    );
}
