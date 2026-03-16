import { useState } from "react";
import Sidebar from "./SideBar";

export default function SideBarLayout({ children }: any) {
    const [collapsed, setCollapsed] = useState(
        window.innerWidth < 1024
    );

    /*
    useEffect(() => {
        const handleResize = () => setCollapsed(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    */

    return (
        <div className="flex w-full min-h-screen">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className="flex-1 bg-[#F9FAFB]">
                {children}
            </main>
        </div>
    );
}

