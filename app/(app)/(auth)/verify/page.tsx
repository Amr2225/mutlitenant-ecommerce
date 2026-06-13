import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";
import { APIError } from "payload";

interface SearchParams {
  token: string;
}
export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { token } = await searchParams;

  if (!token) return <div>Verify you email</div>;

  try {
    await caller.auth.verify({ token });
  } catch (error) {
    if (error instanceof APIError) {
      console.log("Verification error:", error.message);
    }
    redirect("/?error=verification-failed");
  }

  redirect("/sign-in");
}
