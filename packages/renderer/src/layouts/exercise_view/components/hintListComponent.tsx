import React, { useEffect, useState } from "react";
//import { Hint, HintType } from "_common/models/hint";
import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Text,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import { BsLightbulbFill } from "react-icons/bs";
import { formatText } from "../../setup_view/setupUtil";
import useExerciseStore from "_/utils/stateStores/useExerciseStore";
interface HintListComponentProps {
  hints: string[];
  isEnabled: boolean;
}

export const HintListComponent: React.FC<HintListComponentProps> = ({
  hints,
  isEnabled,
}) => {
  const [nextHintIndex, setNextHintIndex] = useState<number>(0);
  const { incrementHintsUsed } = useExerciseStore();

  useEffect(() => {
    // reset the nextHintIndex when new hints are received
    setNextHintIndex(0);
  }, [hints]);

  const handleRevealHintClick = () => {
    if (isEnabled && nextHintIndex < hints.length) {
      incrementHintsUsed();
      setNextHintIndex((prevNextHintIndex) => prevNextHintIndex + 1);
    }
  };
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      flexGrow={1}
      gap={"md"}
      alignSelf={"stretch"}
    >
      <SlideFade in={true} offsetX="10px" offsetY={"0px"}>
        <List spacing={"sm"} opacity={isEnabled ? 1 : 0.2}>
          {hints.slice(0, nextHintIndex).map((hint, index) => (
            <ListItem key={index} textStyle="p1" color="sc_white.300">
              <Flex alignItems={"start"} gap={"2px"}>
                <Text flexGrow={1}>{formatText(hint)}</Text>
              </Flex>
            </ListItem>
          ))}
          {nextHintIndex < hints.length && (
            <ListItem
              onClick={handleRevealHintClick}
              textStyle="p1"
              color="sc_white.200"
              _hover={{ color: isEnabled ? "sc_white.50" : "sc_white.200" }}
              cursor="pointer"
            >
              <Flex alignItems={"start"} gap={"2px"}>
                <ListIcon
                  as={BsLightbulbFill}
                  marginTop={"3px"}
                  marginRight={"4px"}
                  boxSize={"10px"}
                />
                Hint {nextHintIndex + 1} of {hints.length}
              </Flex>
            </ListItem>
          )}
        </List>
      </SlideFade>
    </Flex>
  );
};
