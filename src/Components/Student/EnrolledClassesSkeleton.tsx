function EnrolledClassesCardSkeleton() {
    return (
        <div className="boxStyle space-y-5 animate-pulse">
            {/* Title */}
            <div className="h-5 w-3/4 bg-gray-200 rounded" />

            {/* Meta */}
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Status */}
            <div className="h-5 w-24 bg-gray-200 rounded-full" />

            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-end">
                    <div className="h-4 w-10 bg-gray-200 rounded-full" />
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full" />
            </div>
        </div>
    );
}

export default EnrolledClassesCardSkeleton;




// function EnrolledClassesCardSkeleton() {
//     return (
//         <div className="boxStyle animate-pulse space-y-5 md:space-y-4 sm:space-y-3">
//             {/* Title */}
//             <div className="h-5 w-3/4 bg-gray-200 rounded md:h-4 sm:h-4" />

//             {/* Meta */}
//             <div className="flex gap-6 md:gap-5 sm:gap-4">
//                 <div className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded-md md:h-7 md:w-7 sm:h-6 sm:w-6" />
//                     <div className="h-4 w-20 bg-gray-200 rounded md:h-3.5 md:w-18 sm:h-3 sm:w-16" />
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded-md md:h-7 md:w-7 sm:h-6 sm:w-6" />
//                     <div className="h-4 w-20 bg-gray-200 rounded md:h-3.5 md:w-18 sm:h-3 sm:w-16" />
//                 </div>
//             </div>

//             {/* Status */}
//             <div className="h-5 w-24 bg-gray-200 rounded-full md:h-4 md:w-20 sm:h-4 sm:w-18" />

//             {/* Progress */}
//             <div className="space-y-2 md:space-y-1.5 sm:space-y-1.5">
//                 <div className="flex justify-end">
//                     <div className="h-4 w-10 bg-gray-200 rounded-full md:h-3.5 md:w-9 sm:h-3 sm:w-8" />
//                 </div>
//                 <div className="h-2 w-full bg-gray-200 rounded-full md:h-1.5 sm:h-1.5" />
//             </div>
//         </div>
//     );
// }

// export default EnrolledClassesCardSkeleton;
