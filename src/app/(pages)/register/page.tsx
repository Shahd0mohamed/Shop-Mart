'use client'

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Please confirm your password"),
    phone: z.string().min(10, "Phone number is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (res.ok && result.token) {

        localStorage.setItem("JWT", result.token)

        toast.success("Successfully registered!")
        router.push("/login")  
      } else {
        console.log(result)
        toast.error(result.message || "Failed to register")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return <>

    <Card className="w-full sm:max-w-md mt-5">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          {["name", "email", "password", "rePassword", "phone"].map((field) => (
            <Controller
              key={field}
              name={field as any}
              control={form.control}
              render={({ field: f, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-3">
                  <FieldLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FieldLabel>
                  <Input
                    {...f}
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ))}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="register-form"
          disabled={isLoading}
          className=" w-full rounded-xl hover:bg-gray-950"
        >
          {isLoading && <Loader2 className="animate-spin mr-2 " />}
          Register
        </Button>
      </CardFooter>
    </Card>
      </>
  
}
