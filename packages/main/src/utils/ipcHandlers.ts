import { ipcMain, IpcMainInvokeEvent, shell } from "electron";
import { Course } from "_common/models/course";
import { Criterion } from "_common/models/criterion";
import { Exercise } from "_common/models/exercise";
//import { Hint } from "_common/models/hint";
import { Level } from "_common/models/level";
import { Section } from "_common/models/section";
import {
  getSections,
  getCoursesBySectionId,
  getCourseById,
  getLevelById,
  getLevelsByCourseId,
  getExerciseById,
  getExercisesByLevelId,
  getTaskById,
  getTasksByExerciseId,
  //getHintsByTaskId
} from "./csv/csv-loader";


import ProgressStore from "../utils/progressStore";
import { Task } from "_common/models/task";
import { window } from "_/mainWindow";
import { ICheckResult } from "_common/models/checkResult";
import { getSolutionCriteriaByTaskId } from "./criteria/solutionCriteriaByTaskId";
import { getProjectCriteriaByTaskId } from "./criteria/projectCriteriaByTaskId";

import _ from "lodash";
import { openProjectAndCleanUp, openProjectAndCleanUpCheckResult } from "../ableton-live/project-handlers/project-handler";
import { abletonEventEmitter } from "../ableton-live";
import { checkCriteria } from "../ableton-live/checkers";
import { setSongIsPlayingStatus } from "../ableton-live/setters";
import { isAbleTonLiveRunning, isAbleTonLiveClosed } from "../ableton-live/setup/ableton-live-app-process-handler";
import { abletonLiveInstalledCheckResult } from "../ableton-live/setup/ableton-live-installation-handler";
import { copyDirectory, readCompletionTime, isMidiScriptCopied, midiScriptAlreadyCopiedCheckResult, copyMidiScriptCheckResult } from "../ableton-live/setup/midi-script-folder-handler";
import { setWindowsSideBySide } from "./windowHandler";
const progressStore = ProgressStore.getInstance();
import {screen} from 'electron'

let lastPosition: number[];
let lastHeight: number;

const homeUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://account.studiocamp.io";

export const registerIpcHandlers = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
const { width, height } = primaryDisplay.workAreaSize;
const fullScreenHeight = height;
const fullScreenWidth = width;
  ipcMain.handle("get-sections", sendSectionsToRenderer);
  ipcMain.handle("get-courses-by-section-id", sendCoursesBySectionIdToRenderer);
  ipcMain.handle("get-course-by-id", sendCourseByIdToRenderer);
  ipcMain.handle("get-level-by-id", sendLevelByIdToRenderer);
  ipcMain.handle("get-levels-by-course-id", sendLevelsByCourseIdToRenderer);
  ipcMain.handle("get-exercise-by-id", sendExerciseByIdToRenderer);
  ipcMain.handle("get-exercises-by-level-id", sendExercisesByLevelIdToRenderer);
  ipcMain.handle("get-task-by-id", sendTaskByIdToRenderer);
  ipcMain.handle("get-tasks-by-exercise-id", sendTasksByExerciseIdToRenderer);
  //ipcMain.handle("get-hints-by-task-id", sendHintsByTaskIdToRenderer);
  ipcMain.handle(
    "get-solution-verification-result-by-task-id",
    sendSolutionVerificationResultByTaskIdToRenderer,
  );
  ipcMain.handle(
    "get-project-verification-result-by-task-id",
    sendProjectVerificationResultByTaskIdToRenderer,
  );
  ipcMain.handle("open-start-project-by-task-id", openStartProjectByTaskId);
  ipcMain.handle("get-daw-connection-status", async () => dawIsConnectedCache);
  ipcMain.handle("get-daw-is-playing-status", async () => dawIsPlayingStatus);
  ipcMain.handle("set-daw-is-playing-status", setDawIsPlayingStatus);
  ipcMain.handle("copy-directory-start", async (event) => {
    try {
      await copyDirectory();
      return "success";
    } catch (error) {
      return "error";
    }
  });
  ipcMain.handle(
    "get-midi-script-last-copied-time",
    sendMidiScriptLastCopiedTimeToRenderer,
  );
  ipcMain.handle("get-is-midi-script-copied", sendIsMidiScriptCopiedToRenderer);
  ipcMain.handle("has-watch-exercise", (event, exerciseId) => {
    return progressStore.hasWatchedExercise(exerciseId);
  });
  ipcMain.handle("update-watched-exercise", (event, exerciseId) => {
    progressStore.updateWatchedExercise(exerciseId);
  });
  ipcMain.handle(
    "get-ableton-live-installed-check-result",
    isAbleTonLiveInstalled,
  );
  ipcMain.handle(
    "get-midi-script-already-copied-check-result",
    midiScriptCopied,
  );
  ipcMain.handle(
    "get-copy-midi-script-check-result",
    sendCopyMidiScriptCheckResultToRenderer,
  );
  ipcMain.handle("get-ableton-live-running-check-result", isbletonLiveRunning);
  ipcMain.handle("get-ableton-live-closed-check-result", isbletonLiveClosed);
  ipcMain.handle(
    "get-open-ableton-live-project-check-result",
    sendOpenProjectAndCleanUpCheckResultToRenderer,
  );
  ipcMain.on("open-ableton-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://www.ableton.com/en/trial/");
  });
  ipcMain.on("open-setup-allow-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://youtu.be/hsnsSzvWK-s");
  });
  ipcMain.on("open-setup-manually-allow-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://youtu.be/xirl5zeMpj0");
  });
  ipcMain.on("open-discord-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://studiocamp.io/discord");
  });
  ipcMain.on("open-general-feedback-survey", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://forms.gle/jF2M9cp4GD1XgCAM7");
  });
  ipcMain.on("open-review-survey", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal("https://forms.gle/TikU6bYPw6ovCzNC6");
  });
  ipcMain.on("open-buy-beginner-course-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal(homeUrl + "/unlocok");
  });

  ipcMain.on("open-account-hyperlink", () => {
    //possibly change hyperlinks to switch statement
    shell.openExternal(homeUrl + "/account");
  });

  ipcMain.handle("set-side-by-side", setSideBySide);
  ipcMain.on("open-login", () => {
    //possibly change hyperlinks to switch statement
    // Make axios req??
    shell.openExternal("http://localhost:3000?jwt=123");
  });

  ipcMain.handle("get-tokens", () => {
    return progressStore.getTokens();
  });
  ipcMain.handle("set-tokens", (event, refreshToken, accessToken) => {
    return progressStore.setTokens(refreshToken, accessToken);
  });
  // End of registerIpcHandlers - should it include all the functions below? ************

  ipcMain.handle("should-continue-setup", shouldContinueSetup);
  ipcMain.handle("has-finished-setup", () => {
    return progressStore.hasFinishedSetup();
  });

  ipcMain.on("finished-setup", () => {
    progressStore.finishedSetup();
  });

  // Function to get course progress
  ipcMain.handle("get-course-progress", (event, courseId) => {
    return progressStore.getCourseProgress(courseId);
  });

  // Function to get level progress
  ipcMain.handle("get-level-progress", (event, courseId, levelId) => {
    return progressStore.getLevelProgress(courseId, levelId);
  });

  ipcMain.handle(
    "get-level-progress-percentage",
    (event, courseId, levelId) => {
      return progressStore.getLevelProgressPercentage(courseId, levelId);
    },
  );

  // Function to set exercise progress
  ipcMain.handle(
    "set-exercise-completed",
    (event, courseId, levelId, exerciseId) => {
      progressStore.setExerciseCompleted(courseId, levelId, exerciseId);
    },
  );

  // Function to get exercise progress
  ipcMain.handle(
    "get-exercise-progress",
    (event, courseId, levelId, exerciseId) => {
      return progressStore.getExerciseProgress(courseId, levelId, exerciseId);
    },
  );
  ipcMain.handle("set-computer-id", (event, id) => {
    progressStore.setComputerId(id);
  });

  ipcMain.handle("get-computer-id", () => {
    return progressStore.getComputerId();
  });
  ipcMain.on("resize-to-normal", () => {
    if (window) {
      window.setSize(200, lastHeight);
      window.setMaximumSize(200, 2000);
      if (lastPosition) {
        window.setPosition(lastPosition[0], lastPosition[1], true);
      }
    }
  });

  ipcMain.on("resize-to-fullscreen", () => {
    if (window) {
      lastPosition = window.getPosition();
      lastHeight = window.getSize()[1];
      window.setMaximumSize(fullScreenWidth, fullScreenHeight);
      window.setSize(fullScreenWidth, fullScreenHeight);
      window.center();
      window.webContents.setZoomFactor(1);
    }
  });

  ipcMain.handle("getScreenSize", () => {
    return [fullScreenHeight, fullScreenWidth];
  });
};
function shouldContinueSetup() {
  const hasAskedForAppManagementPermission =
    progressStore.hasAskedForAppManagementPermission();
  const hasFinishedSetup = progressStore.hasFinishedSetup();
  return !hasFinishedSetup && hasAskedForAppManagementPermission;
}

function validateSender(frame: Electron.WebFrameMain) {
  if (new URL(frame.url).protocol === "file:" || import.meta.env.DEV) return true;
  return false;
}

async function sendSectionsToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Section[]> {
  if (validateSender(event.senderFrame)) {
    const sections: Section[] = await getSections();
    return Promise.resolve(sections);
  }
  return new Promise(() => {});
}

async function sendCoursesBySectionIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Course[]> {
  if (validateSender(event.senderFrame)) {
    const sectionId: number = args[0];
    const courses: Course[] = await getCoursesBySectionId(sectionId);
    return Promise.resolve(courses);
  }
  return new Promise(() => {});
}

async function sendCourseByIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Course> {
  if (validateSender(event.senderFrame)) {
    const courseId: number = args[0];
    const course: Course = await getCourseById(courseId);
    return Promise.resolve(course);
  }
  return new Promise(() => {});
}

async function sendLevelByIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Level> {
  if (validateSender(event.senderFrame)) {
    const levelId: number = args[0];
    const level: Level = await getLevelById(levelId);
    return Promise.resolve(level);
  }
  return new Promise(() => {});
}

async function sendLevelsByCourseIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Level[]> {
  if (validateSender(event.senderFrame)) {
    const courseId: number = args[0];
    const levels: Level[] = await getLevelsByCourseId(courseId);
    return Promise.resolve(levels);
  }
  return new Promise(() => {});
}

async function sendExerciseByIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Exercise> {
  if (validateSender(event.senderFrame)) {
    const exerciseId: number = args[0];
    const exercise: Exercise = await getExerciseById(exerciseId);
    return Promise.resolve(exercise);
  }
  return new Promise(() => {});
}

async function sendExercisesByLevelIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Exercise[]> {
  if (validateSender(event.senderFrame)) {
    const levelId: number = args[0];
    const exercises: Exercise[] = await getExercisesByLevelId(levelId);
    return Promise.resolve(exercises);
  }
  return new Promise(() => {});
}
async function sendTaskByIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Task> {
  if (validateSender(event.senderFrame)) {
    const taskId: number = args[0];
    const task: Task = await getTaskById(taskId);
    return Promise.resolve(task);
  }
  return new Promise(() => {});
}
async function sendTasksByExerciseIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<Task[]> {
  if (validateSender(event.senderFrame)) {
    const exerciseId: number = args[0];
    const tasks: Task[] = await getTasksByExerciseId(exerciseId);
    return Promise.resolve(tasks);
  }
  return new Promise(() => {});
}
async function sendSolutionVerificationResultByTaskIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> {
  if (validateSender(event.senderFrame)) {
    const taskId: number = args[0];
    const criteria: Criterion[] = await getSolutionCriteriaByTaskId(taskId);
    const verificationResult: ICheckResult = await checkCriteria(criteria);
    return Promise.resolve(verificationResult);
  }
  return new Promise(() => {});
}

async function sendProjectVerificationResultByTaskIdToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> {
  if (validateSender(event.senderFrame)) {
    const taskId: number = args[0];
    const criteria: Criterion[] = await getProjectCriteriaByTaskId(taskId);
    const verificationResult: ICheckResult = await checkCriteria(criteria);
    return Promise.resolve(verificationResult);
  }
  return new Promise(() => {});
}

async function openStartProjectByTaskId(
  event: IpcMainInvokeEvent,
  ...args: any[]
) {
  if (validateSender(event.senderFrame)) {
    const taskId: number = args[0];
    const task: Task = await getTaskById(taskId);
    openProjectAndCleanUp(task.projectFolderName, task.startFile);
  }
}

let dawIsConnectedCache = false;
abletonEventEmitter.on("connection", (isConnected) => {
  if (window) {
    if (forceUpdate === true || isConnected !== dawIsConnectedCache) {
      window.webContents.send("daw-connection-status", isConnected);
      dawIsConnectedCache = isConnected;
    }
  }
});

let dawIsPlayingStatus = false;

abletonEventEmitter.on("is-playing-status", (isPlaying) => {
  dawIsPlayingStatus = isPlaying;
  if (window) {
    window.webContents.send("is-playing-status", isPlaying);
  }
});
let cacheOpened: ICheckResult;
setInterval(async () => {
  if (window) {
    const checkResult: ICheckResult = await isAbleTonLiveRunning();
    if (forceUpdate === true || !_.isEqual(cacheOpened, checkResult)) {
      window.webContents.send("ableton-is-open", checkResult);
      cacheOpened = checkResult;
    }
  }
}, 1000);

let cacheInstalled: ICheckResult;
setInterval(async () => {
  if (window) {
    const checkResult: ICheckResult = await isAbleTonLiveInstalled();
    if (forceUpdate === true || !_.isEqual(cacheInstalled, checkResult)) {
      window.webContents.send("ableton-is-installed", checkResult);
      cacheInstalled = checkResult;
    }
  }
}, 500);

let cacheCopied: ICheckResult;
setInterval(async () => {
  if (window) {
    const checkResult: ICheckResult = await midiScriptCopied();
    if (forceUpdate === true || !_.isEqual(cacheCopied, checkResult)) {
      window.webContents.send("is-midi-script-copied-status", checkResult);
      cacheCopied = checkResult;
    }
  }
}, 500);

let forceUpdate = false;
ipcMain.on("force-update", () => {
  forceUpdate = true;
  setTimeout(function () {
    forceUpdate = false;
  }, 2000);
});

async function setDawIsPlayingStatus(
  event: IpcMainInvokeEvent,
  ...args: any[]
) {
  if (validateSender(event.senderFrame)) {
    const isPlayingStatus: boolean = args[0];
    if (dawIsConnectedCache === true) {
      await setSongIsPlayingStatus(isPlayingStatus);
    }
  }
}

async function sendMidiScriptLastCopiedTimeToRenderer() {
  try {
    const completionTime = await readCompletionTime();
    return completionTime;
  } catch (error) {
    return "error";
  }
}

async function sendIsMidiScriptCopiedToRenderer(
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<boolean> {
  if (validateSender(event.senderFrame)) {
    return Promise.resolve(isMidiScriptCopied());
  }
  return new Promise(() => {});
}

const isAbleTonLiveInstalled = async (): Promise<ICheckResult> => {
  const checkResult: ICheckResult = await abletonLiveInstalledCheckResult();
  return Promise.resolve(checkResult);
};

const midiScriptCopied = async (): Promise<ICheckResult> => {
  const checkResult: ICheckResult = await midiScriptAlreadyCopiedCheckResult();
  return Promise.resolve(checkResult);
};

const sendCopyMidiScriptCheckResultToRenderer = async (
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> => {
  if (validateSender(event.senderFrame)) {
    const checkResult: ICheckResult = await copyMidiScriptCheckResult();
    return Promise.resolve(checkResult);
  }
  return new Promise(() => {});
};

const isbletonLiveRunning = async (
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> => {
  if (validateSender(event.senderFrame)) {
    const checkResult: ICheckResult = await isAbleTonLiveRunning();
    return Promise.resolve(checkResult);
  }
  return new Promise(() => {});
};

const isbletonLiveClosed = async (
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> => {
  if (validateSender(event.senderFrame)) {
    const checkResult: ICheckResult = await isAbleTonLiveClosed();
    return Promise.resolve(checkResult);
  }
  return new Promise(() => {});
};

const sendOpenProjectAndCleanUpCheckResultToRenderer = async (
  event: IpcMainInvokeEvent,
  ...args: any[]
): Promise<ICheckResult> => {
  if (validateSender(event.senderFrame)) {
    const checkResult: ICheckResult = await openProjectAndCleanUpCheckResult(
      "Setup Project",
      "Setup project.als",
    );
    return Promise.resolve(checkResult);
  }
  return new Promise(() => {});
};

export function broadcastTokensSet() {
  window?.webContents.send("tokens-set");
}

function setSideBySide() {
  setWindowsSideBySide();
  return new Promise(() => {});
}
