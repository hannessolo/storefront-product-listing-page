/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

export interface AddToCartButtonProps {
  onClick: (e: any) => any;
  addingToCart: boolean;
  recentlyAddedToCart: boolean;
}
export const AddToCartButton: FunctionComponent<AddToCartButtonProps> = ({
  onClick,
  addingToCart,
  recentlyAddedToCart,
}: AddToCartButtonProps) => {
  const addingInProcessClass =
    addingToCart || recentlyAddedToCart ? 'adding' : '';
  const classes = `flex items-center justify-center text-white text-sm rounded-full h-[32px] w-full p-sm ${addingInProcessClass}`;
  return (
    <div className="ds-sdk-add-to-cart-button">
      <button className={classes} onClick={onClick}>
        {recentlyAddedToCart
          ? 'Ajouté'
          : addingToCart
          ? `En cours d'ajout`
          : 'Ajouter Au Panier'}
      </button>
    </div>
  );
};
