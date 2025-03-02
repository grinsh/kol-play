import React, { useState } from 'react';

const SingersSearch = ({ singers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSingers, setFilteredSingers] = useState(singers);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // סינון לפי הזמרים
    const filtered = singers.filter((singer) =>
      singer.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSingers(filtered);
  };

  return (
    <div>
      <h2>חיפוש זמרים</h2>
      <input
        type="text"
        placeholder="חפש זמר"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredSingers.map((singer, index) => (
          <li key={index}>{singer}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingersSearch;
