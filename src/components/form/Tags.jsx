import { useEffect, useState } from 'react';

function TagItem({ tag, setTags }) {
  const handleDelete = (e) => {
    setTags((prev) => {
      return prev.filter((t) => t !== tag);
    });
  };
  return (
    <div>
      {tag}
      <button type='button' onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}

export default function Tags({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   console.log(tags);
  // }, [tags]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (inputValue === '') return;

      if (!isValueInArray(tags, inputValue)) {
        setTags((prev) => [...prev, inputValue]);
      }
      setInputValue('');
    }
  };

  const isValueInArray = (arr, value) => {
    return arr.includes(value);
  };

  return (
    <>
      <label htmlFor='ipt-tag'>태그</label>
      <input
        type='text'
        name='tag'
        id='ipt-tag'
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
      <ul className='tag-list'>
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => {
            return (
              <li key={tag}>
                <TagItem tag={tag} setTags={setTags} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
