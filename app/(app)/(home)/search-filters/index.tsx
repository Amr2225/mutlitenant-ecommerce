import { Categories } from "./categories";
import { SearchInput } from "./search-inputs";
import { CustomCategory } from "../../../../modules/categories/types";

interface SerachFiltersProps {
  data: CustomCategory[];
}

export const SearchFilters = async ({ data }: SerachFiltersProps) => {
  // const trpc = useTRPC();
  // const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  // const data = await caller.categories.getMany();

  return (
    <div
      className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput data={data} />
      <div className='hidden lg:block'>
        <Categories data={data} />
      </div>
    </div>
  );
};
