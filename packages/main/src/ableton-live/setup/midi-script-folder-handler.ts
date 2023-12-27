import fs from "fs-extra";
import path from "path";
import { ICheckResult } from "_common/models/checkResult";
import { getAbletonLiveAppPaths } from "./ableton-live-installation-handler";
import ProgressStore from "_/utils/progressStore";
import { app } from "electron";
const progressStore = ProgressStore.getInstance();

//import { dev } from "./node-env";
// const log = require("electron-log");

export async function midiScriptAlreadyCopiedCheckResult(
  options: { quickSearch?: boolean; useCache?: boolean } = {},
): Promise<ICheckResult> {
  const { quickSearch = true, useCache = false } = options;

  const checkResult: ICheckResult = { isCorrect: false };

  const abletonLiveAppPaths = await getAbletonLiveAppPaths({
    quickSearch: quickSearch,
    useCache: useCache,
  });

  if (!abletonLiveAppPaths.length) {
    checkResult.message = "No Ableton Live 11 instances found.";
    return checkResult;
  }

  const instancesWithMidiScript: string[] = [];
  const instancesWithoutMidiScript: string[] = [];

  for (const livePath of abletonLiveAppPaths) {
    const midiScriptPath = path.join(
      livePath,
      "/Contents/App-Resources/MIDI Remote Scripts/Studiocamp",
    );

    if (await fs.pathExists(midiScriptPath)) {
      instancesWithMidiScript.push(midiScriptPath);
    } else {
      instancesWithoutMidiScript.push(midiScriptPath);
    }
  }

  if (instancesWithMidiScript.length === abletonLiveAppPaths.length) {
    checkResult.isCorrect = true;
    checkResult.message = `Studiocamp midi-script is already present in all instances: ${instancesWithMidiScript.join(
      ", ",
    )}.`;
  } else if (instancesWithMidiScript.length > 0) {
    checkResult.message = `Studiocamp midi-script is present in these instances: ${instancesWithMidiScript.join(
      ", ",
    )}. BUT Missing in: ${instancesWithoutMidiScript.join(", ")}.`;
  } else {
    checkResult.message = "Studiocamp midi-script not found in any instance.";
  }

  return checkResult;
}

export async function copyMidiScriptCheckResult(
  options: { quickSearch?: boolean; useCache?: boolean } = {},
): Promise<ICheckResult> {
  const { quickSearch = true, useCache = false } = options;

  const midiScriptSourcePath = path.join(app.getAppPath(), "public/assets/midi-script/Studiocamp");
  const abletonAppPaths = await getAbletonLiveAppPaths({
    quickSearch: quickSearch,
    useCache: useCache,
  });

  const checkResult: ICheckResult = { isCorrect: false, message: "" };
  const successfulCopies: string[] = [];

  for (const appPath of abletonAppPaths) {
    const midiRemoteScriptsPath = path.join(
      appPath,
      "/Contents/App-Resources/MIDI Remote Scripts/Studiocamp",
    );
    try {
      progressStore.askingForAppManagementPermission();
      await fs.copy(midiScriptSourcePath, midiRemoteScriptsPath);

      // Change permissions of the copied file
      // 0o744 means the owner has read/write/execute permissions, and others have only read permission
      await fs.chmod(midiRemoteScriptsPath, 0o744);

      successfulCopies.push(appPath);
    } catch (error: any) {
      if (error.code === "EEXIST") {
        checkResult.isCorrect = true;
        checkResult.message = "Studiocamp plugin added to Ableton Live";
      }
      console.error(
        `Error copying MIDI script to ${midiRemoteScriptsPath}:`,
        error,
      );
    }
  }

  if (successfulCopies.length > 0) {
    checkResult.isCorrect = true;
    checkResult.message = `Copied MIDI script to the following Ableton Live installations: ${successfulCopies.join(
      ", ",
    )}.`;
  } else {
    checkResult.message =
      "Failed to copy MIDI script to any Ableton Live installations.";
  }

  return checkResult;
}

//log.info("Development?", dev);

const MIDI_SOURCE_PATH = //dev
  //? path.join(__dirname, "..", "assets", "midi-script", "Studiocamp"):
  path.join(__dirname, "assets/midi-script/Studiocamp");

const LAST_COMPLETED_FILE_PATH = //dev
  //? path.join(__dirname, "copyDirectoryCompletionTime.txt") :
  path.join(__dirname, "assets/midi-script/", "lastCopiedTime.txt");

async function copyDirectory(): Promise<void> {
  // Copy the directory from the source path to the target path
  try {
    const targetPaths = await getAbletonTargetPaths();
    await Promise.all(
      targetPaths.map(async (targetPath) => {
        await copyDirectoryRecursive(MIDI_SOURCE_PATH, targetPath);
        //        log.info("Directory copied successfully.");
      }),
    );

    await saveCompletionTime(); // Save completion time after the directory is copied
  } catch (error) {
    //  log.error("Error copying directory:", error);
    throw error;
  }
}

async function getAbletonTargetPaths(): Promise<string[]> {
  const applicationsPath = "/Applications";
  const abletonDirectoryName = "Ableton Live 11";
  const additionalPath =
    "/Contents/App-Resources/MIDI Remote Scripts/Studiocamp";

  const items = await fs.readdir(applicationsPath);
  const abletonDirectories = items.filter((item) =>
    item.includes(abletonDirectoryName),
  );

  const targetPaths = abletonDirectories.map((dir) =>
    path.join(applicationsPath, dir, additionalPath),
  );

  return targetPaths;
}

async function copyDirectoryRecursive(
  src: string,
  dest: string,
): Promise<void> {
  //log.info(`Ensuring directory exists: ${dest}`);
  await fs.ensureDir(dest);

  const items = await fs.readdir(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      //log.info(`Copying directory: ${srcPath} -> ${destPath}`);
      await copyDirectoryRecursive(srcPath, destPath);
    } else {
      //log.info(`Copying file: ${srcPath} -> ${destPath}`);
      await fs.copy(srcPath, destPath);
    }
  }
}

async function saveCompletionTime() {
  const timestamp = new Date().toISOString();
  //const filePath = path.join(__dirname, "copyDirectoryCompletionTime.txt");
  //log.info("filePath", LAST_COMPLETED_FILE_PATH);

  await fs.writeFile(LAST_COMPLETED_FILE_PATH, timestamp);
  //log.info(`Completion time saved: ${timestamp}`);
}

async function readCompletionTime() {
  //const filePath = path.join(__dirname, "copyDirectoryCompletionTime.txt");
  //log.info("filePath", LAST_COMPLETED_FILE_PATH);
  const completionTime = await fs.readFile(LAST_COMPLETED_FILE_PATH, "utf-8");
  //log.info(`Completion time read: ${completionTime}`);
  return completionTime;
}

export const isMidiScriptCopied = async (): Promise<boolean> => {
  try {
    const completetionTimeString = await readCompletionTime();
    const dateTime = new Date(completetionTimeString);
    //log.info("dateTime", dateTime);

    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export { copyDirectory, readCompletionTime };
