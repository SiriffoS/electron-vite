import { exec } from "child_process";
import { promisify } from "util";
import { ICheckResult } from "_common/models/checkResult";
import fs from "fs-extra";

const execAsync = promisify(exec);

interface ICache {
  abletonLiveAppPaths?: string[];
  checkAbletonLiveInstances?: ICheckResult;
}

const cache: ICache = {};

export async function getAbletonLiveAppPaths(
  options: { quickSearch?: boolean; useCache?: boolean } = {},
): Promise<string[]> {
  const { quickSearch = true, useCache = false } = options;

  if (useCache && cache.abletonLiveAppPaths) {
    return cache.abletonLiveAppPaths;
  }

  let abletonLiveAppPaths: string[] = [];

  if (quickSearch) {
    const possiblePaths = [
      "/Applications/Ableton Live 11 Trial.app",
      "/Applications/Ableton Live 11 Suite.app",
      // Add any other paths to check here
    ];

    abletonLiveAppPaths = (
      await Promise.all(
        possiblePaths.map(async (path) => {
          const pathExists = await fs.pathExists(path);
          if (pathExists) {
            return path;
          }
        }),
      )
    ).filter(Boolean) as string[];
  } else {
    const { stdout } = await execAsync(
      "system_profiler SPApplicationsDataType",
    );
    const installedApps = stdout.toString().split("\n");

    abletonLiveAppPaths = installedApps
      .map((line) => {
        const trimmedLine = line.trim();
        if (
          trimmedLine.includes("/Ableton Live 11 Trial.app") ||
          trimmedLine.includes("/Ableton Live 11 Suite.app")
        ) {
          return trimmedLine.replace("Location:", "").trim();
        }
        return null;
      })
      .filter(Boolean) as string[];
  }

  cache.abletonLiveAppPaths = abletonLiveAppPaths;

  return abletonLiveAppPaths;
}

export async function abletonLiveInstalledCheckResult(
  options: { quickSearch?: boolean; useCache?: boolean } = {},
): Promise<ICheckResult> {
  const { quickSearch = true, useCache = false } = options;

  if (useCache && cache.checkAbletonLiveInstances) {
    return cache.checkAbletonLiveInstances;
  }

  const checkResult: ICheckResult = { isCorrect: false };

  const abletonLiveInstances = await getAbletonLiveAppPaths({
    quickSearch,
    useCache,
  });

  if (abletonLiveInstances.length > 0) {
    checkResult.isCorrect = true;
    checkResult.message = `Ableton Live 11 is installed at ${abletonLiveInstances[0]}.`;
  } else {
    checkResult.message = "Ableton Live 11 is not installed.";
  }

  if (useCache) {
    cache.checkAbletonLiveInstances = checkResult;
  }
  return checkResult;
}
