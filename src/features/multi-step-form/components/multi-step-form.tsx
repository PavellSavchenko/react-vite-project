import {MultiStepFormHeader} from "./multi-step-form-header.tsx";
import {MultiStepFormFooter} from "./multi-step-form-footer.tsx";
import styles from "./multi-step-form.module.css"
import {useFormStore} from "../store/multi-step-form-store.ts";
import {Step2} from "./steps/step2.tsx";
import {Step1} from "./steps/step1.tsx";
import {Step3} from "./steps/step3.tsx";
export function MultiStepForm() {
    const { step, stepLength, setStep } = useFormStore()

    function handlePrevClick(){
        if(step===1){
            return
        }
        setStep(step-1)
    }
    function handleNextClick(){
        if(step===stepLength){
            return
        }
        setStep(step+1)
    }
    return (
        <div className={styles.multiStepFormContainer}>
            <MultiStepFormHeader/>
            <div className={styles.multiStepFormContent}>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
            </div>
            <button onClick={handlePrevClick}>Prev</button>
            <button onClick={handleNextClick}>Next</button>
            <MultiStepFormFooter/>
        </div>
    )
}