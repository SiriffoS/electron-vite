export const FONT_FAMILY = `'Roboto', sans-serif`;
export const FONT_STYLE = "normal";

export const textStyleB1 = {
  fontFamily: FONT_FAMILY,
  fontStyle: FONT_STYLE,
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "14px",
  letterSpacing: "1.5px",
};
export const textStyleP1 = {
  fontFamily: FONT_FAMILY,
  fontStyle: FONT_STYLE,
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "150%",
  letterSpacing: "2%",
};

export const textStyles = {
  //Header
  h0: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    lineHeight: "20px",
    letterSpacing: "0px",
    fontWeight: 600,
    fontSize: "16px",
  },
  h1: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    lineHeight: "14px",
    letterSpacing: "0px",
    fontWeight: 600,
    fontSize: "12px",
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "14px",
    letterSpacing: "1px",
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    lineHeight: "14px",
    letterSpacing: "0px",
    fontWeight: 800,
    fontSize: "12px",
  },
  //Subheader
  sh1: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "150%",
    letterSpacing: "0.02em",
  },
  //Button
  b1: { ...textStyleB1 },

  //Paragraph
  p1: { ...textStyleP1 },
  //Paragraph 2
  p2: {
    fontFamily: FONT_FAMILY,
    fontStyle: FONT_STYLE,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "2%",
  },
};
