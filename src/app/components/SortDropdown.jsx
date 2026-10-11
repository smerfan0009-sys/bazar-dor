export default function SortDropdown({ sortType, setSortType }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-base-content/75">সাজান</span>
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="select select-bordered select-sm rounded-lg"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-to-high">কম দাম থেকে বেশি</option>
        <option value="high-to-low">বেশি দাম থেকে কম</option>
      </select>
    </div>
  );
}
