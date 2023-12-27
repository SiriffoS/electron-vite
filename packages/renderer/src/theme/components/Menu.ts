import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { textStyleB1 } from "../foundation/textStyles";
import { pad } from "lodash";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
    height: "25px",

    bg: "sc_black.400",
    borderRadius: "2px",
    color: "sc_white.200",
    padding: "sm",
    gap: "sm",
    minWidth: "25px",
    minHeight: "25px",
    ...textStyleB1,
    _disabled: {
      bg: "sc_black.400",
      color: "sc_white.200",
      opacity: 0.2,
      boxShadow: "none",
      cursor: "not-allowed",
    },
    _hover: {
      bg: "sc_black.300",
      color: "sc_white.50",
      cursor: "pointer",
      _disabled: {
        cursor: "not-allowed",
        bg: "sc_black.400",
        color: "sc_white.200",
      },
    },
  },
  list: {
    // this will style the MenuList component
    minWidth: "0px",
    borderRadius: "sm",
    border: "none",
    bg: "sc_black.400",
    padding: "sm",
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    textStyle: "b1",
    fontSize: "12px",
    bg: "sc_black.400",
    color: "sc_white.200",
    iconSpacing: "sm",
    maxHeight: "25px",
    borderRadius: "sm",
    my: "sm",
    _hover: {
      bg: "sc_black.300",
      color: "sc_white.50",
      cursor: "pointer",
      _disabled: {
        cursor: "not-allowed",
        bg: "sc_black.400",
        color: "sc_white.200",
      },
    },
    _focus: {
      bg: "sc_black.300",
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: "4",
    borderColor: "white",
    borderBottom: "2px dotted",
  },
});
// export the base styles in the component theme
export const Menu = defineMultiStyleConfig({ baseStyle });
