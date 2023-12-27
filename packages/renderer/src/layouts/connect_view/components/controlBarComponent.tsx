import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoClose } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import { SetupStatusComponent } from "../../shared-components/setupStatusComponent";

interface ControlBarProps {
  closeButtonClick: () => void;
  setupButtonClick?: () => void;
  hasSetup?: boolean;
  headerText?: string;
  //callback?: Dispatch<SetStateAction<number>>;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  closeButtonClick,
  setupButtonClick,
  headerText,
}) => {
  return (
    <Flex padding="10px" gap="10px" height="45px" justify="space-between">
      <Button
        transition="10ms linear"
        variant="controlButton"
        maxWidth="25px"
        onClick={closeButtonClick}
      >
        <Icon as={IoClose} boxSize={"10px"} />
      </Button>
      {headerText !== null && (
        <Text textStyle={"h1"} width={"100%"} textAlign={"center"}>
          {headerText}
        </Text>
      )}

      {setupButtonClick && (
        <SetupStatusComponent clickHandler={setupButtonClick} />
      )}
    </Flex>
  );
};
