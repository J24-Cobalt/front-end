import HomeIcon from "@mui/icons-material/Home";
import StarsIcon from "@mui/icons-material/Stars";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
  divider: boolean;
}

export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: AccountCircleIcon,
    text: "Profile",
    path: "/profile",
    divider: true,
  },
  {
    Icon: HomeIcon,
    text: "Matching",
    path: "/matching",
    divider: false,
  },
  {
    Icon: StarsIcon,
    text: "Applications",
    path: "/applications",
    divider: false,
  },
  {
    Icon: DynamicFormIcon,
    text: "Questionnaires",
    path: "/questionnaires",
    divider: false,
  },
];
