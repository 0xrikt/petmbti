'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Result.module.css';

export default function Result() {
  const [image, setImage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const petName = searchParams.get('name') || '';
  const petType = searchParams.get('type') || '';
  const mbtiResult = searchParams.get('mbti') || '';

  useEffect(() => {
    const basePath = petType === '狗狗' ? '/images/dog_result/' : '/images/cat_result/';
    const imagePath = `${basePath}${mbtiResult}.png`;
    setImage(imagePath);
  }, [petType, mbtiResult]);

  const retakeTest = () => {
    router.push('/');
  };

  const saveResult = () => {
    // 在Web版本中，我们可以使用浏览器的下载功能
    const link = document.createElement('a');
    link.href = image;
    link.download = `${petName}_${mbtiResult}_result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.textOverlay}>@{petName}{petType}</div>
        {image && <Image src={image} alt="MBTI Result" width={500} height={500} className={styles.resultImage} />}
      </div>
      <div className={styles.floatingButtons}>
        <button className={styles.testbutton} onClick={retakeTest}>再测一次</button>
        <button className={styles.savebutton} onClick={saveResult}>保存结果</button>
      </div>
    </div>
  );
}