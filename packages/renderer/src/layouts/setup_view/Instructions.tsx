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
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { formatText } from "./setupUtil";
interface InstructionProps {
  instrictions: string[];
  orderedList: boolean;
}

export const Instructions: React.FC<InstructionProps> = ({
  instrictions: instructions,
  orderedList,
}) => {
  const ListComponent = orderedList ? OrderedList : UnorderedList;

  return (
    <Flex
      direction={"column"}
      width={"100%"}
      flexGrow={1}
      gap={"md"}
      alignSelf={"stretch"}
    >
      <SlideFade in={true} offsetX="10px" offsetY={"0px"}>
        <ListComponent spacing={"sm"}>
          {instructions.map((instruction, index) => (
            <ListItem key={index} textStyle="p1" color="sc_white.200">
              <Flex alignItems={"start"} gap={"2px"}>
                <Text flexGrow={1}>{formatText(instruction)}</Text>
              </Flex>
            </ListItem>
          ))}
        </ListComponent>
      </SlideFade>
    </Flex>
  );
};
