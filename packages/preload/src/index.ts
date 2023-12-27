// eslint-disable-next-line import/no-extraneous-dependencies
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getSections: () => ipcRenderer.invoke("get-sections"),
  getSectionById: (sectionId: number) =>
    ipcRenderer.invoke("get-section-by-id", sectionId),
  getCoursesBySectionId: (sectionId: number) =>
    ipcRenderer.invoke("get-courses-by-section-id", sectionId),
  getCourseById: (courseId: number) =>
    ipcRenderer.invoke("get-course-by-id", courseId),
  getLevelById: (levelId: number) =>
    ipcRenderer.invoke("get-level-by-id", levelId),
  getExerciseById: (exerciseId: number) =>
    ipcRenderer.invoke("get-exercise-by-id", exerciseId),
  getTaskById: (taskId: number) => ipcRenderer.invoke("get-task-by-id", taskId),
  getLevelsByCourseId: (courseId: number) =>
    ipcRenderer.invoke("get-levels-by-course-id", courseId),
  getExercisesByLevelId: (levelId: number) =>
    ipcRenderer.invoke("get-exercises-by-level-id", levelId),
  getTasksByExerciseId: (exerciseId: number) =>
    ipcRenderer.invoke("get-tasks-by-exercise-id", exerciseId),
  getSolutionVerificationResultByTaskId: (taskId: number) =>
    ipcRenderer.invoke("get-solution-verification-result-by-task-id", taskId),
  getProjectVerificationResultByTaskId: (taskId: number) =>
    ipcRenderer.invoke("get-project-verification-result-by-task-id", taskId),
  getDawEventResponsesByTaskId: (taskId: number) =>
    ipcRenderer.invoke("get-daw-event-responses-by-task-id", taskId),
  getDawInitialisersByTaskId: (taskId: number) =>
    ipcRenderer.invoke("get-daw-initialisers-by-task-id", taskId),
  getHintsByTaskId: (taskId: number) =>
    ipcRenderer.invoke("get-hints-by-task-id", taskId),
  openProjectByFilePath: (filepath: string) =>
    ipcRenderer.invoke("open-project-by-file-path", filepath),
  openStartProjectByTaskId: (taskId: number) =>
    ipcRenderer.invoke("open-start-project-by-task-id", taskId),
  getDawConnectionStatus: () => ipcRenderer.invoke("get-daw-connection-status"),
  onDawConnectionStatusChange: (callback: (isConnected: boolean) => void) =>
    ipcRenderer.on("daw-connection-status", (_, isConnected) => {
      callback(isConnected);
    }),
  removeDawConnectionStatusListener: (
    callback: (isConnected: boolean) => void,
  ) => ipcRenderer.removeListener("daw-connection-status", callback),
  getDawIsPlayingStatus: () => ipcRenderer.invoke("get-daw-is-playing-status"),
  setDawIsPlayingStatus: (isPlayingStatus: boolean) =>
    ipcRenderer.invoke("set-daw-is-playing-status", isPlayingStatus),
  onDawIsPlayingStatusChange: (callback: (isPlayingStatus: boolean) => void) =>
    ipcRenderer.on("is-playing-status", (_, isPlayingStatus) =>
      callback(isPlayingStatus),
    ),
  abletonIsOpen: (callback: (abletonIsOpen: boolean) => void) =>
    ipcRenderer.on("ableton-is-open", (_, abletonIsOpen) =>
      callback(abletonIsOpen),
    ),
  removeIsPlayingStatusListener: (callback: (isPlaying: boolean) => void) =>
    ipcRenderer.removeListener("is-playing-status", callback),
  invokeCopyDirectory: async () => {
    const result = await ipcRenderer.invoke("copy-directory-start");
    return result;
  },
  getMidiScriptLastCopiedTime: async () => {
    await ipcRenderer.invoke("get-midi-script-last-copied-time");
  },
  getIsMidiScriptCopied: () => ipcRenderer.invoke("get-is-midi-script-copied"),

  isMidiScriptCopiedStatus: (callback: (isMidiScriptCopied: boolean) => void) =>
    ipcRenderer.on("is-midi-script-copied-status", (_, isMidiScriptCopied) =>
      callback(isMidiScriptCopied),
    ),

  hasWatchedExercise: (exerciseId: string) => {
    return ipcRenderer.invoke("has-watch-exercise", exerciseId);
  },
  updateWatchedExercise: (exerciseId: string) => {
    ipcRenderer.invoke("update-watched-exercise", exerciseId);
  },
  resizeToFullscreen: () => {
    ipcRenderer.send("resize-to-fullscreen");
  },

  resizeToNormalSize: () => {
    ipcRenderer.send("resize-to-normal");
  },
  getScreenSize: () => {
    return ipcRenderer.invoke("getScreenSize");
  },
  getAbletonLiveInstalledCheckResult: () => {
    return ipcRenderer.invoke("get-ableton-live-installed-check-result");
  },
  abletonIsInstalled: (callback: (abletonIsInstalled: boolean) => void) =>
    ipcRenderer.on("ableton-is-installed", (_, abletonIsInstalled) =>
      callback(abletonIsInstalled),
    ),
  getMidiScriptAlreadyCopiedCheckResult: () => {
    return ipcRenderer.invoke("get-midi-script-already-copied-check-result");
  },
  getCopyMidiScriptCheckResult: () => {
    return ipcRenderer.invoke("get-copy-midi-script-check-result");
  },
  getAbletonLiveRunningCheckResult: () => {
    return ipcRenderer.invoke("get-ableton-live-running-check-result");
  },
  getAbletonLiveClosedCheckResult: () => {
    return ipcRenderer.invoke("get-ableton-live-closed-check-result");
  },
  getOpenAbletonLiveProjectCheckResult: () => {
    return ipcRenderer.invoke("get-open-ableton-live-project-check-result");
  },
  forceUpdate: () => {
    ipcRenderer.send("force-update");
  },
  openHyperLink: () => {
    ipcRenderer.send("open-ableton-hyperlink");
  },
  openSetupAllowHyperlink: () => {
    ipcRenderer.send("open-setup-allow-hyperlink");
  },
  openSetupManuallyAllowHyperlink: () => {
    ipcRenderer.send("open-setup-manually-allow-hyperlink");
  },
  shouldContinueSetup: () => {
    return ipcRenderer.invoke("should-continue-setup");
  },
  finishedSetup: () => {
    ipcRenderer.send("finished-setup");
  },
  hasFinishedSetup: () => {
    return ipcRenderer.invoke("has-finished-setup");
  },
  openDiscordHyperlink: () => {
    ipcRenderer.send("open-discord-hyperlink");
  },
  openGeneralFeedbackSurvey: () => {
    ipcRenderer.send("open-general-feedback-survey");
  },
  openReviewSurvey: () => {
    ipcRenderer.send("open-review-survey");
  },
  openBuyBeginnerCourseHyperLink: () => {
    ipcRenderer.send("open-buy-beginner-course-hyperlink");
  },
  openAccountHyperlink: () => {
    ipcRenderer.send("open-account-hyperlink");
  },

  openLogin: () => {
    ipcRenderer.send("open-login");
  },
  getTokens: () => {
    return ipcRenderer.invoke("get-tokens");
  },
  setTokens: (accessToken: string, refreshToken: string) => {
    return ipcRenderer.invoke("set-tokens", accessToken, refreshToken);
  },
  setWindowsSideBySide: () => {
    return ipcRenderer.invoke("set-side-by-side");
  },
  // Expose the get course progress function
  getCourseProgress: (courseId: number) =>
    ipcRenderer.invoke("get-course-progress", courseId),

  // Expose the get level progress function
  getLevelProgress: (courseId: number, levelId: number) =>
    ipcRenderer.invoke("get-level-progress", courseId, levelId),

  getLevelProgressPercentage: (courseId: number, levelId: number) =>
    ipcRenderer.invoke("get-level-progress-percentage", courseId, levelId),

  // Expose the set exercise progress function
  setExerciseCompleted: (
    courseId: number,
    levelId: number,
    exerciseId: number,
  ) => {
    //check types and convert if not working
    ipcRenderer.invoke("set-exercise-completed", courseId, levelId, exerciseId);
  },
  setComputerId: (id: string) => {
    ipcRenderer.invoke("set-computer-id", id);
  },
  getComputerId: () => {
    return ipcRenderer.invoke("get-computer-id");
  },
  onTokensSet: (callback: () => void) => {
    ipcRenderer.on("tokens-set", callback);
  },
  getExerciseProgress: (
    courseId: number,
    levelId: number,
    exerciseId: number,
  ) =>
    ipcRenderer.invoke("get-exercise-progress", courseId, levelId, exerciseId),
});
