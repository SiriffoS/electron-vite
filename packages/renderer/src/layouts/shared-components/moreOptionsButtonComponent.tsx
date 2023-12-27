import {
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import {
  BiError,
  BiChat,
  BiLogOut,
  BiLinkExternal,
  BiCog,
} from "react-icons/bi";
import { BsMagic, BsPersonCircle } from "react-icons/bs";
import { RiAccountCircleLine, RiQuestionnaireLine } from "react-icons/ri";
export interface MoreOptionsButtonProps {
  isLoggedIn?: boolean;
}
export const MoreOptionsButton: React.FC<MoreOptionsButtonProps> = ({
  isLoggedIn = false,
}) => {
  return (
    <Menu placement="top-end">
      <Tooltip
        label="More options"
        aria-label="More Options Tooltip"
        placement="top-end"
      >
        <MenuButton
          transition="10ms linear"
          maxWidth={"25px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative" // ensure this is relatively positioned
        >
          <Icon
            as={RiAccountCircleLine}
            boxSize={"15px"}
            display="block"
            margin="auto"
          />
          {isLoggedIn && ( // Only show if the user is logged in
            <Box
              position="absolute"
              top="2px"
              right="2px"
              borderRadius="50%"
              w="6px"
              h="6px"
              bg="green.200"
            />
          )}
        </MenuButton>
      </Tooltip>
      <MenuList width={"180px"}>
        <MenuItem
          icon={<Icon as={BiError} boxSize="15px" />}
          onClick={() => window.electronAPI.openGeneralFeedbackSurvey()}
        >
          Report Issue
        </MenuItem>
        <MenuItem
          icon={<Icon as={BsMagic} boxSize="15px" />}
          onClick={() => window.electronAPI.openGeneralFeedbackSurvey()}
        >
          Give Feedback
        </MenuItem>
        <MenuItem
          icon={<Icon as={BiChat} boxSize="15px" />}
          onClick={() => window.electronAPI.openDiscordHyperlink()}
        >
          Go to Community
        </MenuItem>

        {isLoggedIn && (
          <MenuItem
            icon={<Icon as={RiAccountCircleLine} boxSize="15px" />}
            onClick={() => window.electronAPI.openAccountHyperlink()}
          >
            Go to account
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
