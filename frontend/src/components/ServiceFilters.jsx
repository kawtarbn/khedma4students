import React from "react";

export default function ServiceFilters({
  categories,
  cities,
  total,
  onSearchChange,
  onCategoryChange,
  onCityChange,
}) {
  return (
    <div className="Searchabout">
      <div className="Searchn">
        <img src="media/search (1).png" alt="search" />
        <input
          type="text"
          placeholder="Search student services"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <select defaultValue="All Categories" onChange={(e) => onCategoryChange?.(e.target.value)}>
        <option value="All Categories">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select defaultValue="All Cities" onChange={(e) => onCityChange?.(e.target.value)}>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <p>{total} services found</p>
    </div>
  );
}

