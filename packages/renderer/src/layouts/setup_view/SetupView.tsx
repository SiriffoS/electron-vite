import {
  Button,
  Collapse,
  Flex,
  Text,
  Icon,
  Progress,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertComponent } from "../shared-components/alertComponent";
import {
  StepStatus,
  StepStatusComponent,
} from "../shared-components/stepStatusComponent";
import { IoRocketSharp } from "react-icons/io5";
import { BsShieldLockFill, BsWrench } from "react-icons/bs";
import { PiPlugsFill } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdCloudDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Instructions } from "./Instructions";
import { formatText } from "./setupUtil";
import { BiDownload } from "react-icons/bi";
import { MoreOptionsButton } from "../shared-components/moreOptionsButtonComponent";
import useExerciseStore from "_/utils/stateStores/useExerciseStore";
import { ExerciseStatisticsContext } from "_/contexts/supabase/exerciseStatisticsContext";
import { ExerciseStatisticsHelper } from "_/contexts/supabase/exerciseStatisticsHelper";

interface SetupStep {
  checkButtonText?: string;
  continueButtonText?: string;
  heading: string;
  icon: JSX.Element;
  how: string[];
  why: string[];
  clickableContent?: JSX.Element;
  apiCall: () => Promise<any>; // You can further type this if needed
}
export const SetupView: React.FC = () => {
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [isAllowAppManagementClicked, setIsAllowAppManagementClicked] =
    useState(false);
  const exerciseStatisticsHelper = useContext<ExerciseStatisticsHelper | null>(
    ExerciseStatisticsContext,
  );

  const steps: SetupStep[] = [
    {
      checkButtonText: "Check Live Installation",
      heading: "Install Ableton Live 11 *!Free Trial* or *!Suite*",
      icon: (
        <Icon boxSize="60px" color="sc_yellow.100" as={IoMdCloudDownload} />
      ),
      how: [
        "Press button above to...",
        "...open the Ableton website ",
        "Click Download",
        "Install",
      ],
      why: [
        "You need Live 11 Trial or Suite installed to use Studiocamp.",
        "*!We suggest Live 11 Trial.*",
        "It's free and supports your entire learning process with Studiocamp ... forever.",
      ],
      clickableContent: (
        <Button
          transition="10ms linear"
          variant="controlButton"
          onClick={window.electronAPI.openHyperLink}
        >
          <Icon as={BiDownload} boxSize={"15px"} />
          Get Live 11 Free Trial
        </Button>
      ),
      apiCall: async () => {
        return await window.electronAPI.getAbletonLiveInstalledCheckResult();
      },
    },
    {
      checkButtonText: "Check Live Opened",
      heading: "*!Open* Ableton Live 11 And Wait For It To Load",
      icon: <Icon boxSize="60px" color="sc_yellow.100" as={IoRocketSharp} />,
      how: [
        "Open Finder.",
        "Go to Applications.",
        "Launch Ableton Live 11(Suite or Trial).",
        "*!Wait for it to load completely*.",
        "If it's your first time, follow the initial setup prompts.",
        "Click on ‘Check Live 11 Opened’ below",
      ],
      why: [
        "To make sure that your Ableton Live package has been verified by macOS.",
        "And the only way to do this to have you open Ableton Live.",
      ],
      apiCall: async () => {
        return await window.electronAPI.getAbletonLiveRunningCheckResult();
      },
    },
    {
      checkButtonText: "Check Live Closed",
      heading: "*!Close* Ableton Live Again",
      icon: (
        <Icon boxSize="60px" color="sc_yellow.100" as={AiFillCloseCircle} />
      ),
      how: ["Close Ableton Live", "Click on ‘Check Live 11 Closed’ below"],
      why: [
        "To complete you Ableton Live package verification.",
        "We know this seems a bit unnecessary...",
        "but it is a required step by  macOS",
      ],
      apiCall: async () => {
        return await window.electronAPI.getAbletonLiveClosedCheckResult();
      },
    },
    {
      checkButtonText: "Allow App Management",
      heading: "*!Allow* Studiocamp to Manage Apps",
      icon: <Icon boxSize="60px" color="sc_yellow.100" as={BsShieldLockFill} />,
      clickableContent: (
        <Flex gap="10px" alignItems="center">
          <StepStatusComponent
            status={isLinkClicked ? StepStatus.Done : undefined}
          ></StepStatusComponent>
          <Text
            textStyle="b1"
            color={"sc_white.200"}
            _hover={{ cursor: "pointer" }}
            textDecoration={"underline"}
            onClick={() => {
              setIsLinkClicked(true);
              window.electronAPI.openSetupAllowHyperlink();
            }}
          >
            Watch this video
          </Text>
        </Flex>
      ),
      how: [
        "*-Watch the video above*",
        "Press ‘*!Allow App Management*’ below",
        "Press *-Allow* in pop-up",
        "*-Toggle on* Studiocamp",
        "Enter password.",
        "Select *-Quit & Reopen*.",
      ],
      why: ["To allow Studiocamp to add a plugin to Ableton Live."],
      apiCall: async () => {
        setIsAllowAppManagementClicked(true);
        return await window.electronAPI.getCopyMidiScriptCheckResult();
      },
    },
    {
      heading: "*!Manually* Allow App Management ",
      icon: <Icon boxSize="60px" color="sc_yellow.100" as={BsWrench} />,
      clickableContent: (
        <Flex gap="10px" alignItems="center">
          <StepStatusComponent
            status={isLinkClicked ? StepStatus.Done : undefined}
          ></StepStatusComponent>
          <Text
            textStyle="b1"
            color={"sc_white.200"}
            _hover={{ cursor: "pointer" }}
            textDecoration={"underline"}
            onClick={() => {
              setIsLinkClicked(true);
              window.electronAPI.openSetupManuallyAllowHyperlink();
            }}
          >
            Watch this video
          </Text>
        </Flex>
      ),
      how: [
        "Click *-* in top menu.",
        "Open *-System Settings*.",
        "Go to *-Privacy & Security* tab.",
        "Select *-App Management* on the right.",
        "*-Toggle on* Studiocamp.",
        "Enter Mac *-password*.",
        "Select *-Quit & Reopen*",
      ],
      why: ["To allow Studiocamp to add a plugin to Ableton Live."],
      apiCall: async () => { },
    },
    {
      checkButtonText: "Check Connection",
      continueButtonText: "Start Making Music",
      heading: "Add Studiocamp *!Control Surface* in Ableton Live",
      icon: <Icon boxSize="60px" color="sc_yellow.100" as={PiPlugsFill} />,
      how: [
        "Launch Ableton Live",
        "Click on *-Live > Settings* (next to Apple icon in the top left of your screen)",
        "Go to *-Link, Tempo, MIDI* tab.",
        "In the Control Surface column, *-replace None with Studiocamp* in any row (If missing, restart Ableton & retry.)",
      ],
      why: [
        "To establish connection between Ableton Live and Studiocamp",
        "This enables Studiocamp to give you feedback on your actions.",
      ],
      apiCall: async () => {
        return await window.electronAPI.getDawConnectionStatus();
      },
    },
  ];
  const [dawConnectedCheckResult, setDawConnectedCheckResult] =
    useState<boolean>();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  // const [isVideoClicked, setVideoClicked] = useState(false);
  const location = useLocation();
  const { incrementAttempts, attempts, hintsUsed } =
    useExerciseStore();

  //testa denna!!
  useEffect(() => {
    const setCorrectView = async () => {
      const searchParams = new URLSearchParams(location.search);
      const continueSetup = searchParams.get("continue");
      let tempCurrentStepIndex = 0;

      if (continueSetup) {
        const midiscriptCopied =
          await window.electronAPI.getCopyMidiScriptCheckResult();

        tempCurrentStepIndex = midiscriptCopied.isCorrect
          ? steps.length - 1
          : steps.length - 2;
        setCurrentStepIndex(tempCurrentStepIndex);

        if (midiscriptCopied.isCorrect) {
          window.electronAPI.onDawConnectionStatusChange(
            (connectionStatus: boolean) => {
              setDawConnectedCheckResult(connectionStatus);
            },
          );
        }
      } else {
        const isAbletonLiveInstalled =
          await window.electronAPI.getAbletonLiveInstalledCheckResult();
        if (isAbletonLiveInstalled.isCorrect) {
          tempCurrentStepIndex = 1;
        }
        setCurrentStepIndex(tempCurrentStepIndex);
      }
      exerciseStatisticsHelper?.startExercise("0", tempCurrentStepIndex);
    };

    setCorrectView();
  }, []);

  useEffect(() => {
    if (dawConnectedCheckResult === true) {
      setMessage(
        "Congratulations. Studiocamp connected to Ableton Live. You're one step closer to mastering music production.",
      );
      setIsCorrect(true);
    }
  }, [dawConnectedCheckResult]);

  interface Step {
    apiCall: () => Promise<boolean | ApiResponse>;
  }

  interface ApiResponse {
    message: string;
    isCorrect: boolean;
  }

  const handleButtonClick = async (): Promise<void> => {
    const currentStep: Step = steps[currentStepIndex];
    const response: boolean | ApiResponse = await currentStep.apiCall();

    const updateStateAndMessage = (
      isCorrect: boolean,
      message: string,
    ): void => {
      setMessage(message);
      setIsCorrect(isCorrect);

      if (!isCorrect) {
        incrementAttempts();
      } else {
        exerciseStatisticsHelper?.endExercise("0", attempts, hintsUsed);
      }
    };

    if (typeof response === "boolean") {
      const successMessage =
        "Congratulations. Studiocamp connected to Ableton Live. You're one step closer to mastering music production.";
      const failureMessage = "No connection";
      updateStateAndMessage(
        response,
        response ? successMessage : failureMessage,
      );
    } else {
      updateStateAndMessage(response.isCorrect, response.message);
    }
  };

  const handleContinueClick = async (): Promise<void> => {
    // Determine the next step index
    const isLastStep = currentStepIndex === steps.length - 1;
    const nextStepIndex =
      currentStepIndex >= 3 ? steps.length - 1 : currentStepIndex + 1;

    // Handle the last step
    if (isLastStep) {
      navigate("/course/1");
      window.electronAPI.finishedSetup();
      // Consider navigating to a success page or showing a completion message here
    } else {
      // Update the step index and start the exercise for the next step
      setCurrentStepIndex(nextStepIndex);
      exerciseStatisticsHelper?.startExercise("0", nextStepIndex);
    }

    // Reset the UI state
    setMessage("");
    setIsCorrect(false);
    setIsLinkClicked(false);
  };

  const handleGoToManualSetupClick = async () => {
    setCurrentStepIndex(steps.length - 2);
    setMessage("");
    setIsCorrect(false);
    setIsLinkClicked(false);
  };

  const currentStep = steps[currentStepIndex];
  const progress = (100 * currentStepIndex) / steps.length;

  const navigate = useNavigate();
  return (
    <Flex flexDir="column">
      <Flex layerStyle={"controlBar"} justifyContent={"end"}>
        <Button
          transition="10ms linear"
          variant="controlButton"
          maxWidth="25px"
          onClick={() => navigate("/course/1")}
        >
          <Icon as={IoClose} boxSize={"15px"} />
        </Button>
        <Flex w="100%" justifyContent="flex-end" gap="5px">
          <MoreOptionsButton />
        </Flex>
      </Flex>

      <Flex
        // add padding: 10px 10px 20px 10px;
        p="10px 10px 20px 10px"
        gap="30px"
        flexDir="column"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Flex flexDir="row" width="100%" gap="10px" alignItems="center">
          <Flex textStyle="h1" color={"sc_white.200"}>
            Setup
          </Flex>
          <Progress variant={"track"} borderRadius="2px" value={progress} />
        </Flex>

        <Flex>{currentStep.icon}</Flex>
        <Text textStyle={"h0"} textAlign="center" color={"sc_white.50"}>
          {formatText(currentStep.heading)}
        </Text>
        <Flex flexDir={"column"} alignItems="center" gap={"20px"} w={"100%"}>
          {currentStep.clickableContent}
          <AccordionComponent
            title="How?"
            instructions={currentStep.how}
            changeIndex={currentStepIndex}
          />
          <AccordionComponent
            title="Why?"
            instructions={currentStep.why}
            changeIndex={currentStepIndex}
          />

          <Flex gap="10px" flexDir="column" width="100%">
            {currentStep.checkButtonText &&
              (!isCorrect ? (
                <Button
                  variant={"primaryButton"}
                  isDisabled={currentStepIndex === 3 && !isLinkClicked} // Disable the button for the step with the video if it's not clicked
                  onClick={handleButtonClick}
                >
                  {currentStep.checkButtonText}
                </Button>
              ) : (
                <Button variant="secondaryButton" onClick={handleContinueClick}>
                  {currentStep.continueButtonText
                    ? currentStep.continueButtonText
                    : "Continue"}
                </Button>
              ))}
            {message && currentStepIndex !== 3 && (
              <Collapse
                in={message !== null && message !== undefined}
                animateOpacity
              >
                <AlertComponent
                  visible={message !== ""}
                  text={message}
                  onClose={() => setMessage("")}
                  status={isCorrect ? StepStatus.Done : StepStatus.Error}
                ></AlertComponent>
              </Collapse>
            )}
          </Flex>
          {currentStepIndex === 3 && isAllowAppManagementClicked && (
            <>
              <SlideFade delay={0.5} in={true} offsetY="20px">
                <Flex gap="5px" alignItems="center" direction={"column"}>
                  <Text
                    textStyle="p1"
                    color={"sc_white.300"}
                    textAlign="center"
                  >
                    Not working?
                  </Text>
                  <Text
                    textStyle="b1"
                    color={"sc_white.200"}
                    _hover={{ cursor: "pointer" }}
                    textAlign="center"
                    onClick={() => handleGoToManualSetupClick()}
                  >
                    Go To Manual Setup
                  </Text>
                </Flex>
              </SlideFade>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

interface AccordionComponentProps {
  title: string;
  instructions: string[];
  changeIndex?: number;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({
  title,
  instructions,
  changeIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { incrementHintsUsed } = useExerciseStore();

  useEffect(() => {
    setIsOpen(false);
  }, [changeIndex]);

  return (
    //i want to remove the animation toggle when the change index changes
    <Accordion
      width="100%"
      allowToggle
      defaultIndex={1}
      index={isOpen ? 0 : 1}
      reduceMotion={true}
      color={isOpen ? "sc_white.50" : "sc_white.200"}
    >
      <AccordionItem>
        <AccordionButton
          p="5px"
          height={"25px"}
          onClick={() => {
            incrementHintsUsed();
            setIsOpen((prev) => !prev);
          }}
        >
          <Box as="span" textStyle="p1" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pl="10px" pr="0px" pt="5px" pb="5px" textStyle="sh1">
          <Instructions
            orderedList={title == "How?" ? true : false}
            instrictions={instructions}
          ></Instructions>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
