import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Tickets, Webhook, Radio, Database, HeartPulse, BadgeInfo, Activity, Server, Users, Egg, Settings, BookOpen, Bookmark, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid, group: 'main' },
    { title: 'Settings', href: '/settings', icon: Settings, group: 'main' },

    { title: 'Eggs', href: '/eggs', icon: Egg, group: 'servers' },
    { title: 'Nodes', href: '/nodes', icon: Activity, group: 'servers' },
    { title: 'Servers', href: '/servers', icon: Server, group: 'servers' },

    { title: 'Roles', href: '/roles', icon: BadgeInfo, group: 'users' },
    { title: 'Users', href: '/users', icon: Users, group: 'users' },

    { title: 'Health', href: '/health', icon: HeartPulse, group: 'advanced' },
    { title: 'Database Host', href: '/database', icon: Database, group: 'advanced' },
    { title: 'Mounts', href: '/mounts', icon: Radio, group: 'advanced' },
    { title: 'Webhooks', href: '/webhooks', icon: Webhook, group: 'advanced' },

    { title: 'Posts', href: '/posts', icon: Bookmark, group: 'main' },
    { title: 'Tickets', href: '/tickets', icon: Tickets, group: 'main' },
];


const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/cinammon-es/panel',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://cinammon.net/docs/panel',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset"className="bg-black border-r border-pink-500">
            <SidebarHeader className="border-b border-pink-500">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className="flex items-center justify-center gap-2">
                                    <AppLogo />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="pt-6">
                <div className="space-y-2 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:rounded-md [&_a]:px-3 [&_a]:py-2 [&_a]:transition-all [&_a]:hover:bg-pink-500/10 [&_a]:hover:text-pink-400">
                    <NavMain items={mainNavItems} />
                </div>
            </SidebarContent>

            <SidebarFooter className="mt-auto border-t border-pink-500">
                <div className="space-y-2 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:rounded-md [&_a]:px-3 [&_a]:py-2 [&_a]:transition-all [&_a]:hover:bg-pink-500/10 [&_a]:hover:text-pink-400">
                    <NavFooter items={footerNavItems} />
                </div>
                <NavUser /> 
            </SidebarFooter>
        </Sidebar>
    );
}
