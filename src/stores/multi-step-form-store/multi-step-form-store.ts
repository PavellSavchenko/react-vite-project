import {create} from "zustand/index";
import {persist} from "zustand/middleware";
import type {MultiStepFormData} from "../../types/multi-step-form-store.types.ts";

type MultiStepFormState = {
    step: number,
    stepLength: number,
    data: MultiStepFormData,
    setStep: (step: number) => void
    updateStepData: <K extends keyof MultiStepFormState['data']>(
        key: K,
        newData: Partial<MultiStepFormState['data'][K]>
    ) => void
    reset: () => void
}

export const useMultiStepFormStore = create<MultiStepFormState>()(
    persist(
        (set) => ({
            step: 1,
            stepLength: 3,
            data: {
                personal: {},
                address: {},
                agreement: {},
            },
            setStep: (step) => set({step}),
            updateStepData: (key, newData) =>
                set((state) => ({
                    data: {
                        ...state.data,
                        [key]: {
                            ...state.data[key],
                            ...newData,
                        },
                    },
                })),
            reset: () =>
                set({
                    step: 1,
                    data: {personal: {}, address: {}, agreement: {}},
                }),
        }),
        {
            name: 'form-storage',
        }
    )
)
