/*
 * The constant holds the data for the side navigation (usually the main navigation). An navigation item implements
 * the inteface 'SideNavigationItem'.
 *
 * If your project does not require the side navigation, leave the array empty:
 * export const CuiSideNavigationItems: SideNavigationItem[] = [];
 *
 */
import { SideNavigationItem } from "./cui/cui-side-navigation/cui-side-navigation-item.interface";

/**
 * Defines the structure and content of the side navigation items.
 *
 * Each item represents a navigation link or a group of links with nested sub-items.
 */
export const CuiSideNavigationItems: SideNavigationItem[] = [
  {
    label: "Dashboard",
    route: "/",
    icon: "cui-icon-home",
    class: "",
    tooltip: "Home",
    target: "",
    alt: "",
  },
  {
    label: "Initiate AI calibration suite",
    route: "/ai-calibration-suite",
    icon: "cui-icon-calibration-suite",
    class: "",
    tooltip: "AI Calibration Suite",
    target: "",
    alt: "",
  },
  {
    label: "VECU calibration",
    route: "/vecu-calibration",
    icon: "cui-icon-cpu",
    class: "",
    tooltip: "VECU Calibration",
    target: "",
    alt: "",
  },
  {
    label: "Analyze fleet logger data",
    route: "/analyze-fleet-logger-data",
    icon: "cui-icon-database",
    class: "",
    tooltip: "",
    target: "",
    alt: ""
  },
]
