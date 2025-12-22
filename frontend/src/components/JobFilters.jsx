import React from "react";

export default function JobFilters({
  categories,
  cities,
  total,
  onSearchChange,
  onCategoryChange,
  onCityChange,
}) {
  return (
    <div className="look">
      <input
        className="search"
        type="text"
        placeholder="Search employer jobs"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="cat"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select className="cit" onChange={(e) => onCityChange(e.target.value)}>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <p>{total} jobs found</p>
    </div>
  );
}
