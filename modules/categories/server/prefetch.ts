import { prefetch, trpc } from "@/trpc/server"

export const prefetchCategories = () => {
    void prefetch(trpc.categories.getMany.queryOptions())
}