import { Category } from "@/payload-types";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx: { db } }) => {
        const data = await db.find({
            collection: "categories",
            depth: 1,
            where: { parent: { exists: false } },
            pagination: false,
            sort: "name",
        });


        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs || []).map((doc) => ({
                ...(doc as Category),
                subcategories: undefined,
            })),
        }));

        return formattedData
    })
})