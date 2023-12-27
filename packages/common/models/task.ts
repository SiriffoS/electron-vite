import { DawEvent } from "./dawEvent";

export class Task {
  id = 0;
  readonly projectFolderName: string = "";
  readonly startFile: string = "";
  readonly solutionFile: string = "";
  readonly soundFileName?: string = undefined;
  readonly soundText?: string = undefined;
  readonly checkText: string = "";
  _checkTextListed: string[] = [];
  readonly hints?: string = "";
  //readonly targetType: TargetType = TargetType.Sound;
  // readonly triggerApp: TriggerApp = TriggerApp.Studiocamp;
  // readonly triggerDawEvent?: DawEvent = undefined;
  // readonly triggerStudiocampEvent?: StudiocampEvent =
  //   StudiocampEvent.SubmitButtonClicked;
}

export enum TargetType {
  Sound = "SOUND",
  Text = "TEXT",
}

export enum TriggerApp {
  Studiocamp = "STUDIOCAMP",
  Daw = "DAW",
}

export enum StudiocampEvent {
  SubmitButtonClicked = "SUBMIT_BUTTON_CLICKED",
}
