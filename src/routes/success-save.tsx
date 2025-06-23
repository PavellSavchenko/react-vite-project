import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/success-save')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <h1 className="text-lg font-bold m-5">User successfully saved</h1>
    </>
}
