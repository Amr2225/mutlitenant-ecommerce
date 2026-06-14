"use client";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../../../../modules/categories/types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/modules/auth/hooks/useSession";
import Link from "next/link";

interface Props {
  disabled?: boolean;
  data: CustomCategory[];
}
export const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const session = useSession();

  return (
    <div className='flex items-center gap-2 w-full'>
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className='relative w-full'>
        <SearchIcon className='size-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500' />
        <Input className='pl-8' placeholder='Search Products' disabled={disabled} />
      </div>
      <Button
        variant='elevated'
        className='size-12 shrink-0 flex lg:hidden'
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon className='' />
      </Button>

      {/* TODO: Add Libaray button */}
      {session.data?.user && (
        <Button variant={"elevated"} asChild>
          <Link href={"/library"}>
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};
