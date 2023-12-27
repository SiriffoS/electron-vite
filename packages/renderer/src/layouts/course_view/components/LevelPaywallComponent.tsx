import { Flex, Icon, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdLock } from "react-icons/md";

import { HiCheck } from "react-icons/hi";

import { TbAlertTriangle } from "react-icons/tb";
import { LevelDots } from "./LevelDots";

export enum LevelPaywallState {
  Unlocked = "UNLOCKED",
  Locked = "LOCKED",
  WasUnlockedButExpired = "WAS_UNLOCKED_BUT_EXPIRED",
}

export interface LevelPaywallComponentProps {
  state: LevelPaywallState;
  isEnabled: boolean;
}

export const LevelPaywallComponent: React.FC<LevelPaywallComponentProps> = ({
  state = LevelPaywallState.Locked,
  isEnabled,
}) => {
  return (
    <Flex
      opacity={isEnabled ? 1 : 0.2}
      flexDir={"column"}
      alignItems={"center"}
      gap={"md"}
    >
      <IconForLevelPaywallState state={state} />
      <TextForLevelPaywallState state={state} />
      {isEnabled && <ButtonForLevelPaywallState state={state} />}
      <LevelDots />
    </Flex>
  );
};

export const IconForLevelPaywallState: React.FC<{
  state: LevelPaywallState;
}> = ({ state }) => {
  switch (state) {
    case LevelPaywallState.Unlocked:
      return <Icon as={HiCheck} boxSize={"20px"} color={"sc_yellow.50"} />;
    case LevelPaywallState.Locked:
      return <Icon as={MdLock} boxSize={"20px"} color={"sc_white.300"} />;
    case LevelPaywallState.WasUnlockedButExpired:
      return (
        <Icon as={TbAlertTriangle} boxSize={"20px"} color={"sc_white.300"} />
      );
    default:
      return <Text>Unknown state</Text>;
  }
};

export const TextForLevelPaywallState: React.FC<{
  state: LevelPaywallState;
}> = ({ state }) => {
  switch (state) {
    case LevelPaywallState.Unlocked:
      return (
        <Text textStyle={"p1"} color={"sc_white.200"}>
          All Levels Unlocked
        </Text>
      );
    case LevelPaywallState.Locked:
      return (
        <Text textStyle={"p1"} color={"sc_white.200"}>
          Unlock All Levels
        </Text>
      );
    case LevelPaywallState.WasUnlockedButExpired:
      return (
        <Text textStyle={"p1"} color={"sc_white.200"}>
          Session Expired
        </Text>
      );
    default:
      return <Text>Unknown state</Text>;
  }
};

export const ButtonForLevelPaywallState: React.FC<{
  state: LevelPaywallState;
}> = ({ state }) => {
  switch (state) {
    case LevelPaywallState.Unlocked:
      return null;
    case LevelPaywallState.Locked:
      return (
        <Button
          variant="controlButton"
          onClick={() => window.electronAPI.openBuyBeginnerCourseHyperLink()}
        >
          Buy now
        </Button>
      );
    case LevelPaywallState.WasUnlockedButExpired:
      return (
        <Button
          variant="controlButton"
          onClick={() => window.electronAPI.openAccountHyperlink()}
        >
          Log in again to unlock
        </Button>
      );
    default:
      return <Text>Unknown state</Text>; // It's better to return a consistent type of element for all branches
  }
};
