import {app, protocol} from 'electron';
import './security-restrictions';
import {restoreOrCreateWindow} from '_/mainWindow';
import {platform} from 'node:process';
import { startAbletonJs } from "_/ableton-live/index";
import { registerIpcHandlers, broadcastTokensSet } from './utils/ipcHandlers';
import ProgressStore from './utils/progressStore';
import { runAutoUpdater } from './autoUpdater';
import path from 'path';
import { getSupabase, initializeSupabase } from './utils/supabase/supabaseClient';
ProgressStore.create(1);
const progressStore = ProgressStore.getInstance();


/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});
app.setAsDefaultProtocolClient("foobar");
app.on("open-url", async function (event, data) {
  // Get the query string part of the URL by removing the "foobar://" prefix
  const queryString = data.replace("foobar://", "");
  // Parse the query string
  const urlParams = new URLSearchParams(queryString);

  // Get the tokens
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");

  if (refreshToken && accessToken) {
    progressStore.setTokens(accessToken, refreshToken);
    broadcastTokensSet();
    try {
      await getSupabase().auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.error("Error setting session:", error);
    }
  }
  event.preventDefault();
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(() => {
    
    restoreOrCreateWindow();
    startAbletonJs();
    registerIpcHandlers();
    addMediaLoader(); 
    initializeSupabase();
    if(import.meta.env.DEV) {
    // installReactDevTools();
    }
  })
  .catch(e => console.error('Failed create window:', e));

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(module => {
//       const {default: installExtension, VUEJS3_DEVTOOLS} =
//         // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
//         typeof module.default === 'function' ? module : (module.default as typeof module);
//
//       return installExtension(VUEJS3_DEVTOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => {

      /**
       * Here we forced to use `require` since electron doesn't fully support dynamic import in asar archives
       * @see https://github.com/electron/electron/issues/38829
       * Potentially it may be fixed by this https://github.com/electron/electron/pull/37535
       */
      runAutoUpdater(); 
    }
    )
    .catch(e => console.error('Failed check and install updates:', e));
}

// async function installReactDevTools() {
//   if (process.env.NODE_ENV === 'development') {
//     import("electron-extension-installer").then(async ({ installExtension, REACT_DEVELOPER_TOOLS }) => {
//       await installExtension(REACT_DEVELOPER_TOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       })
//       // Your code to install the extension...
//     }).catch(err => {
//       console.error("Failed to load electron-extension-installer:", err);
//     });
//   }
//   }
function addMediaLoader() {
  protocol.registerFileProtocol('media-loader', (request, callback) => {
    const url = request.url.replace('media-loader:/', app.getAppPath());
    // Map the URL to the actual file path


    try {
      return callback(url);
    } catch (err) {
      return callback("404");
    }
  });
}
