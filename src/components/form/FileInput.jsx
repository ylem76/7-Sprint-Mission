import { useState, useRef, useEffect } from 'react';
import { ButtonAddImage, ButtonDeleteRound } from '../ui/Buttons';

export default function FileInput({ setValues }) {
  const [previewImage, setPreviewImage] = useState(null);
  const inputRef = useRef();

  const handlePreviewImage = (e) => {
    // preview 이미지 등록
    setPreviewImage(() => {
      return URL.createObjectURL(e.target.files[0]);
    });
  };

  const previewImageClear = () => {
    // preview 이미지 삭제
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  const handlePreviewClear = (e) => {
    // preview 이미지 삭제 핸들러
    if (!previewImage) return;
    previewImageClear();
    inputRef.current.value = '';
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 클리어
      previewImageClear();
    };
  }, []);

  useEffect(() => {
    setValues((prev) => ({ ...prev, image: previewImage }));
  }, [previewImage, setValues]);
  return (
    <div className='flex gap-2'>
      <ButtonAddImage
        type='button'
        onClick={() => {
          inputRef.current.click();
        }}
      />

      {previewImage && (
        <div className={`w-42 h-42 bg-gray-100 relative`}>
          <div className='w-full h-full overflow-hidden rounded-md'>
            <img
              className={`object-cover w-full h-full`}
              src={previewImage}
              alt='사용자가 등록한 상품 이미지'
            />
          </div>

          <ButtonDeleteRound
            className='absolute top-2 right-2'
            type='button'
            onClick={handlePreviewClear}>
            삭제
          </ButtonDeleteRound>
        </div>
      )}
      <input
        id='ipt-files'
        type='file'
        name='images'
        ref={inputRef}
        hidden
        onChange={handlePreviewImage}
      />
    </div>
  );
}
