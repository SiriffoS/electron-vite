//connection-listener.ts
import { ableton, abletonEventEmitter } from "../../index";
import { setupIsPlayingListeners } from "../song/is-playing-listener";
let connection = false;

const setupConnectionListeners = () => {
  ableton.on("ping", (e) => {
    if (e !== null || e !== undefined) {
      abletonEventEmitter.emit("connection", true);
      connection = true;
    }
  });
  ableton.on("connect", (e) => {
    setupIsPlayingListeners();
    console.log("setup: connected");
  });
  ableton.on("disconnect", (e) => {
    if (connection === undefined || connection === true) {
      abletonEventEmitter.emit("connection", false);
      connection = false;
    }
  });

  setInterval(async () => {
    if (connection === false) {
      abletonEventEmitter.emit("connection", false);
    }
  }, 1000);
};

export { setupConnectionListeners };
