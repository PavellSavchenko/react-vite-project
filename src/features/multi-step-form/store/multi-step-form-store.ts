import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type PersonalData = {
    name: string
    surname: string
    email: string
    phone: string
    isValid: boolean
}
export type StepControl = {
    isValid: boolean
    getValues: () => any
}
type AddressData = {
    country: string
    city: string
    street: string
    house: string
    zip: string
    isValid: boolean
}

type AgreementData = {
    accepted: boolean
    isValid: boolean
}

type FormState = {
    step: number,
    stepLength: number,
    data: {
        personal: Partial<PersonalData>
        address: Partial<AddressData>
        agreement: Partial<AgreementData>
    }
    setStep: (step: number) => void
    updateStepData: <K extends keyof FormState['data']>(
        key: K,
        newData: Partial<FormState['data'][K]>
    ) => void
    reset: () => void
}

export const useFormStore = create<FormState>()(
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
