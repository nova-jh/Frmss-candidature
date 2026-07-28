import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="البحث بالاسم، البريد الإلكتروني أو المؤسسة..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}