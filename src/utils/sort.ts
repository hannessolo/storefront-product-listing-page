/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { Language } from '../context/translation';
import { GQLSortInput, SortMetadata, SortOption } from '../types/interface';

const defaultSortOptions = (): SortOption[] => {
  return [
    { label: 'Most Relevant', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: 'price' },
  ];
};

const getSortOptionsfromMetadata = (
  translation: Language,
  sortMetadata: SortMetadata[],
  displayOutOfStock?: string | boolean,
  categoryPath?: string
): SortOption[] => {
  const sortOptions = categoryPath
    ? [
        {
          label: translation.SortDropdown.positionLabel,
          value: 'position',
        },
      ]
    : [
        {
          label: translation.SortDropdown.relevanceLabel,
          value: 'relevance',
        },
      ];
  const displayInStockOnly = displayOutOfStock != '1'; // '!=' is intentional for conversion

  if (sortMetadata && sortMetadata.length > 0) {
    sortMetadata.forEach((e) => {
      if (
        !e.attribute.includes('relevance') &&
        !(e.attribute.includes('inStock') && displayInStockOnly) &&
        !e.attribute.includes('position')
        /* conditions for which we don't display the sorting option:
                1) if the option attribute is relevance
                2) if the option attribute is "inStock" and display out of stock products is set to no
                3) if the option attribute is "position" and there is not a categoryPath (we're not in category browse mode) -> the conditional part is handled in setting sortOptions
                */
      ) {
        sortOptions.push({
          label: `${translation.SortDropdown.customLabels?.[e.label] || e.label}`,
          value: e.attribute,
        });
      }
    });
  }
  return sortOptions;
};

const generateGQLSortInput = (
  sortOption: string,
  sortDirection: 'ASC' | 'DESC',
): GQLSortInput[] | undefined => {
  // results sorted by relevance or position by default
  if (!sortOption) {
    return undefined;
  }

  return [
    {
      attribute: sortOption,
      direction: sortDirection || 'ASC',
    },
  ];
};

export { defaultSortOptions, generateGQLSortInput, getSortOptionsfromMetadata };
