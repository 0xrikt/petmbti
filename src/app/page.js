'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const startTest = () => {
    router.push('/petinfo');
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.content}>
        <button onClick={startTest} className={styles.startButton}>
          立即开始
        </button>
      </div>
    </div>
  );
}