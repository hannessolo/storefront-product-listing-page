/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { Product, RefinedProduct } from '../types/interface';

const getProductPrice = (
  product: Product | RefinedProduct,
  currencySymbol: string,
  currencyRate: string | undefined,
  useMaximum = false,
  useFinal = false
): string => {
  let priceType;
  let price;
  if ('product' in product) {
    priceType = product?.product?.price_range?.minimum_price;

    if (useMaximum) {
      priceType = product?.product?.price_range?.maximum_price;
    }

    price = priceType?.regular_price;
    if (useFinal) {
      price = priceType?.final_price;
    }
  } else {
    priceType =
      product?.refineProduct?.priceRange?.minimum ??
      product?.refineProduct?.price;

    if (useMaximum) {
      priceType = product?.refineProduct?.priceRange?.maximum;
    }

    price = priceType?.regular?.amount;
    if (useFinal) {
      price = priceType?.final?.amount;
    }
  }

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return `${formatter.format(Number(price.value))}`;
};

export { getProductPrice };
