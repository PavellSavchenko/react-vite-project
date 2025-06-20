import { z } from "zod"
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormStore} from "../../store/multi-step-form-store.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "../../../../components/ui/form.tsx";
import {Checkbox} from "../../../../components/ui/checkbox.tsx"
import {useEffect} from "react";

const schema = z.object({
    accepted: z.boolean(),
})
type FormValues = z.infer<typeof schema>

export function Step3() {
    const { data, updateStepData } = useFormStore()

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: data.agreement,
    })
    useEffect(() => {
        const subscription = form.watch((values) => {
            const parsed = schema.safeParse(values)

            if (parsed.success) {
                updateStepData('agreement', {...parsed.data, isValid: true})
            } else {
                updateStepData('agreement', {isValid: false})
            }
        })
        return () => subscription.unsubscribe()
    }, [form, form.watch, updateStepData])
    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="accepted"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="accepted"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <label htmlFor="accepted" className="text-sm leading-none">
                                        Я принимаю{" "}
                                        <a
                                            href="/terms"
                                            className="underline text-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            правила и условия
                                        </a>{" "}
                                        и{" "}
                                        <a
                                            href="/privacy"
                                            className="underline text-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            политику конфиденциальности
                                        </a>
                                    </label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}