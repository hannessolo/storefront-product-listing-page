/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { Fragment, FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

import './product-list.css';

import { Alert } from '../../components/Alert';
import { useProducts, useStore } from '../../context';
import { Product, PromoTileResponse } from '../../types/interface';
import { classNames } from '../../utils/dom';
import ProductItem from '../ProductItem';
import PromoTile from '../PromoTile';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  products: Array<Product> | null | undefined;
  promoTiles?: Array<PromoTileResponse> | null | undefined;
  numberOfColumns: number;
  showFilters: boolean;
}

export const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  promoTiles,
  numberOfColumns,
  showFilters,
}) => {
  const productsCtx = useProducts();
  const {
    currencySymbol,
    currencyRate,
    setRoute,
    refineProduct,
    refreshCart,
    addToCart,
  } = productsCtx;
  const [cartUpdated, setCartUpdated] = useState(false);
  const [itemAdded, setItemAdded] = useState('');
  const { viewType } = useProducts();
  const [error, setError] = useState<boolean>(false);
  const {
    config: { listview },
  } = useStore();

  const className = showFilters
    ? 'ds-sdk-product-list max-w-full pl-3 pb-2xl sm:pb-24'
    : 'ds-sdk-product-list w-full mx-auto pb-2xl sm:pb-24';

  useEffect(() => {
    refreshCart && refreshCart();
  }, [itemAdded]);

  // TODO fix in query
  // const visibleProducts = products?.filter((p) => !p.productView.attributes.find((a) => a.name === 'include_in_feed' && a.value === 'no')) ?? [];

  // move out of stock products to bottom of list
  const inStockProductsFirst = [
    ...products?.filter((p) => p.productView.inStock) ?? [],
    ...products?.filter((p) => !p.productView.inStock) ?? []
  ];


  return (
    <div
      className={classNames('ds-sdk-product-list pb-2xl sm:pb-24', className)}
    >
      {cartUpdated && (
        <div className="mt-8">
          <Alert
            title={`You added ${itemAdded} to your shopping cart.`}
            type="success"
            description=""
            onClick={() => setCartUpdated(false)}
          />
        </div>
      )}
      {error && (
        <div className="mt-8">
          <Alert
            title={`Something went wrong trying to add an item to your cart.`}
            type="error"
            description=""
            onClick={() => setError(false)}
          />
        </div>
      )}

      {listview && viewType === 'listview' ? (
        <div className="w-full">
          <div className="ds-sdk-product-list__list-view-default mt-md grid grid-cols-none pt-[15px] w-full gap-[10px]">
            {inStockProductsFirst?.map((product, index) => {
              const currentPositionPromoTile = promoTiles?.find(
                (item) => item.position === (index + 1).toString()
              );
              return (
                <Fragment key={product?.productView?.id}>
                  {currentPositionPromoTile && (
                    <PromoTile
                      setRoute={setRoute}
                      promoTile={currentPositionPromoTile}
                    />
                  )}
                  <ProductItem
                    item={product}
                    productLabels={productsCtx.productLabels.filter(item => item.product_id === product.product.id)}
                    setError={setError}
                    key={product?.productView?.id}
                    currencySymbol={currencySymbol}
                    currencyRate={currencyRate}
                    setRoute={setRoute}
                    refineProduct={refineProduct}
                    setCartUpdated={setCartUpdated}
                    setItemAdded={setItemAdded}
                    addToCart={addToCart}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="ds-sdk-product-list__grid mt-md grid"
        >
          {inStockProductsFirst?.map((product, index) => {
            const currentPositionPromoTile = promoTiles?.find(
              (item) => item.position === (index + 1).toString()
            );
            return (
              <Fragment key={product?.productView?.id}>
                {currentPositionPromoTile && (
                  <PromoTile
                    setRoute={setRoute}
                    promoTile={currentPositionPromoTile}
                  />
                )}
                <ProductItem
                  item={product}
                  productLabels={productsCtx.productLabels.filter(item => item.product_id === product.product.id)}
                  setError={setError}
                  key={product?.productView?.id}
                  currencySymbol={currencySymbol}
                  currencyRate={currencyRate}
                  setRoute={setRoute}
                  refineProduct={refineProduct}
                  setCartUpdated={setCartUpdated}
                  setItemAdded={setItemAdded}
                  addToCart={addToCart}
                />
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
