import {z} from "zod"
import {type StepControl, useFormStore} from "../../store/multi-step-form-store.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../../../components/ui/form.tsx";
import {Input} from "../../../../components/ui/input.tsx";
import {useEffect} from "react";

const schema = z.object({
    country: z.string().min(3, "Enter Country name").max(30, "Max length is 30 characters"),
    city: z.string().min(3, "Enter City").max(30, "Max length is 30 characters"),
    street: z.string().min(3, "Enter Street name").max(30, "Max length is 30 characters"),
    house: z.string().min(1, "Enter house number").max(5, "Max length is 5 characters"),
    zip: z.string().regex(/^\d{5,6}$/, 'Invalid postal code'),
})

type FormValues = z.infer<typeof schema>


export function Step2({onReady}: { onReady: (control: StepControl<FormValues>) => void }) {
    const {data} = useFormStore()
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: data.address,
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
                    name="country"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Poland" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Warsaw" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="street"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input placeholder="Pilsudskiego" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="house"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>House number</FormLabel>
                            <FormControl>
                                <Input placeholder="10A" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="zip"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Postal code</FormLabel>
                            <FormControl>
                                <Input placeholder="220000" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}