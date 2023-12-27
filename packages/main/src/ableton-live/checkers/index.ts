import { Note } from "ableton-js/util/note";
import { Criterion, CriterionType } from "_common/models/criterion";
import { ICheckResult } from "_common/models/checkResult";
import { checkSongIsPlayingStatus } from "./song/is-playing-checker";
import { checkClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack } from "./track/playing-slot-indexes-checker";
import { checkTrackNamesByIndex } from "./track/track-name-checker";
import { checkClipLengthByTrackAndClipSlotIndex } from "./clip/clip-length-checker";
import { checkSongTempo } from "./song/tempo-checker";
import { checkClipNamesByTrackAndSlotIndexes } from "./clip/clip-names-checker";
import { checkTrackTypesByIndex } from "./track/track-type-checker";
import { checkClipNotesByTrackAndClipSlotIndex } from "./clip/clip-notes-checker";
import { checkTrackLengthByMinAndMaxLength } from "./track/tracks-length-checker";
import { checkClipExistByTrackAndClipSlotIndex } from "./clip/clip-exist-checker";

/**
 * Verify a task by iterating over its criteria and executing the corresponding verification functions.
 * @param criteria - The task object to verify.
 * @returns A Promise that resolves to an object containing a boolean indicating whether the task is correct, as well as any additional verification data.
 */
export async function checkCriteria(
  criteria: Criterion[],
): Promise<ICheckResult> {
  let result: ICheckResult = { isCorrect: false };
  // Iterate over the task's criteria and execute the corresponding verification functions.
  for (let i = 0; i < criteria.length; i++) {
    //This switch statement is used to determine which verification function to execute and with which arguments. Remember to add new verification functions to the switch statement.
    switch (criteria[i].criterionType) {
      case CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack:
        result =
          await checkClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack(
            criteria[i].correctValue as number[],
          );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          // Return the verification result if the task is incorrect.
          return Promise.resolve(result);
        }
        break;
      case CriterionType.SongIsPlayingStatus:
        result = await checkSongIsPlayingStatus(
          criteria[i].correctValue[0] as boolean,
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          // Return the verification result if the task is incorrect.
          return Promise.resolve(result);
        }
        break;
      case CriterionType.ClipNotesByTrackAndClipSlotIndex:
        result = await checkClipNotesByTrackAndClipSlotIndex(
          criteria[i].correctValue[0] as number,
          criteria[i].correctValue[1] as number,
          criteria[i].correctValue[2] as Note[],
          criteria[i].correctValue[3] as boolean,
          criteria[i].correctValue[4] as boolean,
          criteria[i].correctValue[5] as boolean,
          criteria[i].correctValue[6] as boolean,
          criteria[i].correctValue[7] as boolean,
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          // Return the verification result if the task is incorrect.
          return Promise.resolve(result);
        }
        break;

      case CriterionType.ClipExistByTrackAndClipSlotIndex:
        result = await checkClipExistByTrackAndClipSlotIndex(
          criteria[i].correctValue[0] as number,
          criteria[i].correctValue[1] as number,
          criteria[i].correctValue[2] as boolean,
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          // Return the verification result if the task is incorrect.
          return Promise.resolve(result);
        }
        break;
      case CriterionType.ClipLengthByTrackAndClipSlotIndex:
        result = await checkClipLengthByTrackAndClipSlotIndex(
          criteria[i].correctValue[0] as number,
          criteria[i].correctValue[1] as number,
          criteria[i].correctValue[2] as number,
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          // Return the verification result if the task is incorrect.
          return Promise.resolve(result);
        }
        break;
      case CriterionType.SongTempo:
        result = await checkSongTempo(criteria[i].correctValue[0] as number);
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          return Promise.resolve(result);
        }
        break;
      case CriterionType.TrackTypesByIndex:
        result = await checkTrackTypesByIndex(
          criteria[i].correctValue as [number, string][],
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          return Promise.resolve(result);
        }
        break;
      case CriterionType.TrackNamesByIndex:
        result = await checkTrackNamesByIndex(
          criteria[i].correctValue as [number, string][],
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          return Promise.resolve(result);
        }
        break;
      case CriterionType.ClipNamesByTrackAndSlotIndexes:
        result = await checkClipNamesByTrackAndSlotIndexes(
          criteria[i].correctValue as [number, [number, string][]][],
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          return Promise.resolve(result);
        }
        break;
      case CriterionType.TrackLengthByMinAndMaxLength:
        result = await checkTrackLengthByMinAndMaxLength(
          criteria[i].correctValue[0] as number,
          criteria[i].correctValue[1] as number,
        );
        logResult(criteria, i, result);
        if (result.isCorrect === false) {
          return Promise.resolve(result);
        }
        break;
      default:
        break;
    }
  }

  // Return the final verification result.
  return Promise.resolve(result);
}

//Helper function to make console logs.
function logResult(criteria: Criterion[], i: number, result: ICheckResult) {
  /*console.log(
    "CriteriaType: ",
    criteria[i].criterionType,
    "CorrectValue: ",
    criteria[i].correctValue,
    "Result: ",
    result.isCorrect,
    "Message: ",
    result.message
  );
  */
}
