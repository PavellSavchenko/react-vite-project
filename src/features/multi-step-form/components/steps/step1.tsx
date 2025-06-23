import {z} from "zod"
import {useForm} from "react-hook-form";
import {type StepControl, useFormStore} from "../../store/multi-step-form-store.ts";
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../../../components/ui/form.tsx";
import {Input} from "../../../../components/ui/input.tsx";
import {useEffect} from "react";

const schema = z.object({
    firstName: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters"),
    lastName: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters"),
    email: z.string().email("invalid email"),
    phone: z.string().length(11, "Invalid phone number length").max(11, ""),
})

type FormValues = z.infer<typeof schema>

export function Step1({onReady}: { onReady: (control: StepControl<FormValues>) => void }) {
    const {data} = useFormStore()
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: data.personal,
    })

    useEffect(() => {
        onReady({
            isValid: form.formState.isValid,
            getValues: () => form.getValues(),
        })
    }, [form, form.formState.isValid, onReady])

    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+48..." {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}