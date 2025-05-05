import * as React from "react";
import {
  Home,
  ClipboardList,
  Stethoscope,
  Clock,
  PlusCircle,
  List,
  UserPlus,
  Users,
  UserX,
  Edit,
  Calendar,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { usePage } from "@inertiajs/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/Components/ui/sidebar";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

interface MenuItem {
  title: string;
  url: string;
  routeName: string;
  icon: React.ReactNode;
  items?: SubMenuItem[];
  badge?: string;
}

interface SubMenuItem {
  title: string;
  url: string;
  routeName: string;
  icon: React.ReactNode;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    routeName: "admin.dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Contents",
    url: "/admin/contents",
    routeName: "admin.contents.index",
    icon: <ClipboardList className="h-4 w-4" />,
    items: [
      {
        title: "Create Content",
        url: "/admin/contents/create",
        routeName: "admin.contents.create",
        icon: <PlusCircle className="h-4 w-4" />,
      },
      {
        title: "Manage Contents",
        url: "/admin/contents",
        routeName: "admin.contents.index",
        icon: <List className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Doctors",
    url: "/admin/doctors",
    routeName: "admin.doctors.index",
    icon: <Stethoscope className="h-4 w-4" />,
    items: [
      {
        title: "Add Doctor",
        url: "/admin/doctors/create",
        routeName: "admin.doctors.create",
        icon: <UserPlus className="h-4 w-4" />,
      },
      {
        title: "Manage Doctors",
        url: "/admin/doctors",
        routeName: "admin.doctors.index",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Visiting Hours",
    url: "/admin/visiting-hours",
    routeName: "admin.visiting-hours.index",
    icon: <Clock className="h-4 w-4" />,
    items: [
      {
        title: "View Schedule",
        url: "/admin/visiting-hours",
        routeName: "admin.visiting-hours.index",
        icon: <Calendar className="h-4 w-4" />,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { url: currentUrl } = usePage();

  const isActive = (url: string) => {
    return currentUrl === url;
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault(); 
    router.post(route("logout"));
  };

  return (
    <Sidebar
      variant="floating"
      {...props}
      className="border-r bg-background/70 backdrop-blur-lg h-full flex flex-col"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1 rounded-full">
            <Avatar>
              <AvatarImage
                src='/assets/Logo.webp'
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              <AvatarFallback delayMs={200}>
                <img
                  src="/assets/Logo.webp"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="font-bold text-lg">Rumah Sakit</h2>
            <p className="text-xs text-muted-foreground">Muhammadiyah Lamongan</p>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="px-3 py-4 flex-1">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title} className="flex flex-col gap-1">
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.url)}
                  className="justify-start gap-1"
                >
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {item.items && item.items.length > 0 && (
                  <SidebarMenuSub className="ml-3 pl-3 border-l gap-2">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.url)}
                          className="justify-start gap-3"
                        >
                          <Link href={subItem.url}>
                            {subItem.icon}
                            <span>{subItem.title}</span>
                            {subItem.badge && (
                              <Badge variant="outline" className="ml-auto">
                                {subItem.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Account Section */}
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-2 px-2 hover:bg-accent"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback delayMs={200}>
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start overflow-hidden flex-1">
                <span className="font-medium text-sm truncate max-w-full">
                  Admin
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-full">
                  admin@example.com
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" side="top">
            <DropdownMenuItem
              onClick={handleLogout}
              className="w-full cursor-pointer flex items-center text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Sidebar>
  );
}