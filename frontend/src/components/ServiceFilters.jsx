import React, { useState, useEffect } from "react";

export default function ServiceFilters({
  categories,
  cities,
  total,
  onSearchChange,
  onCategoryChange,
  onCityChange,
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Debounced search - wait 500ms after user stops typing
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 500);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [localSearch, onSearchChange]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    onSearchChange?.("");
  };

  return (
    <div className="Searchabout">
      <div className="Searchn" style={{ position: 'relative' }}>
        <img src="media/search (1).png" alt="search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
        <input
          type="text"
          placeholder="Search student services..."
          value={localSearch}
          onChange={handleSearchChange}
          style={{
            paddingLeft: '40px',
            paddingRight: localSearch ? '40px' : '15px',
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
        {localSearch && (
          <button
            onClick={handleClearSearch}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: '#666'
            }}
          >
            ×
          </button>
        )}
      </div>

      <select 
        defaultValue="All Categories" 
        onChange={(e) => onCategoryChange?.(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '14px',
          minWidth: '200px'
        }}
      >
        <option value="All Categories">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select 
        defaultValue="All Cities" 
        onChange={(e) => onCityChange?.(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '14px',
          minWidth: '150px'
        }}
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        fontSize: '14px',
        color: '#666'
      }}>
        <span>{total} services found</span>
        {localSearch && (
          <span style={{ fontSize: '12px', color: '#999' }}>
            (searching: "{localSearch}")
          </span>
        )}
      </div>
    </div>
  );
}

