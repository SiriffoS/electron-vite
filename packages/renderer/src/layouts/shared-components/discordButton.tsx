import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiQuestionnaireFill } from "react-icons/ri";

export const DiscordButton: React.FC = () => {
  return (
    <Tooltip label="Chat with community" aria-label="A tooltip">
      <Button
        transition="10ms linear"
        variant="controlButton"
        maxWidth="25px"
        onClick={() => window.electronAPI.openDiscordHyperlink()}
      >
        <Icon as={BsFillChatDotsFill} boxSize={"15px"} />
      </Button>
    </Tooltip>
  );
};
