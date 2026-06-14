import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
    const trpc = useTRPC();
    return useQuery(trpc.auth.session.queryOptions())
}