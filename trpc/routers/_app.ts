import { createTRPCRouter, baseProcedure } from '../init';
import { categoriesRouter } from '@/modules/categories/server/router';

export const appRouter = createTRPCRouter({
    categories: categoriesRouter,

    test: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.find({
            collection: "categories",
            depth: 1,
            where: { parent: { exists: false } },
            pagination: false,
            sort: "name",
        })
        return { data }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;