import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
    slug: "categoreis",
    access: {
        create: () => false,
        update: () => false,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        }
    ]
}