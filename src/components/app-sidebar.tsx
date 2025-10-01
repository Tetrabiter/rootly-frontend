import { SearchForm } from "@/components/search-form";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FilesUploader } from "./FilesUploader";
import { useState } from "react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "История",
      url: "#",
      items: [
        {
          title: "plan_test-k801vip_tflog",
          url: "#",
        },
        {
          title: "apply_test-k801vip_tflog",
          url: "#",
          isActive: true,
        },
        {
          title: "apply_tflog",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sidebar
      {...props}
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "w-80" : "w-20"
      }`}
    >
      <SidebarHeader>
        <div className="pl-2 flex justify-between items-center">
          <h1
            className={`font-extrabold transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            ROOTLY
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 border-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>
        </div>
        <div
          className={`transition-all duration-300 ${
            isOpen
              ? "opacity-100 max-h-12"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <SearchForm />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="transition-all duration-300"
                    >
                      <a
                        href={item.url}
                        className={`flex items-center ${
                          isOpen ? "px-3" : "px-2 justify-center"
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ${
                            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                          } truncate`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div
          className={`transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <FilesUploader />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
