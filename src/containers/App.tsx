/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import Loading from 'src/components/Loading';
import Shimmer from 'src/components/Shimmer';

import { CategoryFilters } from '../components/CategoryFilters';
import { SelectedFilters } from '../components/Facets';
import {
  useProducts,
  useSearch,
  useSensor,
  useStore,
  useTranslation,
} from '../context';
import { ProductsContainer } from './ProductsContainer';
import { ProductsHeader } from './ProductsHeader';

export const App: FunctionComponent = () => {
  const searchCtx = useSearch();
  const productsCtx = useProducts();
  const { screenSize } = useSensor();
  const translation = useTranslation();
  const { displayMode } = useStore().config;
  const [showFilters, setShowFilters] = useState(false);

  const loadingLabel = translation.Loading.title;

  let title = productsCtx.categoryName || '';
  if (productsCtx.variables.phrase) {
    const text = translation.CategoryFilters.results;
    title = text.replace('{phrase}', `"${productsCtx.variables.phrase ?? ''}"`);
  }
  const getResults = (totalCount: number) => {
    const resultsTranslation = translation.CategoryFilters.products;
    const results = resultsTranslation.replace('{totalCount}', `${totalCount}`);
    return results;
  };

  return (
    <>
      {!(displayMode === 'PAGE') &&
        (!screenSize.mobile && showFilters && productsCtx.facets.length > 0 ? (
          <div className="ds-widgets bg-body py-2">
            <div className="flex">
              <div
                className={`ds-widgets_results flex flex-col items-center w-full h-full`}
              >
                <SelectedFilters />

                <div className="results-facets-container">
                  <div className="results">
                    <ProductsHeader
                      loading={productsCtx.loading}
                      facets={productsCtx.facets}
                      displayFilter={() => setShowFilters(!showFilters)}
                      totalCount={productsCtx.totalCount}
                      screenSize={screenSize}
                    />
                    <ProductsContainer showFilters={showFilters} />
                  </div>
                  <div className="facets">
                    <CategoryFilters
                      pageLoading={productsCtx.pageLoading}
                      facets={productsCtx.facets}
                      categoryName={productsCtx.categoryName ?? ''}
                      phrase={productsCtx.variables.phrase ?? ''}
                      filterCount={searchCtx.filterCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ds-widgets bg-body py-2">
            <div className="flex flex-col">
              <div className="flex flex-col items-center w-full h-full">
                <div className="justify-start w-full h-full">
                  <div class="hidden sm:flex ds-widgets-_actions relative max-w-[21rem] w-full h-full px-2 flex-col overflow-y-auto">
                    <div className="ds-widgets_actions_header flex justify-between items-center mb-md">
                      {title && <span> {title}</span>}
                      {!productsCtx.loading && (
                        <span className="text-primary text-sm">
                          {getResults(productsCtx.totalCount)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ds-widgets_results flex flex-col items-center w-full h-full">
                {productsCtx.loading ? (
                  screenSize.mobile ? (
                    <Loading label={loadingLabel} />
                  ) : (
                    <Shimmer />
                  )
                ) : (
                  <>
                    <div className="flex w-full h-full">
                      <ProductsHeader
                        loading={productsCtx.loading}
                        displayFilter={() => setShowFilters(!showFilters)}
                        facets={productsCtx.facets}
                        totalCount={productsCtx.totalCount}
                        screenSize={screenSize}
                      />
                    </div>
                    <SelectedFilters />
                    <ProductsContainer
                      showFilters={showFilters && productsCtx.facets.length > 0}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default App;
