/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import "./style.css";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { FrontView } from "./layouts/front_view/FrontView";
import { CourseView } from "./layouts/course_view/CourseView";
import React, { useEffect } from "react";
import { LevelView } from "./layouts/level_view/LevelView";
import { ExerciseView } from "./layouts/exercise_view/ExerciseView";

import createCache from "@emotion/cache";
import { ConnectView } from "./layouts/connect_view/ConnectView";
import { SetupView } from "./layouts/setup_view/SetupView";
// import SupabaseProvider from "_/providers/supabaseProvider";
// import { ExerciseStatisticsProvider } from "_/providers/exerciseStatisticsProvider";
import { theme } from "./theme";
import { EmotionCacheProvider } from "./EmotionCasheProvider";
import ReactDOM from "react-dom";
// import ProgressStore from "../utils/progressStore";
// let progressStore = new ProgressStore();

const container = document.getElementById("root");
const nonceMetaTag = document.querySelector('meta[name="csp-nonce"]');
const nonce = nonceMetaTag ? nonceMetaTag.getAttribute("content") : null;
if (!nonce) {
  console.error("CSP nonce not found in meta tag");
}
const emotionCache = createCache({
  key: "bla", // add a default key value
  nonce: nonce || undefined,
});
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <EmotionCacheProvider nonce="YWZ4hUw8Pu5wDee10QYjk42i709TetLXhK08yVcIxhQgxlc3oOk9DCQqQvRBcjv7LoMTa1TKjkbCYIFxX5MTRA0b2ymjO2VH0AO528fKO3dpA2UwbD7zuYfYoJoI6fta/35AfQHcsstj80qdBqCK8fTXl16CHW6yWDyxj1RmQ9Q=">
        <ChakraProvider theme={theme}>
          {/* <SupabaseProvider> */}
          {/* <ExerciseStatisticsProvider> */}
          <App />
          {/* </ExerciseStatisticsProvider> */}
          {/* </SupabaseProvider> */}
        </ChakraProvider>
      </EmotionCacheProvider>
    </HashRouter>
  </React.StrictMode>,
);

function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const continueSetup = async () => {
      // const continueSetup = await window.electronAPI.shouldContinueSetup();
      let continueSetup = false;
      if (continueSetup) {
        navigate("/setup?continue=true");
      }
    };
    continueSetup();
  }, []);

  React.useEffect(() => {
    // console.log(location);
  }, [location]);
  return (
    <Flex flexDirection={"column"}>
      <Flex id="topBar"></Flex>
      <Flex
        flexDirection={"column"}
        layerStyle="windowContainer"
        alignSelf="stretch"
        grow={1}
        height="100%"
        width="100%"
        bg={"sc_black.600"}
      >
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

        <Routes>
          <Route index element={<FrontView />} />
          <Route path="/course/:courseId" element={<CourseView />} />
          <Route
            path="/course/:courseId/level/:levelId"
            element={<LevelView />}
          />
          <Route
            path="/course/:courseId/level/:levelId/exercise/:exerciseId"
            element={<ExerciseView />}
          />
          <Route path="/connect" element={<ConnectView />} />
          <Route path="/setup" element={<SetupView />} />
        </Routes>
      </Flex>
    </Flex>
  );
}
/*
        <IconButton
          marginLeft="165px"
          marginTop="6px"
          variant="iconButton"
          isDisabled={!abletonIsOpen}
          onClick={
            () => {
              window.electronAPI.setWindowsSideBySide()
            }
          }
          icon={<AiOutlineSplitCells />} aria-label={""} />
          */
