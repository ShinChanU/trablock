import React from 'react';

const SearchPlace = ({ inputText, onChange, handleSubmit }) => {
  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <input
        placeholder="Search Place..."
        onChange={onChange}
        value={inputText}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchPlace;
