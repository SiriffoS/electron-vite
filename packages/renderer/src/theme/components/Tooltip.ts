import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { textStyleP1 } from "../foundation/textStyles";

// define the base component styles
const baseStyle = {
  bg: "sc_black.600",
  color: "sc_white.400",
  borderRadius: "sm", // add a border radius
  borderWidth: "1px", // add a border
  borderColor: "sc_white.900",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",

  ...textStyleP1,
};

// export the component theme
export const Tooltip = defineStyleConfig({ baseStyle });
