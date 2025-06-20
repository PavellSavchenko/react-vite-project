import { z } from "zod"
import {useFormStore} from "../../store/multi-step-form-store.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../../../components/ui/form.tsx";
import {Input} from "../../../../components/ui/input.tsx";
import {useEffect} from "react";

const schema = z.object({
    country: z.string().min(3, "Enter Country name"),
    city: z.string().min(3, "Enter City"),
    street: z.string().min(3, "Enter Street name"),
    house: z.string().min(1, "Enter house number"),
    postalCode: z.string().min(6, "Enter Postal code"),
})

type FormValues = z.infer<typeof schema>


export function Step2() {
    const { data, updateStepData} = useFormStore()
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: data.address,
    })
    useEffect(() => {
        const subscription = form.watch((values) => {
            const parsed = schema.safeParse(values)

            if (parsed.success) {
                updateStepData('address', {...parsed.data, isValid: true})
            } else {
                updateStepData('address', {isValid: false})
            }
        })
        return () => subscription.unsubscribe()
    }, [form, form.watch, updateStepData])
    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Страна</FormLabel>
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
                    render={({ field }) => (
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
                    render={({ field }) => (
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
                    render={({ field }) => (
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
                    name="postalCode"
                    render={({ field }) => (
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