import type {AddressData, AgreementData, PersonalData} from "./multi-step-form.types.ts";

export type MultiStepFormData = {
    personal: Partial<PersonalData>
    address: Partial<AddressData>
    agreement: Partial<AgreementData>
}

export type User = {
    id: number;
    createdAt: string;

    name: string;
    surname: string;
    email: string;
    phone: string;

    country: string;
    city: string;
    street: string;
    house: string;
    zip: string;

    accepted: boolean;
}