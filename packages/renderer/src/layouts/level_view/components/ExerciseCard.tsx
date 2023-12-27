import { Box, Flex, Icon, Progress } from "@chakra-ui/react";
import React from "react";
import { HiCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export interface ExerciseCardProps {
  id: number;
  title: string;
  enabled: boolean;
  completedPercentage: number;
  levelId: number;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  id,
  title,
  enabled,
  completedPercentage,
  levelId,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    if (enabled === true) {
      navigate("/course/1/level/" + levelId + "/exercise/" + id);
    }
  };

  return (
    <Flex
      layerStyle={enabled === true ? "btnBlackEnabled" : "btnBlackDisabled"}
      cursor={enabled === true ? "pointer" : "default"}
      direction={"column"}
      borderRadius={"md"}
      overflow={"clip"}
      height={"60px"}
      width={"85px"}
      grow={1}
      onClick={handleButtonClick}
    >
      <Flex
        direction={"column"}
        px={"sm"}
        py={"sm"}
        height={"55px"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <Box textStyle="h2" height={"30px"} alignSelf={"stretch"}>
          {title}
        </Box>
        {completedPercentage >= 100 ? (
          <Icon as={HiCheck} boxSize={"10px"} color="sc_yellow.200" />
        ) : null}
      </Flex>
      <Progress value={completedPercentage}></Progress>
    </Flex>
  );
};

/*








 Old code where we were trying to use the styles provider to pass the styles to the children. 


const [StylesProvider, useStyles] = createStylesContext("ExerciseBtn");
function ExerciseButton(props: any) {
  const { size, variant, children, ...rest } = props;
  const styles = useMultiStyleConfig("ExerciseBtn", { size, variant });
  console.log("text", styles.text);

  return (
    <VStack borderRadius={""} bg="sc_black.500" overflow={"clip"}>
      <VStack spacing="large">
        <StylesProvider value={styles}>
          <Box textStyle="h2">This is a box</Box>
          <Box textStyle="h2">This is a box</Box>
          <Box textStyle="h2">This is a box</Box>
        </StylesProvider>
      </VStack>
      <Progress value={20}></Progress>
    </VStack>
  );
}
*/
