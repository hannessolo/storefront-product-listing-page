/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

import { useTranslation } from '../../context/translation';
import { Facet } from '../../types/interface';
import { Facets } from '../Facets';

interface CategoryFiltersProps {
  pageLoading: boolean;
  facets: Facet[];
  categoryName: string;
  phrase: string;
  filterCount: number;
}

export const CategoryFilters: FunctionComponent<CategoryFiltersProps> = ({
  pageLoading,
  facets,
  categoryName,
  phrase,
}) => {
  const translation = useTranslation();
  let title = categoryName || '';
  if (phrase) {
    const text = translation.CategoryFilters.results;
    title = text.replace('{phrase}', `"${phrase}"`);
  }

  return (
    <div class="sm:flex ds-widgets-_actions relative w-full h-full px-2 flex-col overflow-y-auto">
      <div className="ds-widgets_actions_header flex justify-between items-center mb-md">
        {title && <span> {title}</span>}
      </div>

      {!pageLoading && facets.length > 0 && (
        <>
          <Facets searchFacets={facets} />
        </>
      )}
    </div>
  );
};
