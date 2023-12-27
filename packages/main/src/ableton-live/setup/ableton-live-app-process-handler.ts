import { ICheckResult } from "_common/models/checkResult";
import findProcess from "find-process";

async function checkAbletonLiveProcess(
  isCheckingIfRunning: boolean,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = {
    isCorrect: !isCheckingIfRunning,
    message: isCheckingIfRunning
      ? "Ableton Live 11 is not running."
      : "Ableton Live 11 is closed.",
  };

  try {
    const processes = await findProcess("name", "Ableton Live 11");

    for (const process of processes) {
      if (
        process.name.includes("Ableton Live 11 Trial") ||
        process.name.includes("Ableton Live 11 Suite")
      ) {
        checkResult.isCorrect = isCheckingIfRunning;
        checkResult.message = isCheckingIfRunning
          ? "Ableton Live 11 is running."
          : "Ableton Live 11 is still running.";
        return checkResult;
      }
    }
  } catch (error) {
    console.error("Error checking Ableton Live's status:", error);
    checkResult.message = `Error checking Ableton Live's status: ${error}`;
  }

  return checkResult;
}

export function isAbleTonLiveRunning(): Promise<ICheckResult> {
  return checkAbletonLiveProcess(true);
}

export function isAbleTonLiveClosed(): Promise<ICheckResult> {
  return checkAbletonLiveProcess(false);
}
