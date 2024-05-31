import { useState } from 'react';

function TagItem({ tag, handleDelete }) {
  return (
    <div>
      {tag}
      <button
        type='button'
        onClick={() => {
          handleDelete(tag);
        }}>
        삭제
      </button>
    </div>
  );
}

export default function Tags({ tags, setValues }) {
  const [inputValue, setInputValue] = useState('');

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
        setValues((prev) => {
          return { ...prev, tags: [...prev.tags, inputValue] };
        });
      }
      setInputValue('');
    }
  };

  const handleDelete = (tag) => {
    setValues((prev) => {
      return { ...prev, tags: tags.filter((t) => t !== tag) };
    });
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
          tags.map((tag) => {
            return (
              <li key={tag}>
                <TagItem tag={tag} handleDelete={handleDelete} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
