import type {MultiStepFormData} from "../store/multi-step-form-store.ts";

export const submitForm = (formData: MultiStepFormData): Promise<{ ok: boolean }> => {
     return fetch('/api/form', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
     }).then(res => res.json())
}
