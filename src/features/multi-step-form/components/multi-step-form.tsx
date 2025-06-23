import {MultiStepFormHeader} from "./multi-step-form-header.tsx";
import {MultiStepFormFooter} from "./multi-step-form-footer.tsx";
import styles from "./multi-step-form.module.css"
import {type StepControl, type StepDataMap, type StepKey, useFormStore} from "../store/multi-step-form-store.ts";
import {Step2} from "./steps/step2.tsx";
import {Step1} from "./steps/step1.tsx";
import {Step3} from "./steps/step3.tsx";
import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {Loader2Icon} from "lucide-react";
import {submitForm} from "../api/submitForm.ts";

export function MultiStepForm() {
    const {step, stepLength, setStep, updateStepData, reset, data} = useFormStore()
    const [control, setControl] = useState<StepControl<StepDataMap[StepKey]> | null>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function handlePrevClick() {
        if (step > 1) setStep(step - 1)
    }

    function handleNextClick() {
        if (!control || !control.isValid) return

        const values = control.getValues()
        if (step === 1) updateStepData("personal", {...values, isValid: true})
        if (step === 2) updateStepData("address", {...values, isValid: true})
        if (step === 3) updateStepData("agreement", {...values, isValid: true})

        if (step < stepLength) setStep(step + 1)
    }

    async function handleSaveClick() {
        setLoading(true)
        data.agreement.accepted = true
        try {
            const res = await submitForm(data)
            console.log('Success:', res)
            reset()
            await navigate({to: '/success-save'})
        } catch(err){
            console.error(err)
        }
        setLoading(false)
    }


    return (
        <div className={styles.multiStepFormContainer}>
            {loading && <Loader2Icon className="animate-spin"></Loader2Icon>}

            <MultiStepFormHeader step={step} total={stepLength}/>
            <div className={styles.multiStepFormContent}>
                {step === 1 && <Step1 onReady={setControl}/>}
                {step === 2 && <Step2 onReady={setControl}/>}
                {step === 3 && <Step3 onReady={setControl}/>}
            </div>
            <MultiStepFormFooter onBack={handlePrevClick} onNext={handleNextClick} onSave={handleSaveClick}
                                 disableNext={!control?.isValid || loading} isLastStep={step === stepLength}
            />
        </div>
    )
}