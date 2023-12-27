import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsCircleFill } from "react-icons/bs";

export const LevelDots: React.FC = ({}) => {
  return (
    <Flex flexDir="column" gap="4px" color={"sc_yellow.300"}>
      <Icon as={BsCircleFill} boxSize={"2px"} />
      <Icon as={BsCircleFill} boxSize={"2px"} />
      <Icon as={BsCircleFill} boxSize={"2px"} />
    </Flex>
  );
  //<Box sx={dotStyles} />
};
