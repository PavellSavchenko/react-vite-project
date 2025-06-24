import {z} from "zod";

export type PersonalData = {
    name: string
    surname: string
    email: string
    phone: string
    isValid: boolean
}

export type StepControl<T> = {
    isValid: boolean
    getValues: () => T
}

export type StepKey = 'personal' | 'address' | 'agreement'

export type StepDataMap = {
    personal: PersonalData
    address: AddressData
    agreement: AgreementData
}

export type AddressData = {
    country: string
    city: string
    street: string
    house: string
    zip: string
    isValid: boolean
}

export type AgreementData = {
    accepted: boolean
    isValid: boolean
}

export const step3Schema = z.object({
    accepted: z.boolean().refine(val => val, {
        message: 'You need to agree with the terms to continue.',
    }),
})

export type FormStep3Values = z.infer<typeof step3Schema>

export const step2Schema = z.object({
    country: z.string().min(3, "Enter Country name").max(30, "Max length is 30 characters"),
    city: z.string().min(3, "Enter City").max(30, "Max length is 30 characters"),
    street: z.string().min(3, "Enter Street name").max(30, "Max length is 30 characters"),
    house: z.string().min(1, "Enter house number").max(5, "Max length is 5 characters"),
    zip: z.string().regex(/^\d{5,6}$/, 'Invalid postal code'),
})

export type FormStep2Values = z.infer<typeof step2Schema>

export const step1schema = z.object({
    name: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters"),
    surname: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters"),
    email: z.string().email("invalid email"),
    phone: z.string().regex(/^\d+$/, 'Should contain only numbers').length(11, "Invalid phone number length").max(11, ""),
})

export type FormStep1Values = z.infer<typeof step1schema>

