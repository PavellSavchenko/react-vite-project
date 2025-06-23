import {createFileRoute} from "@tanstack/react-router";
import {MultiStepForm} from "../features/multi-step-form/components/multi-step-form.tsx";


export const Route = createFileRoute('/multi-step-form-page')({
    component: MultiStepFormPage,
})


function MultiStepFormPage() {


    return <MultiStepForm/>
}