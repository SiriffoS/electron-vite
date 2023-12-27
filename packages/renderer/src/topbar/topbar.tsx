import React from "react";
import { Button, Flex, Text, Image, Box } from "@chakra-ui/react";

export function TopBar() {
  return (
    <Flex direction={"column"}>
      <Flex
        id="topbar"
        bg={"purple1"}
        width={"100%"}
        height={"28px"}
        direction={"row"}
        alignItems={"center"}
        padding="0px 4px"
        gap="8px"
      >
        <Button
          id="windowControlBtns"
          padding={"0px"}
          bg={"transparent"}
          borderRadius={"0px"}
          maxHeight={"28px"}
          minHeight={"28px"}
          maxWidth={"52px"}
          minWidth={"52px"}
        >
          <Image
            id="macWinCtrlBtnsIcons"
            src={"../assets/Icons/ActiveMacWinCtrlBtns.svg"}
            width="52px"
            color={"black8"}
          />
        </Button>
        <Text
          fontFamily={"Open Sans"}
          fontStyle={"normal"}
          fontWeight={"700"}
          fontSize={"10px"}
          lineHeight={"14px"}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
        >
          Studiocamp
        </Text>
      </Flex>
      <Box bg={"black1"} width="100%" height={"0.5px"} />
    </Flex>
  );
}
