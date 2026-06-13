import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        const url = `${baseUrl}/verify?token=${token}`

        return `Hey ${user.email}, verify your email by clicking here: ${url}`
      },
    },
    forgotPassword: {
      expiration: 1000 * 60 * 5,
      generateEmailHTML: ({ token, user } = {}) => {
        // Use the token provided to allow your user to reset their password
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        const resetPasswordURL = `${baseUrl}/reset-password?token=${token}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Hello from FunRoad! this email you requested to reset your password</h1>
              <p>Hello, ${user.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
  fields: [
    // Email added by default
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    }
  ],
}
