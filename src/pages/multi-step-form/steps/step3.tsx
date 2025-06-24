import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "../../../components/ui/form.tsx";
import {Checkbox} from "../../../components/ui/checkbox.tsx";
import {useMultiStepFormStore} from "../../../stores/multi-step-form-store/multi-step-form-store.ts";
import {type FormStep3Values, step3Schema, type StepControl} from "../../../types/multi-step-form.types.ts";


export function Step3({onReady}: { onReady: (control: StepControl<FormStep3Values>) => void }) {
    const {data} = useMultiStepFormStore()

    const form = useForm<FormStep3Values>({
        resolver: zodResolver(step3Schema),
        mode: "onChange",
        defaultValues: data.agreement,
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
                    name="accepted"
                    render={({field}) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="accepted"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <label htmlFor="accepted" className="text-sm leading-none">
                                        I accept{" "}
                                        <a
                                            href="https://policies.google.com/privacy"
                                            className="underline text-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            private policy
                                        </a>
                                    </label>
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-600 "/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}