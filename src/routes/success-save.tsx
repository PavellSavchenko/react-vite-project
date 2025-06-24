import {createFileRoute, useRouterState} from '@tanstack/react-router'

export const Route = createFileRoute('/success-save')({
    component: RouteComponent,
})

function RouteComponent() {

    const { location } = useRouterState()
    const data = location.state?.user
    return <>
        <h1 className="text-lg font-bold m-5">User successfully saved</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
}
