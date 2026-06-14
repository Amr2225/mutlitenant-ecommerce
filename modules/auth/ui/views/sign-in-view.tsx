"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchemaType, loginSchema } from "@/modules/auth/schemas";
import { cn } from "@/lib/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { useTRPC } from "@/trpc/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignInView = () => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const router = useRouter();

  const login = useMutation(trpc.auth.login.mutationOptions());

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);

    setError(null);
    login.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
      onError: (error) => {
        if (error instanceof TRPCClientError) {
          setError(error.message);
        }
      },
    });
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5'>
      <div className='bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 p-4 lg:p-16'>
          <div className='flex items-center justify-between mb-8'>
            <Link href='/'>
              <span className={cn("text-2xl font-semibold", poppins.className)}>FunRoad</span>
            </Link>

            <Button
              asChild
              variant={"ghost"}
              size={"sm"}
              className='text-base border-none underline'
            >
              <Link prefetch href='/sign-up'>
                Sign Up
              </Link>
            </Button>
          </div>

          <h1 className='text-4xl font-medium'>Welcom back to FunRoad</h1>

          {error && (
            <div className='border border-red-600 bg-red-400/40 p-4 py-3 space-y-2 rounded-sm'>
              <div className='flex gap-2 items-center justify-start'>
                <AlertTriangleIcon className='size-4 text-red-500' />
                <h1 className='font-bold text-red-500'>Error Occured</h1>
              </div>

              <p>{error}</p>
            </div>
          )}

          <Controller
            control={form.control}
            name='email'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-base'>Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter your email'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='password'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-base'>Password</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder='Enter your password'
                  type='password'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            className='bg-black text-white hover:bg-pink-400 hover:text-primary'
            size={"lg"}
            variant={"elevated"}
            type='submit'
            disabled={login.isPending}
          >
            {login.isPending ? <Loader2Icon className='animate-spin' /> : "Login"}
          </Button>
        </form>
      </div>
      <div
        className='h-screen w-full lg:col-span-2 hidden lg:block'
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
