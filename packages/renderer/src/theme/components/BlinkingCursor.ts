import { defineStyleConfig } from "@chakra-ui/react";

export const BlinkingCursor = defineStyleConfig({
  baseStyle: {
    display: "inline-block",
    background: "white",
    width: "5px",
    height: "12px",
    animation: "blink-cursor 1s infinite",
    "@keyframes blink-cursor": {
      "0%": {
        opacity: 0,
      },
      "50%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },
  },
});
