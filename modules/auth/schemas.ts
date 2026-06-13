import z from 'zod'

const USERNAME_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/
export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(3, "Password should be at least 3 characters"),
    confirmPassword: z.string(),
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(63, "Username must be at less than 63 characters")
        .regex(USERNAME_REGEX, "Username can only contain lower letters, number and hyphens. It must start and end with a letter or number")
        .refine((val) => !val.includes("--"), "Username cannot contain consective hyphens")
        .transform((val) => val.toLowerCase())
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
})
export type RegisterSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})
export type LoginSchemaType = z.infer<typeof loginSchema>