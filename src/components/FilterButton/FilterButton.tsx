/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';

import { useTranslation } from '../../context/translation';
import FilterIcon from '../../icons/dg_filter.svg';

export interface FilterButtonProps {
  displayFilter: () => void;
  type: string;
  title?: string;
}
export const FilterButton: FunctionComponent<FilterButtonProps> = ({
  displayFilter,
  type,
  title,
}: FilterButtonProps) => {
  const translation = useTranslation();
  return type == 'mobile' ? (
    <div className="ds-sdk-filter-button">
      <button
        className="flex items-center bg-gray-100 ring-black ring-opacity-5 rounded-md p-sm  outline outline-gray-200 hover:outline-gray-800 h-[32px]"
        onClick={displayFilter}
      >
        <FilterIcon className="w-md" />        
        {translation.Filter.title}
      </button>
    </div>
  ) : (
    <div className="ds-sdk-filter-button-desktop h-[32px]">
      <button
        className="group flex justify-center items-center font-normal text-xs text-gray-700 rounded-md hover:cursor-pointer border-none bg-transparent hover:border-none hover:bg-transparent focus:border-none focus:bg-transparent active:border-none active:bg-transparent active:shadow-none h-full w-full px-sm"
        onClick={displayFilter}
      >
        <FilterIcon className="h-md w-md mr-sm stroke-gray-600 m-auto" />        
        {title}
      </button>
    </div>
  );
};
