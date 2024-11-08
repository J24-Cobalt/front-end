import HomeIcon from "@mui/icons-material/Home";
import StarsIcon from "@mui/icons-material/Stars";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
}

export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: HomeIcon,
    text: "Matching",
    path: "/matching",
  },
  {
    Icon: StarsIcon,
    text: "Applications",
    path: "/applications",
  },
];
