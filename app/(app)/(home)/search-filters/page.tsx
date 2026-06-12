import { Categories } from "./categories";
import { SearchInput } from "./search-inputs";

interface SerachFiltersProps {
  data: unknown;
}

export const SearchFilters = ({ data }: SerachFiltersProps) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
      <SearchInput />
      <Categories data={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};
