import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";

interface CloseButtonProps {
  clickHandler?: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ clickHandler }) => {
  return (
    <Tooltip
      label="Close exercise"
      aria-label="A tooltip"
      placement="top-start"
    >
      <Button
        transition="10ms linear"
        variant="controlButton"
        maxWidth="25px"
        onClick={clickHandler}
      >
        <Icon as={IoMdClose} boxSize={"15px"} />
      </Button>
    </Tooltip>
  );
};
