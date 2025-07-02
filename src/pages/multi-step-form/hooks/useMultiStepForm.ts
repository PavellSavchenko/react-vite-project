import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {useMultiStepFormStore} from "../../../stores/multi-step-form-store/multi-step-form-store.ts";
import type {StepControl, StepDataMap, StepKey} from "../../../types/multi-step-form.types.ts";
import {useCreateUser} from "./useCreateUser.ts";

export function useMultiStepFormLogic() {
    const { step, stepLength, setStep, updateStepData, reset, data } = useMultiStepFormStore();
    const [control, setControl] = useState<StepControl<StepDataMap[StepKey]> | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { mutate } = useCreateUser();

    function handlePrevClick() {
        if (step > 1) setStep(step - 1);
    }

    function handleNextClick() {
        if (!control || !control.isValid) return;

        const values = control.getValues();
        if (step === 1) updateStepData("personal", { ...values, isValid: true });
        if (step === 2) updateStepData("address", { ...values, isValid: true });
        if (step === 3) updateStepData("agreement", { ...values, isValid: true });

        if (step < stepLength) setStep(step + 1);
    }

    async function handleSaveClick() {
        setLoading(true);
        data.agreement.accepted = true;
        mutate(data, {
            onSuccess: async () => {
                reset();
                await navigate({ to: "/success-save" });
            },
            onSettled: () => setLoading(false),
        });
    }

    return {
        step,
        stepLength,
        loading,
        control,
        setControl,
        data,
        handlePrevClick,
        handleNextClick,
        handleSaveClick,
    };
}
