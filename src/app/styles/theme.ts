import { type LinkProps, createTheme } from "@mui/material";
import { FontFamilies } from "./FontFamilies";
import { FontWeights } from "./FontWeights";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: "#729E65",
    },
    text: {
      primary: "#000000",
      secondary: "#64727C",
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.regular,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

theme.typography.h1 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.bold,
  fontSize: "2rem",
  lineHeight: "3rem",
};

theme.typography.h2 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1.875rem",
  lineHeight: "2.813rem",
};

theme.typography.h4 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1.5rem",
  lineHeight: "2.25rem",
};

theme.typography.h5 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1.375rem",
  lineHeight: "2.063rem",
};

theme.typography.h6 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1.25rem",
  lineHeight: "1.875rem",
};

theme.typography.body1 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
};

theme.typography.body2 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
};

theme.typography.subtitle1 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
  fontSize: "1rem",
  lineHeight: "1.5rem",
};

theme.typography.subtitle2 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  fontSize: "1rem",
  lineHeight: "1.5rem",
};

theme.typography.caption = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
};

export default theme;
