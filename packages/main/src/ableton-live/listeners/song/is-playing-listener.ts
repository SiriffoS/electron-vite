import { ableton, abletonEventEmitter } from "../../index";

export const setupIsPlayingListeners = () => {
  ableton.song.addListener("is_playing", (isPlaying: boolean) => {
    abletonEventEmitter.emit("is-playing-status", isPlaying);
  });
};
