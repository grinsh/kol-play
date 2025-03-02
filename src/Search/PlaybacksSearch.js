import React, { useState } from 'react';

const PlaybacksSearch = ({ playbacks }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaybacks, setFilteredPlaybacks] = useState(playbacks);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // סינון לפי הפלייבקים
    const filtered = playbacks.filter((playback) =>
      playback.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaybacks(filtered);
  };

  return (
    <div>
      <h2>חיפוש פלייבקים</h2>
      <input
        type="text"
        placeholder="חפש פלייבק"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredPlaybacks.map((playback, index) => (
          <li key={index}>{playback}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaybacksSearch;
