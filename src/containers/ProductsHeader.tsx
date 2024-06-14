/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import Facets from '../components/Facets';
import { FilterButton } from '../components/FilterButton';
import { SearchBar } from '../components/SearchBar';
import { SortDropdown } from '../components/SortDropdown';
import {
  useAttributeMetadata,
  useProducts,
  useSearch,
  useStore,
  useTranslation,
} from '../context';
import { Facet } from '../types/interface';
import { getValueFromUrl, handleUrlSort } from '../utils/handleUrlFilters';
import {
  defaultSortOptions,
  generateGQLSortInput,
  getSortOptionsfromMetadata,
} from '../utils/sort';

interface Props {
  loading: boolean;
  facets: Facet[];
  displayFilter: () => void;
  totalCount: number;
  screenSize: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
    columns: number;
  };
}
export const ProductsHeader: ({
                                loading,
                                facets,
                                displayFilter,
                                totalCount,
                                screenSize
                              }: { loading: any; facets: any; displayFilter: any; totalCount: any; screenSize: any }) => JSX.Element = ({
  loading,
  facets,
  displayFilter,
  totalCount,
  screenSize,
}) => {
  const searchCtx = useSearch();
  const storeCtx = useStore();
  const attributeMetadata = useAttributeMetadata();
  const productsCtx = useProducts();
  const translation = useTranslation();

  const [showMobileFacet, setShowMobileFacet] = useState(
    !!productsCtx.variables.filter?.length
  );
  const [sortOptions, setSortOptions] = useState(defaultSortOptions());

  const getSortOptions = useCallback(() => {
    setSortOptions(
      getSortOptionsfromMetadata(
        translation,
        attributeMetadata?.sortable,
        storeCtx?.config?.displayOutOfStock,
        storeCtx?.config?.currentCategoryUrlPath
      )
    );
  }, [storeCtx, translation, attributeMetadata]);

  useEffect(() => {
    getSortOptions();
  }, [getSortOptions]);

  const defaultSortOption = storeCtx.config?.currentCategoryUrlPath
    ? 'position'
    : 'relevance';
  const sortFromUrl = getValueFromUrl('product_list_order');
  const directionFromUrl = getValueFromUrl('product_list_direction');
  const sortByDefault = sortFromUrl ? sortFromUrl : defaultSortOption;
  const [sortBy, setSortBy] = useState<string>(sortByDefault);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>(
    (directionFromUrl === 'ASC' || directionFromUrl === 'DESC') ? directionFromUrl : 'ASC'
  );
  const onSortChange = (sortOption: string) => {
    console.log(sortOption)
    setSortBy(sortOption);
    searchCtx.setSort(generateGQLSortInput(sortOption, sortOrder));
    handleUrlSort(sortOption, sortOrder);
  };
  const onSortOrderChange = (sortOrder: 'ASC' | 'DESC') => {
    setSortOrder(sortOrder);
    searchCtx.setSort(generateGQLSortInput(sortBy, sortOrder));
    handleUrlSort(sortBy, sortOrder);
  }

  const getResults = (totalCount: number) => {
    const resultsTranslation = translation.CategoryFilters.products;
    const results = resultsTranslation.replace('{totalCount}', `${totalCount}`);
    return results;
  };

  return (
    <div className="products-header flex flex-col lg:max-w-full ml-auto w-full py-4">
      <div className={`flex gap-x-2.5 mb-[1px] justify-between`}>
        {screenSize.mobile
          ? totalCount > 0 && (
              <div className="pb-4">
                <FilterButton
                  displayFilter={() => setShowMobileFacet(!showMobileFacet)}
                  type="mobile"
                />
              </div>
            )
          : storeCtx.config.displaySearchBox && (
              <SearchBar
                phrase={searchCtx.phrase}
                onKeyPress={(e: any) => {
                  if (e.key === 'Enter') {
                    searchCtx.setPhrase(e?.target?.value);
                  }
                }}
                onClear={() => searchCtx.setPhrase('')}
                placeholder={translation.SearchBar.placeholder}
              />
            )}
        {totalCount > 0 && (
          <>
            <div className="product-header-left">
              <FilterButton
                displayFilter={displayFilter}
                type="desktop"
                title={`Filtres`}
              />
            </div>
            <div className="product-header-right">
              {!loading && (
                <span className="text-primary text-sm">
                  {getResults(totalCount)}
                </span>
              )}
              <SortDropdown
                sortOptions={sortOptions}
                onSortOrderChange={onSortOrderChange}
                value={sortBy}
                order={sortOrder}
                onChange={onSortChange}
              />
            </div>
          </>
        )}
      </div>
      {screenSize.mobile && showMobileFacet && <Facets searchFacets={facets} />}
    </div>
  );
};
