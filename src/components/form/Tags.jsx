import { useState } from 'react';
import { Input } from '../ui/Inputs';
import { ButtonDeleteRound } from '../ui/Buttons';

function TagItem({ tag, handleDelete }) {
  return (
    <div
      className={`text-base font-normal leading-6 px-4 py-3 flex gap-4 text-left rounded-full bg-gray-100`}>
      {tag}
      <ButtonDeleteRound
        type='button'
        onClick={() => {
          handleDelete(tag);
        }}>
        삭제
      </ButtonDeleteRound>
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
      <Input
        type='text'
        name='tag'
        id='ipt-tag'
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        placeholder='태그를 입력해주세요'
      />

      <ul className='flex gap-4'>
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
