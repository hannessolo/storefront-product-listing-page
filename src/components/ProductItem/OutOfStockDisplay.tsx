/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';

import { TranslationContext } from '../../context/translation';
import { Product } from '../../types/interface';

export interface OutOfStockDisplayProps {
  item: Product;
}

export const OutOfStockDisplay: FunctionComponent<OutOfStockDisplayProps> = ({
  item,
}: OutOfStockDisplayProps) => {
  const translation = useContext(TranslationContext);

  const handleClick = async () => {
    // external import
    const { showModal } = await import('/aem/scripts/stock-reminder/stock-reminder.js');
    showModal(item.product.id);
  }

  return (
    <>
      <span class="out-of-stock-message text-red-600 text-xl capitalize">{translation.OutOfStockDisplay.outOfStock}</span>
      <div class="pb-4">
        <button onClick={handleClick} data-product-id={item.product.id} class="notify-me flex items-center justify-center text-white text-sm rounded-full h-[32px] w-full p-sm" type="button">{translation.OutOfStockDisplay.notifyMe}</button>
      </div>
    </>
  );
};

export default OutOfStockDisplay;
