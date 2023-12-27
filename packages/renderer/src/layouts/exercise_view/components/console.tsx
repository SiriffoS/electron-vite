import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import Typewriter from "./typewriter";

export enum LogType {
  Default = "DEFAULT",
  Subtle = "SUBTLE",
  Success = "SUCCESS",
  Warning = "WARNING",
  Error = "ERROR",
}

export type Log = {
  text: string;
  logType: LogType;
};

interface ConsoleProps {
  logs?: Log[];
}

const Console: React.FC<ConsoleProps> = ({ logs }) => {
  if (logs === undefined) {
    return null;
  }
  return (
    <Flex
      layerStyle={"console"}
      flexDirection="column"
      padding="md"
      borderRadius="4px"
      flexGrow="1"
    >
      <Typewriter logs={logs} />
    </Flex>
  );
};

export default Console;
