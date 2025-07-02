import {Loader2Icon} from "lucide-react";
import {MultiStepFormHeader} from "./multi-step-form-header/multi-step-form-header.tsx";
import {Step1} from "./steps/step1.tsx";
import {Step2} from "./steps/step2.tsx";
import {Step3} from "./steps/step3.tsx";
import {MultiStepFormFooter} from "./multi-step-form-footer/multi-step-form-footer.tsx";
import styles from "./multi-step-form.module.css"
import type {
    FormStep1Values,
    FormStep2Values,
    FormStep3Values,
    StepControl,

} from "../../types/multi-step-form.types.ts";
import {useMultiStepFormLogic} from "./hooks/useMultiStepForm.ts";

export function MultiStepForm() {
    const {
        step,
        stepLength,
        loading,
        control,
        setControl,
        handlePrevClick,
        handleNextClick,
        handleSaveClick,
    } = useMultiStepFormLogic();


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