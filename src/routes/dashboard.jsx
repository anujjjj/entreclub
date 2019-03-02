import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Statistics from "views/Statistics/Statistics"
import TableList from "views/TableList/TableList";
import PastEvents from 'views/PastEvents/PastEvents'
import CreateEvent from 'views/CreateEvent/CreateEvent'
import Events from "views/Events/Events";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import Requests from "../views/Requests/Requests";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/requests",
    name: "Requests",
    icon: "pe-7s-graph",
    component: Requests
  },
  {
    path: "/user/:id",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/list",
    name: "Entrepreneur List",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/stats",
    name: "Statistics",
    icon: "pe-7s-graph",
    component: Statistics
  },
  {
    path: "/past-events",
    name: "Past Events",
    icon: "pe-7s-graph",
    component: PastEvents
  },
  {
    path: "/create-event",
    name: "Create Event",
    icon: "pe-7s-graph",
    component: CreateEvent
  }
  // ,
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography
  // },
  // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade
  // },
  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard", exact: true }
];

export default dashboardRoutes;
