"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    email: z.email('Invalid email').nonempty('Email is required'),
    password: z.string().nonempty('Password is required')
})

export default function LoginForm() {
    const [isLoading, setIsLoading] = React.useState(false)

    const searchParams = useSearchParams();
    const redirectURL = searchParams.get('erl');
    console.log(searchParams);
    console.log(redirectURL);
    
    


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: redirectURL? redirectURL : '/products',
            redirect: true
        })
        if (response?.ok) {
            router.push('/products')
            toast.success("You 're logined successfully")
        } else {
            toast.error(response?.error!)
        }
        setIsLoading(false)

    }

    return <>


        <Card className="w-full mt-3">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-email">
                                        Email
                                    </FieldLabel>
                                    <Input className="mb-3"
                                        {...field}
                                        type="email"
                                        id="form-rhf-demo-email"
                                        aria-invalid={fieldState.invalid}

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="password"
                                        id="form-rhf-demo-password"
                                        aria-invalid={fieldState.invalid}

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isLoading} type="submit" form="form-rhf-demo">
                        {isLoading && <Loader2 className="animate-spin"/>}
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    </>
}
