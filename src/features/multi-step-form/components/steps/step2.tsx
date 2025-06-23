import {type StepControl, useFormStore} from "../../store/multi-step-form-store.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../../../components/ui/form.tsx";
import {Input} from "../../../../components/ui/input.tsx";
import {useEffect} from "react";
import {type FormStep2Values, step2Schema} from "../../types/types.ts";


export function Step2({onReady}: { onReady: (control: StepControl<FormStep2Values>) => void }) {
    const {data} = useFormStore()
    const form = useForm<FormStep2Values>({
        resolver: zodResolver(step2Schema),
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