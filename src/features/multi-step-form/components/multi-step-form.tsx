import {MultiStepFormHeader} from "./multi-step-form-header.tsx";
import {MultiStepFormFooter} from "./multi-step-form-footer.tsx";
import styles from "./multi-step-form.module.css"
import {type StepControl, useFormStore} from "../store/multi-step-form-store.ts";
import {Step2} from "./steps/step2.tsx";
import {Step1} from "./steps/step1.tsx";
import {Step3} from "./steps/step3.tsx";
import {useState} from "react";
export function MultiStepForm() {
    const { step, stepLength, setStep, updateStepData } = useFormStore()
    const [control, setControl] = useState<StepControl | null>(null)

    function handlePrevClick(){
        if (step > 1) setStep(step - 1)
    }
    function handleNextClick(){
        if (!control || !control.isValid) return

        const values = control.getValues()
        if (step === 1) updateStepData("personal", { ...values, isValid: true })
        if (step === 2) updateStepData("address", { ...values, isValid: true })
        if (step === 3) updateStepData("agreement", { ...values, isValid: true })

        if (step < stepLength) setStep(step + 1)
    }


    return (
        <div className={styles.multiStepFormContainer}>
            <MultiStepFormHeader step={step} total={stepLength}/>
            <div className={styles.multiStepFormContent}>
                {step === 1 && <Step1 onReady={setControl}/>}
                {step === 2 && <Step2 onReady={setControl}/>}
                {step === 3 && <Step3 onReady={setControl}/>}
            </div>
            <MultiStepFormFooter onBack={handlePrevClick} onNext={handleNextClick}
                                 disableNext={!control?.isValid}
            />
        </div>
    )
}