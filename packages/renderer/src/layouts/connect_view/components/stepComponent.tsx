import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Button,
  Collapse,
  UnorderedList,
  ListItem,
  OrderedList,
  Link,
} from "@chakra-ui/react";
import { ICheckResult } from "_common/models/checkResult";
import { AlertComponent } from "../../shared-components/alertComponent";
import {
  StepStatus,
  StepStatusComponent,
} from "../../shared-components/stepStatusComponent";

interface StepComponentProps {
  isEnabled: boolean;
  status?: StepStatus;
  shouldStayFocused: boolean;
  buttonClickHandler: () => void;
  buttonText?: string;
  checkResult?: ICheckResult;
  text?: string;
  textList?: string[];
  alertEnabled?: boolean;
  //alertMessage?: string[];
  //soundFileName?: string;
  //hints?: string[];
}

export const StepComponent: React.FC<StepComponentProps> = ({
  isEnabled = false,
  status: intialStatus = StepStatus.Locked,
  shouldStayFocused = false,
  buttonClickHandler,
  buttonText,
  text,
  checkResult,
  alertEnabled = true,
  textList,
}) => {
  const [status, setStatus] = useState(intialStatus);
  const [opacity, setOpacity] = useState(1);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    if (checkResult) {
      if (checkResult?.isCorrect) {
        setStatus(StepStatus.Done);
      } else {
        setStatus(StepStatus.Error);
      }
    }
  }, [checkResult]);

  useEffect(() => {
    let opacityResult = 1;
    if (isEnabled) {
      if (status === StepStatus.Done) {
        if (shouldStayFocused) {
          opacityResult = 1;
        } else {
          opacityResult = 0.5;
        }
      }
    } else {
      opacityResult = 0.2;
    }

    setOpacity((prev) => {
      if (prev !== opacityResult) {
        return opacityResult;
      }
      return prev;
    });
  }, [status, isEnabled]);

  const formatText = (text: string) => {
    const parts = text.split("*");

    return parts.map((part, index) => {
      if (part.startsWith("-")) {
        return (
          <Text as="span" fontWeight="bold" key={index}>
            {part.substring(1, part.length)}
          </Text>
        );
      } else if (part.startsWith("<a>")) {
        return (
          <Link key={index} onClick={() => window.electronAPI.openHyperLink()}>
            {part.substring(3, part.length)}
          </Link>
        );
      } else {
        return (
          <Text as="span" key={index}>
            {part}
          </Text>
        );
      }
    });
  };

  return (
    <Flex flexDir={"row"} gap={"md"} minWidth={"1px"} width={"100%"}>
      <StepStatusComponent status={status}></StepStatusComponent>
      <Flex flexDir={"column"} gap={"md"}>
        {text && (
          <Text opacity={opacity} textStyle={"p1"} color={"sc_white.50"}>
            {formatText(text)}
          </Text>
        )}
        {textList && (
          <OrderedList opacity={opacity} textStyle={"p1"} color={"sc_white.50"}>
            {textList.map((text, index) => (
              <ListItem key={index}>{formatText(text)}</ListItem>
            ))}
          </OrderedList>
        )}

        <Button
          variant={"standardButton"}
          isDisabled={!isEnabled}
          onClick={() => {
            buttonClickHandler();
            setIsAlertVisible(true);
          }}
          opacity={status === StepStatus.Done ? 0.5 : 1}
        >
          {buttonText}
        </Button>

        <Collapse
          in={
            alertEnabled &&
            checkResult?.message !== null &&
            checkResult?.message !== undefined &&
            isEnabled
          }
          animateOpacity
        >
          <AlertComponent
            status={status}
            text={checkResult?.message}
            visible={isAlertVisible}
            onClose={() => setIsAlertVisible(false)}
          ></AlertComponent>
        </Collapse>
      </Flex>
    </Flex>
  );
};
