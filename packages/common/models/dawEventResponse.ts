import { DawEvent } from "./dawEvent";

export class DawEventResponse {
  readonly id: number = 0;
  readonly dawEvent: DawEvent = DawEvent.FocusedDocumentViewIsChanged;
  readonly response: string = "";
}
