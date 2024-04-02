/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

import PodIcon from '../../icons/dg_pod.svg';
import LightPodIcon from '../../icons/dg_pod_w.svg';
import TeaIcon from '../../icons/dg_tea.svg';
import { Product, ProductAttribute } from '../../types/interface';

export interface ProductCapsulesProps {
  item: Product;
}

export const ProductCapsules: FunctionComponent<ProductCapsulesProps> = ({
  item,
}: ProductCapsulesProps) => {
  const { productView } = item;
  const getProductViewAttributeValue = (attributeName: string | null) => {
    return productView?.attributes.find(
      (attribute: ProductAttribute) => attribute.name === attributeName
    )?.value;
  };
  
  const capsules = getProductViewAttributeValue('number_pods');
  const podsPerCup = getProductViewAttributeValue('pods_per_cup');
  const cupType = getProductViewAttributeValue('cup_type');  
  
  const capsuleTypeIcon = cupType === 'Tea Cup' ? <TeaIcon class="plp-type-icon" /> : <PodIcon class="plp-type-icon" />;


  return (
    <div className="capsules">
      Capsules:{' '}
      {podsPerCup === '1' && (
        <>
          x {capsules} {capsuleTypeIcon}
        </>
      )}
      {podsPerCup !== '1' && (
        <>
          x {Number(capsules) / Number(podsPerCup)}{' '}
          <PodIcon class="plp-type-icon" /> x{' '}
          {Number(capsules) / Number(podsPerCup)}{' '}
          <LightPodIcon class="plp-type-icon"/>
        </>
      )}
    </div>
  );
};

export default ProductCapsules;
