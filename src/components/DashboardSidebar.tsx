
import { DashboardMenuItem } from "./ui/DashboardMenuItem";
import { DashboardGroupLabel } from "./ui/DashboardGroupLabel";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Target, History, Database, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

type NavigationItem = {
  title: string;
  icon: LucideIcon;
  path: string;
  description: string;
};

const navigationItems: NavigationItem[] = [
  {
    title: "Overview",
    icon: Home,
    path: "/dashboard",
    description: "Dashboard overview and key metrics"
  },
  {
    title: "Insights",
    icon: BarChart2,
    path: "/dashboard/insights",
    description: "Detailed performance analytics"
  },
  {
    title: "Targets & Search Terms",
    icon: Target,
    path: "/dashboard/targets",
    description: "Campaign targets and search term analysis"
  },
  {
    title: "History",
    icon: History,
    path: "/dashboard/history",
    description: "Historical performance data"
  },
  {
    title: "DSP",
    icon: Database,
    path: "/dashboard/dsp",
    description: "Demand-side platform management"
  },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <nav aria-label="Main Navigation">
          <SidebarGroup>
            <DashboardGroupLabel label="Analytics" />
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <DashboardMenuItem
                      key={item.title}
                      title={item.title}
                      icon={<Icon className="w-4 h-4" aria-hidden="true" />}
                      path={item.path}
                      description={item.description}
                      aria-current={isActive ? "page" : false}
                      className={`transition-colors duration-200 ${isActive ? 'bg-primary/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    />
                  );
                })}
                <DashboardMenuItem
                  key="settings"
                  title="Settings"
                  icon={<Settings className="w-4 h-4" aria-hidden="true" />}
                  path="/dashboard/settings"
                  description="Account and application settings"
                  aria-current={location.pathname === "/dashboard/settings" ? "page" : false}
                  className={`transition-colors duration-200 ${location.pathname === "/dashboard/settings" ? 'bg-primary/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
