/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

const MINIMUM_QUANTITY = 1;
const MAXIMUM_QUANTITY = 10000;

export interface UpdateQuantityWidgetProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const UpdateQuantityWidget: FunctionComponent<
  UpdateQuantityWidgetProps
> = ({ quantity, setQuantity }: UpdateQuantityWidgetProps) => {
  const setSpecificQuantity = (event: any) => {
    const updatedQuantity = Number(event.target.value);
    if (updatedQuantity > MAXIMUM_QUANTITY) {
      setQuantity(MAXIMUM_QUANTITY);
    } else if (updatedQuantity > 0) {
      setQuantity(updatedQuantity);
    } else {
      setQuantity(MINIMUM_QUANTITY);
    }
  };
  const plusQuantity = () => {
    if (quantity < MAXIMUM_QUANTITY) {
      setQuantity(quantity + 1);
    }
  };
  const minusQuantity = () => {
    if (quantity > MINIMUM_QUANTITY) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="ds-sdk-update-quantity-widget">
      <button className="quantity-down" onClick={minusQuantity}>
        -
      </button>
      <input
        name="quantity"
        type="number"
        onChange={setSpecificQuantity}
        value={quantity}
      />
      <button className="quantity-up" onClick={plusQuantity}>
        +
      </button>
    </div>
  );
};
