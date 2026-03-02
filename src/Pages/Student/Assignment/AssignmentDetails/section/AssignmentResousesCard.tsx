import React from "react";
import { ImportCurve, Link1, ExportSquare } from "iconsax-react";
import Pdficon from "../../../../../assets/Images/icon/pdfIcon.svg";

interface Resource {
    id: number;
    title: string;
    subText?: string;
    url: string;
    type: "pdf" | "link";
}

interface Props {
    resource: Resource;
}

const ResourceCard: React.FC<Props> = ({ resource }) => {
    const isExternalLink = resource.type === "link";

    return (
        <a
            href={resource.url}
            target={isExternalLink ? "_blank" : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-10 py-1 pr-5 pl-1 border border-[#F2EEF4]   "
            aria-label={`Open ${resource.title}`}
        >
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <div
                    className={`sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] ${resource.type === "pdf"
                            ? "bg-[#FEE2E2]"
                            : "bg-[#ECF9FC]"
                        }`}
                >
                    {resource.type === "pdf" ? (
                        <img src={Pdficon} alt="PDF file icon" className="min-w-6  min-h-6   " />
                    ) : (
                        <Link1 size="24" variant="Outline" color="#46C0E1" />
                    )}
                </div>

                <div>
                    <h4 className="text-sm md:text-lg font-medium text-[#4D4D4D] group-hover:text-[#333] transition-colors">
                        {resource.title}
                    </h4>
                    {resource.subText && (
                        <p className="text-xs md:text-base text-[#808080] mt-1">
                            {resource.subText}
                        </p>
                    )}
                </div>
            </div>

            {/* Right Icon */}
            <div>
                {resource.type === "pdf" ? (
                    <ImportCurve size="16" color="#808080" />
                ) : (
                    <ExportSquare size="16" color="#808080" />
                )}
            </div>
        </a>
    );
};

export default ResourceCard;