function EnrolledClassesCardSkeleton() {
    return (
        <div className="boxStyle space-y-5 animate-pulse">
            {/* Title */}
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-[#3B3B3B] rounded" />

            {/* Meta */}
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-[#3B3B3B] rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-[#3B3B3B] rounded" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-[#3B3B3B] rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-[#3B3B3B] rounded" />
                </div>
            </div>

            {/* Status */}
            <div className="h-5 w-24 bg-gray-200 dark:bg-[#3B3B3B] rounded-full" />

            {/* Progress */}
            <div className="space-y-2">
                <div className="flex justify-end">
                    <div className="h-4 w-10 bg-gray-200 dark:bg-[#3B3B3B] rounded-full" />
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-[#3B3B3B] rounded-full" />
            </div>
        </div>
    );
}

export default EnrolledClassesCardSkeleton;
