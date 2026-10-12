export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col items-center justify-center space-y-4 px-4">
      <div className="flex flex-col items-center space-y-3">
        <span className="loading loading-spinner loading-lg text-[#047F39]"></span>

        <p className="text-base font-semibold text-gray-600 animate-pulse">
          তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    </div>
  );
}
