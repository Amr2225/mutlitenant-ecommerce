import { Category } from "@/payload-types";

export type CustommCategory = Category & {
    subcategories: Category[]
}