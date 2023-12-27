import { Flex, Box, SlideFade, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "_common/models/course";
import { Level } from "_common/models/level";
import { MoreOptionsButton } from "../shared-components/moreOptionsButtonComponent";
import {
  LevelPaywallComponent,
  LevelPaywallState,
} from "./components/LevelPaywallComponent";
import supabaseContext from "_/contexts/supabase/supabaseContext";

import { LevelCard } from "./components/LevelCard";

export const CourseView: React.FC = () => {
  const { courseId: courseIdFromParams } = useParams<{ courseId: string }>();
  const courseId = courseIdFromParams || "1";
  let parsedCourseId: number;
  const [course, setCourse] = useState<Course>();
  const [levels, setLevels] = useState<Level[]>();
  const [hasFinishedSetup, setHasFinishedSetup] = useState(false);
  const levelToScrollRef = useRef<HTMLDivElement | null>(null); // Use type assertion
  const [hasClickedReviewLevel, setHasClickedReviewLevel] = useState(false);
  const [paywallAfterIndex, setPaywallAfterIndex] = useState(0);
  const [reviewAfterIndex, setReviewAfterIndex] = useState(1);
  const [paywallState, setPaywallState] = useState(LevelPaywallState.Locked); // using state hook
  const [areTokensSet, setAreTokensSet] = useState(0);
  const [isPaywallLoading, setIsPaywallLoading] = useState(true);
  let supabase = useContext(supabaseContext);

  useEffect(() => {
    //Fetch the course from the id in the params and then levels by the course id
    const fetchCourseAndLevels = async () => {
      setHasFinishedSetup(await window.electronAPI.hasFinishedSetup());
      if (!courseId) {
        return <div>Could not find course</div>;
      }
      if (!courseId || isNaN(parseInt(courseId))) {
        return <div>Invalid course </div>;
      }
      parsedCourseId = parseInt(courseId);

      const courseById: Course =
        await window.electronAPI.getCourseById(parsedCourseId);

      setCourse(courseById);

      const levelsByCourseId: Level[] =
        await window.electronAPI.getLevelsByCourseId(parsedCourseId);
      for (let i = 0; i <= levelsByCourseId.length; i++) {
        const level: Level = levelsByCourseId[i];
        if (level) {
          const levelProgress = await window.electronAPI.getLevelProgress(
            1,
            level.id,
          );
          const getLevelProgressPercentage =
            await window.electronAPI.getLevelProgressPercentage(1, level.id);
          if (levelProgress) {
            level._enabled = levelProgress.enabled;
            level._completedPercentage = getLevelProgressPercentage;
          }
        }
      }
      setLevels(levelsByCourseId);
      updateProgress();

      if (levelToScrollRef.current) {
        levelToScrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // Scroll to the center of the view
          inline: "center", // Scroll to the center horizontally
        });
      }
    };
    setupTokenSetListener(setAreTokensSet);
    fetchAndSetSession();
    fetchCourseAndLevels();
  }, []);

  const fetchAndSetSession = async () => {
    const authSessionTokens = await window.electronAPI.getTokens();
    if (authSessionTokens) {
      if (!supabase) {
        supabase = useContext(supabaseContext);
      }

      if (!supabase) {
        return;
      }
      let session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        await supabase.auth.setSession({
          access_token: authSessionTokens.accessToken,
          refresh_token: authSessionTokens.refreshToken,
        });
        session = (await supabase.auth.getSession()).data.session;
      } else {
        const accessToken = session?.access_token;
        const refreshToken = session?.refresh_token;
        await window.electronAPI.setTokens(accessToken, refreshToken);
      }
      const uuid = session?.user?.id;
      const { data } = await supabase
        .from("one_time")
        .select()
        .eq("user_id", uuid); // this filters rows where the uuid column equals the uuid value you're providing

      if (data && data[0].status === "paid") {
        setPaywallState(LevelPaywallState.Unlocked);
      } else if (authSessionTokens && authSessionTokens.accessToken) {
        setPaywallState(LevelPaywallState.WasUnlockedButExpired);
      } else {
        setPaywallState(LevelPaywallState.Locked);
      }
    }
    setIsPaywallLoading(false);
  };
  useEffect(() => {
    fetchAndSetSession();
  }, [areTokensSet]);

  async function updateProgress() {
    //duplicate, fix this!!
    if (levels) {
      for (let i = 0; i <= levels.length; i++) {
        const level: Level = levels[i];
        if (level) {
          const levelProgress = await window.electronAPI.getLevelProgress(
            1,
            level.id,
          );
          const getLevelProgressPercentage =
            await window.electronAPI.getLevelProgressPercentage(1, level.id);
          if (levelProgress) {
            level._enabled = levelProgress.enabled;
            level._completedPercentage = getLevelProgressPercentage;
          }
        }
      }
    }
  }

  return (
    <>
      <Flex layerStyle={"controlBar"} justifyContent={"end"}>
        {
          //commented this away because we are not showing the front view since we dont have content
          /* <Button variant="controlButton" maxWidth="25px" onClick={handleBackButtonClick}>
          <Icon as={MdChevronLeft} boxSize={"15px"} />
        </Button> */
        }
        <Flex w="100%" justifyContent="flex-end" gap="5px">
          <MoreOptionsButton
            isLoggedIn={paywallState === LevelPaywallState.Unlocked}
          />
        </Flex>
      </Flex>
      {!course || !levels || isPaywallLoading ? (
        <Flex
          flexGrow={1}
          layerStyle={"mainContentContainer"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner
            color="sc_yellow.300"
            size={"xl"}
            thickness="4px"
            speed="0.70s"
          />
        </Flex>
      ) : (
        <Flex
          direction={"column"}
          layerStyle={"mainContentContainer"}
          alignItems="center"
          flexGrow={1}
        // overflowY={"scroll"}
        // overscrollY={"auto"}
        >
          <SlideFade in={true} offsetX="0px" offsetY={"10px"}>
            <Flex direction={"column"} width={"100%"} gap={"md"}>
              <Box textStyle="h1" color={"sc_white.50"}>
                {course?.title}
              </Box>
              <Box textStyle="sh1" color={"sc_white.500"}>
                {course?.subtitle}
              </Box>
            </Flex>
          </SlideFade>
          <SlideFade in={true} offsetX="20px">
            <LevelCard
              id={1337}
              title={"Setup"}
              iconName={"TbPlugConnected"}
              isEnabled={true}
              completedPercentage={hasFinishedSetup ? 100 : 0}
            />
          </SlideFade>
          {levels?.map((level, i) => (
            <React.Fragment key={i}>
              <SlideFade in={true} offsetX="20px" delay={i * 0.05}>
                <div
                  ref={
                    level._completedPercentage >= 100 ? levelToScrollRef : null
                  }
                >
                  <LevelCard
                    id={level.id}
                    title={level.title}
                    isEnabled={
                      level._enabled && hasFinishedSetup
                      //Uncomment when we want paywall
                      // &&
                      // if the level is after the paywall and the paywall is unlocked

                      /**(i > paywallAfterIndex
                        ? paywallState === LevelPaywallState.Unlocked
                          ? true
                          : false
                        : true)*/
                    }
                    // isEnabled={i <= latest level}
                    iconName={level.iconName}
                    completedPercentage={level._completedPercentage}
                  />
                </div>
              </SlideFade>
              {/* {i === paywallAfterIndex && (
                <LevelPaywallComponent
                  isEnabled={levels?.at(i)?._completedPercentage === 100}
                  state={paywallState}
                />
              )} */}

              {i === reviewAfterIndex && (
                <SlideFade in={true} offsetX="20px">
                  <Flex
                    onMouseUp={() => {
                      const isUnlocked =
                        paywallState === LevelPaywallState.Unlocked;
                      const previousLevelDone =
                        reviewAfterIndex >= paywallAfterIndex
                          ? isUnlocked
                          : true;
                      const currentLevelCompleted =
                        levels?.at(i)?._completedPercentage === 100;

                      // Check if conditions are met
                      if (previousLevelDone && currentLevelCompleted) {
                        setHasClickedReviewLevel(true);
                      }
                    }}
                  >
                    <LevelCard
                      id={6666}
                      title={"Review"}
                      iconName={"BiSolidReport"}
                      isEnabled={
                        paywallState === LevelPaywallState.Unlocked ||
                        levels?.at(i)?._completedPercentage === 100
                      }
                      completedPercentage={hasClickedReviewLevel ? 100 : 0}
                    />
                  </Flex>
                </SlideFade>
              )}
            </React.Fragment>
          ))}
        </Flex>
      )}
    </>
  );
};

function setupTokenSetListener(
  setAreTokensSet: React.Dispatch<React.SetStateAction<number>>,
) {
  const tokenSetHandler = () => {
    setAreTokensSet((prev) => prev + 1); // Increase counter by 1
  };
  window.electronAPI.onTokensSet(tokenSetHandler);
}
