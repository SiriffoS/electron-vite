const electron = require("electron");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

export async function setWindowsSideBySide() {
  console.log("windowshandler");
  // Get screen size
  let { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  width = width - 200;

  // Resize and reposition Ableton Live 11
  const script = `
  tell application "Live" to activate
  delay 1
  tell application "System Events"
  tell process "Live"
  set value of attribute "AXFullScreen" of window 1 to false
  end tell
  end tell

  tell application "System Events"
    tell application process "Live"
        tell window 1
        set position to {200, 0}
            set size to {${width}, ${height}}
        end tell
    end tell
end tell
  `;

  // set size to {${width - 200}, ${height}}
  const { stdout, stderr } = await exec(`osascript -e '${script}'`);

  if (stderr) {
    console.error(`Error: ${stderr}`);
  }
  if (stdout) {
    console.error(`out: ${stdout}`);
  }
}
/**

*/
