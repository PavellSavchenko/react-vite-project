import {BaseApiClient} from './BaseApiClient'
import type {MultiStepFormData, User} from "../../types/multi-step-form-store.types.ts";

export class UserApiClient extends BaseApiClient<User> {
    protected baseUrl = '/api/form'

    createUser(user: MultiStepFormData) {
        return this.post<MultiStepFormData, User>('/', user)
    }
}
