import type {MultiStepFormData} from "../store/multi-step-form-store.ts";

export const submitForm = (formData: MultiStepFormData): Promise<{ ok: boolean }> => {
    return new Promise((resolve) => {
        console.log('Start save request.', formData)

        setTimeout(() => {
            console.log('Successfully saved...')
            resolve({ ok: true })
        }, 1000)
    })
}