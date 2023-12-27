import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Icon,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BiSolidReport } from "react-icons/bi";
import { BsCircleFill, BsSoundwave } from "react-icons/bs";
import { CgLoadbarSound } from "react-icons/cg";
import { FaDrum } from "react-icons/fa";
import { MdSpeaker, MdGridOn, MdPiano, MdLock } from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LevelDots } from "./LevelDots";

export interface LevelCardProps {
  id: number;
  title: string;
  iconName: string;
  isEnabled: boolean;
  completedPercentage: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  id,
  title,
  iconName,
  isEnabled,
  completedPercentage,
}: LevelCardProps) => {
  const styles = useMultiStyleConfig("Progress", {});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let link = isEnabled ? `/course/1/level/${id}` : "";
  if (id === 1337) {
    link = "/setup";
  }
  if (id === 6666) {
    link = "";
  }

  return (
    <Box width="100%">
      <Link to={link}>
        <Button
          variant="levelButton"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isDisabled={!isEnabled}
          onClick={
            id === 6666 ? () => window.electronAPI.openReviewSurvey() : () => {}
          }
        >
          <Flex direction="column" alignItems="center" gap="md">
            <Box
              boxShadow={isEnabled ? "0px 2px 3px rgba(0, 0, 0, 0.25)" : "none"}
              id="backgroundbox"
              bg={isHovered ? "sc_black.800" : "sc_black.900"}
              boxSize="63px"
              borderRadius="full"
              position="absolute"
              top="calc(50% - 24px)" // adjust the top position
              left="50%"
              transform="translate(-50%, -50%)"
            >
              {getIcon(isEnabled, iconName)}
            </Box>
            <CircularProgress
              margin={0} // remove the default margin
              capIsRound={true}
              color={styles.filledTrack.bg as string}
              trackColor={styles.track.bg as string}
              thickness="7px" //{styles.trackWithMd as string}
              //cannot do shadow on circle since its svg
              value={completedPercentage}
              position="relative"
              size="70px"
            ></CircularProgress>
            <Box textStyle="b1">{title}</Box>
            <LevelDots />
          </Flex>
        </Button>
      </Link>
    </Box>
  );
};

interface IconMap {
  [key: string]: IconType;
}

const ICON_MAP: IconMap = {
  MdSpeaker: MdSpeaker,
  CgLoadbarSound: CgLoadbarSound,
  MdGridOn: MdGridOn,
  MdPiano: MdPiano,
  BsSoundwave: BsSoundwave,
  FaDrum: FaDrum,
  TbPlugConnected: TbPlugConnected,
  BiSolidReport: BiSolidReport,
};

const getIcon = (isEnabled: boolean, iconName: string) => {
  if (!isEnabled) {
    return (
      <Icon
        as={MdLock}
        boxSize="20px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color={"sc_white.300"}
      />
    );
  } else {
    const IconComponent: IconType = ICON_MAP[iconName];
    return (
      <Icon
        as={IconComponent}
        boxSize="20px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    );
  }
};
