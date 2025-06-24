import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {Loader2Icon} from "lucide-react";
import {MultiStepFormHeader} from "./multi-step-form-header/multi-step-form-header.tsx";
import {Step1} from "./steps/step1.tsx";
import {Step2} from "./steps/step2.tsx";
import {Step3} from "./steps/step3.tsx";
import {MultiStepFormFooter} from "./multi-step-form-footer/multi-step-form-footer.tsx";
import styles from "./multi-step-form.module.css"
import {useMultiStepFormStore} from "../../stores/multi-step-form-store/multi-step-form-store.ts";
import type {
    FormStep1Values,
    FormStep2Values,
    FormStep3Values,
    StepControl,
    StepDataMap,
    StepKey
} from "../../types/multi-step-form.types.ts";
import {useCreateUser} from "./hooks/useCreateUser.ts";

export function MultiStepForm() {
    const {step, stepLength, setStep, updateStepData, reset, data} = useMultiStepFormStore()
    const [control, setControl] = useState<StepControl<StepDataMap[StepKey]> | null>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { mutate } = useCreateUser()

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
        console.log(data)
        mutate(data, {
            onSuccess: async (res) => {
                console.log("success")
                console.log(res)
                reset()
                await navigate({
                    to: '/success-save',
                })
            }
        })
        setLoading(false)
    }


    return (
        <div className={styles.multiStepFormContainer}>
            {loading && <Loader2Icon className="animate-spin"></Loader2Icon>}

            <MultiStepFormHeader step={step} total={stepLength}/>
            <div className={styles.multiStepFormContent}>
                {step === 1 && <Step1 onReady={setControl as (c: StepControl<FormStep1Values>) => void}/>}
                {step === 2 && <Step2 onReady={setControl as (c: StepControl<FormStep2Values>) => void}/>}
                {step === 3 && <Step3 onReady={setControl as (c: StepControl<FormStep3Values>) => void}/>}
            </div>
            <MultiStepFormFooter onBack={handlePrevClick} onNext={handleNextClick} onSave={handleSaveClick}
                                 disableNext={!control?.isValid || loading} isLastStep={step === stepLength}
            />
        </div>
    )
}