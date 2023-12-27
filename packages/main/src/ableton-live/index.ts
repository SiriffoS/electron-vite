//index.ts
import { Ableton } from "ableton-js";
import { setupConnectionListeners } from "./listeners/connection/connection-listener";
import {EventEmitter} from "events";

const ableton: Ableton = new Ableton({ logger: console });
export const abletonEventEmitter = new EventEmitter();

export async function startAbletonJs() {
  if (ableton.isConnected()) {
    return;
  }
  await ableton.start();

  setupConnectionListeners();
}

export { ableton };

/*

TODOS and ideas:
Create object sensitivity model: gold, silver, bronze (possibly add to criteria object model)
interface VerificationResult: add start + end timestamps to allow caller to check how it took
Create a criteria object model
songHasCorrectClipNotes: enable multi clip verification (i.e. a list of clips in the function call)
songHasCorrectClipNotes: make comparison algorithm smarter and faster, to handle bigger note patterns.
VerificationResult: change the message from string to string[], so that multiple messages can be added. Will possibly also make it easier for the front end to display 

DOING:

DONE:

songHasCorrectClipNotes: add verification message
songHasCorrectTrackNames: add verification message 
songHasCorrectIsPlayingStatus: add verification message
songHasCorrectPlayingSlotIndexes: add verification message
*/
