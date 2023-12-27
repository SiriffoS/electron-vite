import { ICheckResult } from "_common/models/checkResult";
import { useState, useEffect } from "react";
import { SetupStatus } from "./setupStatusModel";

export const useSetupStates = () => {
  const [abletonLiveInstalledCheckResult, setAbletonLiveInstalledCheckResult] =
    useState<ICheckResult>();
  const [
    midiScriptAlreadyCopiedCheckResult,
    setMidiScriptAlreadyCopiedCheckResult,
  ] = useState<ICheckResult>();
  const [abletonLiveRunningCheckResult, setAbletonLiveRunningCheckResult] =
    useState<ICheckResult>();
  const [dawConnectedCheckResult, setDawConnectedCheckResult] =
    useState<ICheckResult>();
  const [copyMidiScriptCheckResult, setCopyMidiScriptCheckResult] =
    useState<ICheckResult>();
  const [openAbletonLiveCheckResult, setOpenAbletonLiveCheckResult] =
    useState<ICheckResult>();
  const [setupStatus, setSetupStatus] = useState<SetupStatus>();
  const [setupStatusText, setSetupStatusText] = useState<string>();
  const [abletonIsInstalled, setAbletonIsInstalled] = useState<ICheckResult>();
  const [isMidiScriptCopiedStatus, setIsMidiScriptCopiedStatus] =
    useState<ICheckResult>();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [abletonIsOpen, setAbletonIsOpen] = useState<ICheckResult>();

  useEffect(() => {
    window.electronAPI.abletonIsInstalled(
      (isInstalledCheckResult: ICheckResult) => {
        setAbletonIsInstalled(isInstalledCheckResult);
      },
    );
    window.electronAPI.isMidiScriptCopiedStatus(
      (copiedStatus: ICheckResult) => {
        setIsMidiScriptCopiedStatus(copiedStatus);
      },
    );
    // window.electronAPI.onDawConnectionStatusChange((connectionStatus: ICheckResult) => {
    // setDawConnectedCheckResult(connectionStatus)
    // });
  }, []);

  useEffect(() => {
    window.electronAPI.forceUpdate();
  }, [forceUpdate]);

  useEffect(() => {
    if (
      abletonIsInstalled?.isCorrect &&
      isMidiScriptCopiedStatus?.isCorrect &&
      dawConnectedCheckResult?.isCorrect
    ) {
      setSetupStatus(SetupStatus.Success);
      setSetupStatusText("Connected to Live");
    }
    //If we keep this else how will we know if that they didnt remove the midi script in Live instead of closing Live?
    /*    else if (abletonIsInstalled?.isCorrect && isMidiScriptCopiedStatus?.isCorrect) {
      setSetupStatus(SetupStatus.Default);
      setSetupStatusText("");
    }*/
    else {
      setSetupStatus(SetupStatus.Error);
      setSetupStatusText("Action needed");
    }
    if (!abletonIsInstalled?.isCorrect) {
      const temp: ICheckResult = {
        isCorrect: false,
      };
      setAbletonHasBenOpenedAtleastOnce(temp);
    }
  }, [abletonIsInstalled, isMidiScriptCopiedStatus, dawConnectedCheckResult]);

  useEffect(() => {
    window.electronAPI.abletonIsOpen((isOpen: ICheckResult) => {
      setAbletonIsOpen(isOpen);
    });
  }, []);

  const [abletonHasBenOpenedAtleastOnce, setAbletonHasBenOpenedAtleastOnce] =
    useState<ICheckResult>();
  useEffect(() => {
    if (abletonIsOpen?.isCorrect) {
      const temp: ICheckResult = {
        isCorrect: abletonIsOpen.isCorrect,
      };
      setAbletonHasBenOpenedAtleastOnce(temp);
    }
  }, [abletonIsOpen]);

  const refreshCheckResults = async (
    options = {
      stopWhenError: false,
      nullifyMessageCorrect: true,
      nullifyMessageIncorrect: true,
      delayMs: 0,
    },
  ) => {
    const update = async () => {
      const checkResult: ICheckResult = {
        isCorrect: false,
        message: undefined,
      };
      checkResult.isCorrect = await window.electronAPI.getDawConnectionStatus();

      checkResult.message = checkResult.isCorrect ? undefined : "No connection";

      if (options?.nullifyMessageCorrect && checkResult.isCorrect) {
        checkResult.message = undefined;
      }
      if (options?.nullifyMessageIncorrect && !checkResult.isCorrect) {
        checkResult.message = undefined;
      }
      setDawConnectedCheckResult(checkResult);
      if (options?.stopWhenError && !checkResult.isCorrect) {
        return;
      }
    };

    setTimeout(
      () => {
        update();
      },
      options?.delayMs,
    );
  };

  const checkAbletonLiveProcessWithTimeout = async (
    checkOpened = false,
    checkClosed = false,
  ) => {
    let runningCheckResult: ICheckResult =
      await window.electronAPI.getAbletonLiveRunningCheckResult();

    const intervalDuration = 1000; // 1000 ms (1 second)
    const maxCheckDuration = 10000; // 10000 ms (10 seconds)

    const intervalId = setInterval(async () => {
      runningCheckResult =
        await window.electronAPI.getAbletonLiveRunningCheckResult();
      if (checkClosed && !runningCheckResult.isCorrect) {
        clearInterval(intervalId);
        setAbletonLiveRunningCheckResult(runningCheckResult);
      }
      if (checkOpened && runningCheckResult.isCorrect) {
        clearInterval(intervalId);
        setAbletonLiveRunningCheckResult(runningCheckResult);
      }
    }, intervalDuration);

    setTimeout(() => {
      clearInterval(intervalId);
    }, maxCheckDuration);
  };

  useEffect(() => {
    const updateDawConnectionStatus = async (isConnected: boolean) => {
      const checkResult: ICheckResult = { isCorrect: isConnected };
      checkResult.message = isConnected
        ? "Studiocamp connected to Ableton Live"
        : "No connection";

      setDawConnectedCheckResult(checkResult);

      if (checkResult.isCorrect) {
        setSetupStatus(SetupStatus.Success);
        setSetupStatusText("Connected");
        refreshCheckResults({
          stopWhenError: false,
          nullifyMessageCorrect: true,
          nullifyMessageIncorrect: false,
          delayMs: 2000,
        });
      } else {
        setSetupStatus(SetupStatus.Default);
        // setSetupStatusText("Disconnected");
        refreshCheckResults({
          stopWhenError: false,
          nullifyMessageCorrect: true,
          nullifyMessageIncorrect: false,
          delayMs: 8000,
        });
      }
    };
    const addDawConnectionStatusListener = async () => {
      window.electronAPI.onDawConnectionStatusChange(updateDawConnectionStatus);
    };
    // if (abletonLiveRunningCheckResult?.isCorrect) {
    //   addDawConnectionStatusListener();
    // }
    addDawConnectionStatusListener();
    return () => {
      window.electronAPI.removeDawConnectionStatusListener(
        updateDawConnectionStatus,
      );
    };
  }, []);

  return {
    abletonLiveInstalledCheckResult,
    setAbletonLiveInstalledCheckResult,
    midiScriptAlreadyCopiedCheckResult,
    setMidiScriptAlreadyCopiedCheckResult,
    copyMidiScriptCheckResult,
    setCopyMidiScriptCheckResult,
    abletonLiveRunningCheckResult,
    setAbletonLiveRunningCheckResult,
    openAbletonLiveCheckResult,
    setOpenAbletonLiveCheckResult,
    dawConnectedCheckResult,
    setDawConnectedCheckResult,
    refreshCheckResults,
    checkAbletonLiveProcessWithTimeout,
    setupStatus,
    setupStatusText,
    abletonIsInstalled,
    isMidiScriptCopiedStatus,
    setForceUpdate,
    abletonIsOpen,
    abletonHasBenOpenedAtleastOnce,
  };
};
