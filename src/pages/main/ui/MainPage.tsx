import { useState } from 'react';

import { ProductCard } from '@/entities/product';
import { SwirlBackground } from '@/shared/ui';
import { Banner } from '@/widgets/banner';

import * as styles from './MainPage.css';

const storageLabels = ['256GB', '512GB'];

export function MainPage() {
  const colorSwatches = [
    { hex: '#1A1A1D', label: '미드나이트' },
    { hex: '#F5F5F0', label: '스타라이트' },
  ];
  const [selectedStorage, setSelectedStorage] = useState(0);

  return (
    <>
      <Banner />

      {/* <div
        className={sprinkles({
          display: 'flex',
          flexDirection: { mobile: 'column', desktop: 'row' },
          gap: { mobile: 12, desktop: 24 },
          paddingY: { mobile: 16, desktop: 50 },
          paddingX: { mobile: 16, desktop: 20 },
        })}
      ></div> */}
      <div className={styles.hero}>
        <SwirlBackground />
        <div className={styles.title}>베스트 상품을 만나보세요</div>
        <div>
          <ProductCard
            imageSrc='placeholderImage'
            name='NOVA Phone'
            modelNumber='NV-2026'
            colorName='미드나이트'
            colorSwatches={colorSwatches}
            storageOptions={storageLabels.map((label, index) => ({
              label,
              selected: index === selectedStorage,
            }))}
            onStorageSelect={setSelectedStorage}
            priceAmount='1,290,000'
          />
        </div>
      </div>
    </>
  );
}
