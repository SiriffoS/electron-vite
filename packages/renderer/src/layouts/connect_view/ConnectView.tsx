import React, { useEffect, useState } from "react";
import { Flex, Button, SlideFade, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ICheckResult } from "_common/models/checkResult";
import { StepComponent } from "./components/stepComponent";
import { useSetupStates } from "../shared-components/useSetupStates";
import { CloseButton } from "../shared-components/closeButton";

interface SetupViewProps { }

//UpdateResults after all button clicks

export const ConnectView: React.FC<SetupViewProps> = () => {
  const navigate = useNavigate();

  const {
    setAbletonLiveInstalledCheckResult,
    setMidiScriptAlreadyCopiedCheckResult,
    setCopyMidiScriptCheckResult,
    dawConnectedCheckResult,
    setDawConnectedCheckResult,
    refreshCheckResults,
    abletonIsInstalled,
    isMidiScriptCopiedStatus,
    abletonHasBenOpenedAtleastOnce,
    setForceUpdate,
  } = useSetupStates();

  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  const handleCheckInstallationButtonClick = async () => {
    const checkResult: ICheckResult =
      await window.electronAPI.getAbletonLiveInstalledCheckResult();
    setAbletonLiveInstalledCheckResult(checkResult);
  };

  const handleOpenAbletonLiveClick = async () => {
    await window.electronAPI.getOpenAbletonLiveProjectCheckResult();
    setForceUpdate(true);
  };

  const handleAddPluginButtonClick = async () => {
    let alreadyCopiedCheckResult: ICheckResult =
      await window.electronAPI.getMidiScriptAlreadyCopiedCheckResult();

    if (!alreadyCopiedCheckResult.isCorrect) {
      const copyCheckResult: ICheckResult =
        await window.electronAPI.getCopyMidiScriptCheckResult();
      setCopyMidiScriptCheckResult(copyCheckResult);
      alreadyCopiedCheckResult =
        await window.electronAPI.getMidiScriptAlreadyCopiedCheckResult();
    }
    setMidiScriptAlreadyCopiedCheckResult(alreadyCopiedCheckResult);
  };

  useEffect(() => {
    refreshCheckResults({
      stopWhenError: false,
      nullifyMessageCorrect: true,
      nullifyMessageIncorrect: false,
      delayMs: 0,
    });
  }, []);

  const handleTryConnectionClick = async () => {
    const checkResult: ICheckResult = { isCorrect: false };
    const status: boolean = await window.electronAPI.getDawConnectionStatus();
    checkResult.isCorrect = status;
    checkResult.message = status
      ? "Studiocamp connected to Ableton Live"
      : "No connection";
    // await refreshCheckResults({
    //   stopWhenError: true,
    //   nullifyMessageCorrect: true,
    //   nullifyMessageIncorrect: false,
    //   delayMs: 0
    // });
    setDawConnectedCheckResult(checkResult);
  };
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefreshButtonClick = async () => {
    await refreshCheckResults({
      stopWhenError: false,
      nullifyMessageCorrect: true,
      nullifyMessageIncorrect: false,
      delayMs: 0,
    });
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <Flex flexDir="column">
      <Flex layerStyle={"controlBar"}>
        <CloseButton clickHandler={() => navigate(-1)}></CloseButton>
      </Flex>

      <Flex
        key={refreshKey}
        layerStyle={"mainContentContainer"}
        flexDir={"column"}
        minWidth={"1px"}
        width={"100%"}
        bg={"sc_black.500"}
      >
        <Flex direction="column" gap="md" alignItems={"center"}>
          <Box textStyle="h1" color="sc_white.200" alignSelf="stretch">
            Setup
          </Box>
          <Box textStyle="sh1" color="sc_white.50" alignSelf="stretch">
            Install Ableton Live, and setup the Studiocamp plugin.
          </Box>
        </Flex>
        <Button
          variant={"controlButtonFocused"}
          onClick={handleRefreshButtonClick}
        >
          Refresh all
        </Button>
        <SlideFade in={true} offsetX={"20px"} offsetY={"0px"} delay={0.0}>
          <StepComponent
            key={1}
            isEnabled={true}
            shouldStayFocused={false}
            checkResult={abletonIsInstalled}
            buttonClickHandler={handleCheckInstallationButtonClick}
            buttonText={"Check installation"}
            text={
              "Download and install Ableton Live 11 Suite (trial version is okay) *<a>www.ableton.com/live*"
            }
          ></StepComponent>
        </SlideFade>
        <SlideFade in={true} offsetX={"20px"} offsetY={"0px"} delay={0.1}>
          <StepComponent
            key={3}
            isEnabled={
              (abletonIsInstalled?.isCorrect ?? false) ||
              (!abletonHasBenOpenedAtleastOnce?.isCorrect ?? false)
            }
            checkResult={abletonHasBenOpenedAtleastOnce}
            shouldStayFocused={false}
            buttonClickHandler={handleOpenAbletonLiveClick}
            buttonText={"Open Ableton Live"}
            text={"Open Ableton Live"}
          ></StepComponent>
        </SlideFade>
        <SlideFade in={true} offsetX={"20px"} offsetY={"0px"} delay={0.05}>
          <StepComponent
            key={2}
            isEnabled={abletonHasBenOpenedAtleastOnce?.isCorrect ?? false}
            shouldStayFocused={false}
            checkResult={isMidiScriptCopiedStatus}
            buttonClickHandler={handleAddPluginButtonClick}
            buttonText={"Add plugin"}
            text="Add the Studiocamp plugin to Ableton Live"
            textList={[
              "Ensure that Ableton Live is not running",
              "Click on *-Add plugin*",
            ]}
          ></StepComponent>
        </SlideFade>
        <SlideFade in={true} offsetX={"20px"} offsetY={"0px"} delay={0.15}>
          <StepComponent
            key={4}
            isEnabled={isMidiScriptCopiedStatus?.isCorrect ?? false}
            shouldStayFocused={false}
            checkResult={dawConnectedCheckResult}
            buttonClickHandler={handleTryConnectionClick}
            buttonText={"Try connection..."}
            textList={[
              "Open the Ableton Live app",
              "Click inside Ableton Live to make it active",
              "In the top left corner of the screen, next to the Apple icon, click on the menu item labeled *-Live*",
              "From the dropdown menu, select *-Settings* (you can also use the shortcut ⌘ + ,)",
              "In the left sidebar, open the *-Link, Tempo, MIDI* tab",
              "Within the MIDI section, locate the *-Control Surface* table",
              "Below *-Control Surface* click on the first row where it says *-None*",
              "Choose *-Studiocamp* from the dropdown list",
            ]}
          ></StepComponent>
        </SlideFade>
        <SlideFade in={true} offsetX={"20px"} offsetY={"0px"} delay={0.2}>
          <StepComponent
            key={5}
            isEnabled={dawConnectedCheckResult?.isCorrect ?? false}
            checkResult={dawConnectedCheckResult}
            shouldStayFocused={true}
            buttonClickHandler={handleCloseButtonClick}
            buttonText={"Back to exercise"}
            text={"Setup completed"}
            alertEnabled={false}
          ></StepComponent>
        </SlideFade>
      </Flex>
    </Flex>
  );
};
