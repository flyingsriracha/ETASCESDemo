import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChevronRight,
  MoreHorizontal,
  Folder,
  Forward,
  Trash2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const data = {
  navMain: [
    {
      title: "CES Demonstrator",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Welcome",
          url: "welcome",
        },
        {
          title: "Calibration Agent",
          url: "calibration",
        },
        {
          title: "SW Dev Agent",
          url: "swdev",
        },
      ],
    },
    {
      title: "Workflows",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Calibration Suite",
          url: "calibration-suite",
        },
        {
          title: "Virtual Calibration",
          url: "virtual-calibration",
        },
        {
          title: "Data Logging",
          url: "data-logging",
        },
      ],
    },
    {
      title: "Solutions",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "AURA Orchestrator",
          url: "aura-orchestrator",
        },
        {
          title: "RTA Car Cloud",
          url: "rta-car-cloud",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Component Library",
          url: "component-library",
        },
        {
          title: "External Landing",
          url: "external-landing",
        },
      ],
    },
  ],
}

export function AppSidebar({ 
  onNavigate,
  ...props 
}: React.ComponentProps<typeof Sidebar> & { onNavigate?: (screen: string) => void }) {
  return (
    <Sidebar collapsible="icon" {...props} className="top-[3.5rem] h-[calc(100vh-3.5rem)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('welcome'); }}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-etas-blue text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ETAS CES</span>
                  <span className="truncate text-xs">Demonstrator</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a 
                              href="#" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                onNavigate?.(subItem.url); 
                              }}
                            >
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground">
                 <Frame className="size-4 text-sidebar-foreground" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                 <span className="truncate text-xs">v1.0.0</span>
                 <span className="truncate text-xs text-muted-foreground">Production Ready</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

