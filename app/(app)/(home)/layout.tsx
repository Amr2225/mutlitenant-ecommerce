import { Navbar } from "@/components/navbar";
import React from "react";
import Footer from "@/components/footer";
import { SearchFilters } from "./search-filters";

import { caller } from "@/trpc/server";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  // const queryClient = getQueryClient();
  // void prefetchCategories();
  const data = await caller.categories.getMany();

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <SearchFilters data={data} />
      {/* <HydrateClient>
        <Suspense fallback={<div>Loading...</div>}>
        </Suspense>
      </HydrateClient> */}
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
}
