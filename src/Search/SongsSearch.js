import React, { useState } from 'react';

const SongsSearch = ({ songs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // סינון לפי השירים
    const filtered = songs.filter((song) =>
      song.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div>
      <h2>חיפוש שירים</h2>
      <input
        type="text"
        placeholder="חפש שיר"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredSongs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsSearch;
