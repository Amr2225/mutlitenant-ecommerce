import { CustommCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-inputs";

interface SerachFiltersProps {
  data: CustommCategory[];
}

export const SearchFilters = ({ data }: SerachFiltersProps) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
      <SearchInput data={data} />
      <div className='hidden lg:block'>
        <Categories data={data} />
      </div>
    </div>
  );
};
