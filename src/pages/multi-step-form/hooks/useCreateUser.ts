import {useMutation} from '@tanstack/react-query'
import {UserApiClient} from "../../../infrastructure/api/UserApiClient.ts";
import type {MultiStepFormData} from "../../../types/multi-step-form-store.types.ts";

const userApi = new UserApiClient()

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (newUser: MultiStepFormData) => userApi.createUser(newUser),
    })
}
