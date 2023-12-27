import { extendTheme } from "@chakra-ui/react";
import { Progress } from "./components/Progress";
import { textStyles } from "./foundation/textStyles";
import { colors } from "./foundation/colors";
import { space } from "./foundation/space";
import { radius } from "./foundation/radius";
import { shadows } from "./foundation/shadows";
import { layerStyles } from "./foundation/layerStyles";
import { Button } from "./components/Button";
import { Accordion } from "./components/Accordion";
import { BlinkingCursor } from "./components/BlinkingCursor";
import { globalStyles } from "./foundation/globalStyles";
import { Menu } from "./components/Menu";
import { Tooltip } from "./components/Tooltip";

export const theme = extendTheme({
  components: {
    Progress,
    Button,
    BlinkingCursor,
    Accordion,
    Menu,
    Tooltip,
  },
  layerStyles: layerStyles,
  shadows: shadows,
  textStyles: textStyles,
  colors: colors,
  space: space,
  radii: radius,
  styles: globalStyles,
});
