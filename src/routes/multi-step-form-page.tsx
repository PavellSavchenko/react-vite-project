import {createFileRoute} from "@tanstack/react-router";
import {MultiStepForm} from "../pages/multi-step-form/multi-step-form-page.tsx";


export const Route = createFileRoute('/multi-step-form-page')({
    component: MultiStepFormPage,
})


function MultiStepFormPage() {
    return <MultiStepForm/>
}