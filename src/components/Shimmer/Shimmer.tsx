/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

import ButtonShimmer from '../ButtonShimmer';
import ProductCardShimmer from '../ProductCardShimmer';

export const Shimmer: FunctionComponent = () => {
  const productCardArray = Array.from({ length: 8 });

  return (
    <div className="ds-widgets bg-body py-2">
      <div className="flex">
        <div className="ds-widgets_results flex flex-col items-center pt-16 w-full h-full">
          <div className="flex flex-col max-w-5xl lg:max-w-7xl ml-auto w-full h-full">
            <div className="flex justify-end mb-[1px]">
              <ButtonShimmer />
            </div>
          </div>
          <div
            className="ds-sdk-product-list__grid mt-md pl-8"
          >
            {productCardArray.map((_, index) => (
              <ProductCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
