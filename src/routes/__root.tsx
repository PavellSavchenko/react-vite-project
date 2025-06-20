import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {NavigationMenuItem, NavigationMenuLink} from "@radix-ui/react-navigation-menu";
import {NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle} from "../components/ui/navigation-menu.tsx";
export const Route = createRootRoute({
    component: () => (
        <>
            <div className=" flex ">
                <NavigationMenu>
                    <NavigationMenuList className="gap-0">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/" className="[&.active]:font-bold bg-blue-200 rounded-none">
                                    Home
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/about" className="[&.active]:font-bold bg-blue-200 rounded-none"
                                >
                                    About
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/multi-step-form-page" className="[&.active]:font-bold bg-blue-200 rounded-none"
                                >
                                    Multi Step Form
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <hr />
            <Outlet />
        </>
    ),
})
