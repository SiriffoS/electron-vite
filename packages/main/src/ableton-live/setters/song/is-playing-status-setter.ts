import { ableton } from "../../index";

async function setSongIsPlayingStatus(isPlaying: boolean) {
  await ableton.song.set("is_playing", isPlaying);
}

export { setSongIsPlayingStatus };
