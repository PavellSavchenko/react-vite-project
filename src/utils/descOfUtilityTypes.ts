/*
/////////////////////////////////////////////////////////////////////////
//conditional types example
type isString<T> = T extends string ? T : never;
type newString = isString<string>
const a: newString = ""
console.log(a)

/////////////////////////////////////////////////////////////////////////
// infer example
type User = {
    name: string,
    id: number
}
type extractUserId<T> = T extends {id: infer R} ? R : never
type userIdType = extractUserId<User>
const userId: userIdType = 1
console.log(userId)

/////////////////////////////////////////////////////////////////////////
// example for satisfies
type PersonName = 'Jack' | 'John' | 'Bob'
type PersonInfo = {
    id: number,
    age: number
}
type Person = {
    userInfo: PersonInfo | PersonName
    userAdditionalInfo: PersonInfo | PersonName
}
const person = {
    userInfo: "Bob",
    userAdditionalInfo: {
        id: 1,
        age: 25
    }
} satisfies Person
console.log(person.userInfo.toUpperCase()) // without sutisfies will be error
/////////////////////////////////////////////////////////////////////////

// example of Record type. Create type from two other types, where keys it is first arg, values second
type UserRoles = "admin" | "user" | "guest"
type UserActions = "create" | "update" | "delete" | "read"
type RolePermissions = Record<UserRoles, UserActions[]>

const roles: RolePermissions = {
    admin: ["create", "update", "delete"],
    user: ["create", "update"],
    guest: ["read"]
}

console.log(roles)

///////////////////////////////////////////////////////////////////////////
// example of Pick. Get only needed keys from the target type
type mainPersonInfo = Pick<Person, "userInfo">

const basicPersonInfo: mainPersonInfo = {
    userInfo: "Bob"
}
console.log(basicPersonInfo)

///////////////////////////////////////////////////////////////////////////
// example of Omit. DELETE not needed keys from the target type
type additionalPersonInfo = Omit<Person, "userInfo">

const nonImportantPersonInfo: additionalPersonInfo = {
    userAdditionalInfo: "Bob"
}
console.log(nonImportantPersonInfo)

///////////////////////////////////////////////////////////////////////////

// Exclude. needed to delete some union types from other union type

type responseStatus = "success" | "error" | null | undefined
type successfulResponse = Exclude<responseStatus, null | undefined | "error">
const response: successfulResponse = "success"
console.log(response)

///////////////////////////////////////////////////////////////////////////

// Extract. needed to get all union types from other Union type

type otherSuccessfulResponse = Extract<responseStatus, "success">
const otherResponse: otherSuccessfulResponse = "success"
console.log(otherResponse)

///////////////////////////////////////////////////////////////////////////
// RETURN TYPE. Needed to create type for value which returned from function
function createUser(name: string, age: number) {
    return {
        name,
        age,
        createdAt: new Date(),
    };
}

type UserFromFunction = ReturnType<typeof createUser>;
const userFromFunction: UserFromFunction ={
    name: "",
    age: 1,
    createdAt: new Date(),
}
console.log(userFromFunction)

*/








