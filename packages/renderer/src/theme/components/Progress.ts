const tracksWidthSm = "2px";
const tracksWidthMd = "5px";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["filledTrack", "track"]);

export const Progress = helpers.defineMultiStyleConfig({
  baseStyle: {
    filledTrack: {
      bg: "sc_yellow.200",
    },
    track: {
      bg: "sc_black.400",
      width: "100%",
      borderRadius: "sm",
    },
    trackWithSm: tracksWidthSm,
    trackWithMd: tracksWidthMd,
  },
  sizes: {
    sm: {
      filledTrack: {
        height: "2px",
      },
      track: {
        height: "2px",
      },
    },
    md: {
      filledTrack: {
        height: "5px",
      },
      track: {
        height: "5px",
      },
      height: { tracksWidthSm },
      md: {
        height: { tracksWidthMd },
      },
    },
  },
  variants: {
    playProgress: {
      filledTrack: {
        bg: "sc_black.800",
      },
      track: {
        bg: "sc_green.400",
      },
    },
    track: {
      filledTrack: {
        bg: "sc_green.400",
      },
      track: {
        bg: "sc_black.400",
      },
    },
  },
  defaultProps: {
    size: "md",
  },
});
