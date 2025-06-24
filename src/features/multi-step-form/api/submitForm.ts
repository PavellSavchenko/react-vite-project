import type {MultiStepFormData} from "../store/multi-step-form-store.ts";
import type {User} from "../types/types.ts";

export const submitForm = (formData: MultiStepFormData): Promise<User> => {
     return fetch('/api/form', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
     }).then(res => res.json())
}
