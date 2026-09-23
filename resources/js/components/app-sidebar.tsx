import { Link } from "@inertiajs/react";
import {
    BookOpen,
    DatabaseBackup,
    FolderGit2,
    LayoutGrid,
    Package,
    Receipt,
    RefreshCw,
    Users,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { backup, converter, dashboard } from "@/routes";
import type { NavItem } from "@/types";
import { inventory } from "@/routes/product";
import { posIndex } from "@/routes/pos";
import { customers } from "@/routes/customer";

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: "Point of Sale",
        href: posIndex(),
        icon: Receipt,
    },
    {
        title: "Customers",
        href: customers(),
        icon: Users,
    },
    {
        title: "Inventory",
        href: inventory(),
        icon: Package,
    },
    {
        title: "Converter",
        href: converter(),
        icon: RefreshCw,
    },
    {
        title: "Backup",
        href: backup(),
        icon: DatabaseBackup,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: FolderGit2,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits#react",
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
