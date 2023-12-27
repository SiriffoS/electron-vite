import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { StepStatus } from "./stepStatusComponent";

interface AlertComponentProps {
  text?: string;
  status: StepStatus;
  onClose: () => void;
  visible: boolean;
}

export const AlertComponent: React.FC<AlertComponentProps> = ({
  status = StepStatus.Done,
  text,
  onClose,
  visible,
}) => {
  const handleClose = () => {
    onClose();
  };

  if (visible) {
    return (
      <Flex
        bg={status === StepStatus.Done ? "sc_greenAlpha.15" : "sc_redAlpha.15"}
        flexDir={"row"}
        borderRadius={"md"}
        gap={"md"}
        px={"md"}
        py={"sm"}
        alignItems={"center"}
        width={"100%"}
      >
        <Text
          width={"100%"}
          textStyle={"p1"}
          color={status === StepStatus.Done ? "sc_green.300" : "sc_red.400"}
        >
          {text}
        </Text>
        <Button variant="iconGhostButton" onClick={handleClose}>
          <Icon as={IoClose} boxSize={"15px"} />
        </Button>
      </Flex>
    );
  } else {
    return <></>;
  }
};
