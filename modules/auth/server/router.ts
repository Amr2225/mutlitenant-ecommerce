import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers"
import z from "zod"
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers })

        return session
    }),
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const { email, password, username } = input;

            const { totalDocs: isExistingUser } = await db.find({
                collection: 'users',
                limit: 1,
                where: {
                    or: [
                        {
                            email: {
                                equals: email
                            },
                            username: {
                                equals: username
                            }
                        }
                    ]
                }
            })

            console.log("Existing User: ", isExistingUser);
            if (isExistingUser) throw new TRPCError({
                code: "CONFLICT",
                cause: "Email or username is already in use",
                message: "Change your username or email to continue"
            })

            await db.create({
                collection: "users",
                data: {
                    email,
                    username,
                    password
                }
            })

        }),

    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const { email, password } = input;
            const data = await db.login({
                collection: "users",
                data: {
                    email,
                    password
                }
            })

            if (!data.token) throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Invliad Credintials",
            })

            const cookies = await getCookies()
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/",
                // sameSite: "none",
                // domain: ""
            });


            return data;
        }),


    verify: baseProcedure.input(z.object({ token: z.string() })).mutation(async ({ ctx: { db }, input }) => {
        const { token } = input;

        return await db.verifyEmail({ collection: "users", token })
    }),

    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE);
    })
})