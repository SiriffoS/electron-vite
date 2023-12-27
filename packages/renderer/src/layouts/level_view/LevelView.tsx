import React, { useEffect, useState } from "react";
import { ExerciseCard } from "./components/ExerciseCard";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SlideFade,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Level } from "_common/models/level";
import { Exercise } from "_common/models/exercise";
import { MdChevronLeft } from "react-icons/md";
import { BiError, BiChat } from "react-icons/bi";
import { BsMagic } from "react-icons/bs";
import { RiQuestionnaireLine } from "react-icons/ri";
import { MoreOptionsButton } from "../shared-components/moreOptionsButtonComponent";

export const LevelView: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const [level, setLevel] = useState<Level | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [currentExerciseId, setCurrentExerciseId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      if (!levelId) {
        return <div>Could not find exercise</div>;
      }
      if (isNaN(parseInt(levelId))) {
        return <div>Invalid exercise ID</div>;
      }
      const parsedLevelId = parseInt(levelId);
      const level: Level = await window.electronAPI.getLevelById(parsedLevelId);
      setLevel(level);
      const exercisesByLevelId: Exercise[] =
        await window.electronAPI.getExercisesByLevelId(parsedLevelId);
      for (let i = 0; i <= exercisesByLevelId.length; i++) {
        const exercise = exercisesByLevelId[i];
        if (exercise) {
          const exerciseInfo = await window.electronAPI.getExerciseProgress(
            1,
            level.id,
            exercise.id,
          );
          exercise._enabled = exerciseInfo.enabled;
          exercisesByLevelId[i]._completedPercentage =
            exerciseInfo.completed === true ? 100 : 0;
        }
      }

      setExercises(exercisesByLevelId);
    };
    fetchExercises();
  }, [levelId]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Flex layerStyle={"controlBar"} justifyContent={"end"}>
        <Button
          variant="controlButton"
          maxWidth="25px"
          onClick={handleBackButtonClick}
        >
          <Icon as={MdChevronLeft} boxSize={"15px"} />
        </Button>
        <Flex w="100%" justifyContent="flex-end" gap="5px">
          <MoreOptionsButton />
        </Flex>
      </Flex>

      <Flex direction="column" layerStyle="mainContentContainer">
        <SlideFade in={true} offsetX="0px" offsetY={"10px"}>
          <Flex direction="column" gap="md">
            <Box textStyle="h1" color="sc_white.50" alignSelf="stretch">
              {level?.title}
            </Box>
            <Box textStyle="sh1" color="sc_white.600" alignSelf="stretch">
              {level?.subtitle}
            </Box>
          </Flex>
        </SlideFade>
        <Flex direction="row" gap="md" wrap="wrap" alignContent="space-evenly">
          {exercises?.map((exercise, i) => (
            <SlideFade key={i} in={true} offsetX="10px" offsetY={"0px"}>
              <ExerciseCard
                key={exercise.id}
                id={exercise.id}
                title={exercise.title}
                enabled={exercise._enabled}
                completedPercentage={exercise._completedPercentage}
                levelId={level?.id ?? 1}
              />
            </SlideFade>
          ))}
        </Flex>
      </Flex>
    </>
  );
};
