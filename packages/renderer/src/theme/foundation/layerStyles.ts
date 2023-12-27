export const layerStyles = {
  btnBlackEnabled: {
    bg: "sc_black.900",
    color: "sc_white.200",
    _hover: { bg: "sc_black.800", color: "sc_white.50" },
    boxShadow: "btnShadow",
  },
  btnBlackDisabled: {
    bg: "sc_black.900",
    color: "sc_white.50",
    opacity: 0.2,
  },
  mainContentContainer: {
    gap: "xl",
    px: "md",
    py: "lg",
    width: "100%",
    alignItems: "left",
    height: "90vh",
    overflow: "auto",
  },
  contentDisabled: {
    opacity: 0.2,
  },
  windowContainer: {
    width: "100%",
    height: "100%",
  },
  console: {
    height: "160px",
    width: "180px",
    bg: "sc_black.700",
  },
  controlBar: {
    px: "md",
    py: "md",
    gap: "sm",
    height: "5vh",
    minHeight: "45px",
    widht: "100%",
    justifyContent: "space-between",
  },
};
