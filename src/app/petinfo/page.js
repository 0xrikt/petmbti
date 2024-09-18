'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../../styles/PetInfo.module.css';

export default function PetInfo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [petInfo, setPetInfo] = useState({
    type: '狗狗',
    name: '',
    breed: '',
    gender: '妹妹'
  });
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setPetInfo({ ...petInfo, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push(`/test?${new URLSearchParams(petInfo).toString()}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepIndicator}>
        {currentStep + 1} / 4
      </div>
      {currentStep === 0 && (
        <div>
          <h2 className={styles.label}>你的宠物是</h2>
          <div className={styles.petOptions}>
            <div className={styles.petOption} onClick={() => handleInputChange('type', '狗狗')}>
              <Image src={petInfo.type === '狗狗' ? '/images/dog_select.png' : '/images/dog_unselect.png'} alt="狗狗" width={100} height={100} />
            </div>
            <div className={styles.petOption} onClick={() => handleInputChange('type', '猫猫')}>
              <Image src={petInfo.type === '猫猫' ? '/images/cat_select.png' : '/images/cat_unselect.png'} alt="猫猫" width={100} height={100} />
            </div>
          </div>
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <div className={styles.titleContainer}>
            <Image src={petInfo.type === '狗狗' ? '/images/titledog.png' : '/images/titlecat.png'} alt="宠物图标" width={30} height={30} />
            <h2 className={styles.label}>{petInfo.type}的名字叫</h2>
          </div>
          <input
            className={styles.input}
            type="text"
            value={petInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <div className={styles.titleContainer}>
            <Image src={petInfo.type === '狗狗' ? '/images/titledog.png' : '/images/titlecat.png'} alt="宠物图标" width={30} height={30} />
            <h2 className={styles.label}>{petInfo.type}品种是</h2>
          </div>
          <input
            className={styles.input}
            type="text"
            value={petInfo.breed}
            onChange={(e) => handleInputChange('breed', e.target.value)}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <div className={styles.titleContainer}>
            <Image src={petInfo.type === '狗狗' ? '/images/titledog.png' : '/images/titlecat.png'} alt="宠物图标" width={30} height={30} />
            <h2 className={styles.label}>{petInfo.type}是</h2>
          </div>
          <div className={styles.petOptions}>
            <div className={styles.petOption} onClick={() => handleInputChange('gender', '妹妹')}>
              <Image src={petInfo.gender === '妹妹' ? '/images/female_select.png' : '/images/female_unselect.png'} alt="妹妹" width={100} height={100} />
            </div>
            <div className={styles.petOption} onClick={() => handleInputChange('gender', '弟弟')}>
              <Image src={petInfo.gender === '弟弟' ? '/images/male_select.png' : '/images/male_unselect.png'} alt="弟弟" width={100} height={100} />
            </div>
          </div>
        </div>
      )}
      <button className={styles.nextButton} onClick={nextStep} disabled={currentStep === 1 && !petInfo.name || currentStep === 2 && !petInfo.breed}>
        {currentStep === 3 ? '开启AI测试' : '下一步'}
      </button>
      {currentStep > 0 && (
        <button className={styles.prevButton} onClick={prevStep}>上一步</button>
      )}
    </div>
  );
}