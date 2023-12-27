import { useNavigate } from "react-router-dom";
import { useSetupStates } from "./useSetupStates";
import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { SetupStatus } from "./setupStatusModel";

interface SetupStatusComponentProps {
  clickHandler?: () => void;
}

export const SetupStatusComponent: React.FC<SetupStatusComponentProps> = ({
  clickHandler,
}) => {
  const navigate = useNavigate();
  const { refreshCheckResults, setupStatus, setupStatusText } =
    useSetupStates();

  useEffect(() => {
    refreshCheckResults({
      stopWhenError: true,
      nullifyMessageCorrect: false,
      nullifyMessageIncorrect: false,
      delayMs: 0,
    });
  }, []);

  const [showText, setShowText] = useState(setupStatus === SetupStatus.Error);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (showText && setupStatus !== SetupStatus.Error) {
      const timer = setTimeout(() => {
        setShowText(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showText, setupStatus]);

  useEffect(() => {
    setShowText(true);
  }, [setupStatus]);

  useEffect(() => {
    if (setupStatus !== SetupStatus.Error) {
      setIsHover(true);
      setTimeout(() => {
        setIsHover(false);
      }, 2000);
    } else {
      setIsHover(true);
    }
  }, [setupStatus]);

  return (
    <Flex
      // alignItems="center"
      justifyContent="flex-end"
      flexDir="row"
      gap={"md"}
      height={"25px"}
      width={"100%"}
    >
      {setupStatusText && (
        <Text
          alignSelf={"center"}
          textStyle="h1"
          color={
            setupStatus === SetupStatus.Success
              ? "sc_green.300"
              : setupStatus === SetupStatus.Error
                ? "sc_red.400"
                : "sc_white.200"
          }
          style={{
            opacity: isHover || showText ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {setupStatusText}
        </Text>
      )}
      <Button
        variant={
          setupStatus === SetupStatus.Success
            ? "setupStatusButtonSuccess"
            : setupStatus === SetupStatus.Error
              ? "setupStatusButtonError"
              : "setupStatusButtonDefault"
        }
        //maxWidth={isHover || showText ? "auto" : "25px"}

        onClick={clickHandler ? clickHandler : () => navigate("/connect")}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          if (setupStatus !== SetupStatus.Error) {
            setIsHover(false);
          }
        }}
      >
        <Icon
          as={RxDotFilled}
          boxSize={"15px"}
          transition="all 0.3s ease-in-out"
          transform={isHover || setupStatus ? "scale(1.4)" : "scale(1)"}
        />
      </Button>
    </Flex>
  );
};
