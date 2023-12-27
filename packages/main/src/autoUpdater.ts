import { dialog } from "electron";
import { UpdateInfo } from "electron-updater";

const { autoUpdater } = require("electron-updater");

export function runAutoUpdater() {
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on(
        "update-available",
        (_event: any, releaseNotes: any, releaseName: any) => {
        //   log.info("update-available");
        },
      );
      
      autoUpdater.on("checking-for-update", () => {
        // log.info("checking-for-update");
      });
      
      autoUpdater.on("download-progress", () => {
        // log.info("dowload-progress");
      });
      
      autoUpdater.on("error", (error: Error) => {
        // log.info("-------------------------------------------");
        // log.info("error", error.message);
        // log.info("-------------------------------------------");
      });
      
      autoUpdater.on("update-not-available", (updateInfo: UpdateInfo) => {
        // log.info("updateinfo", updateInfo.version);
      });
      
      autoUpdater.on(
        "update-downloaded",
        (_event: any, releaseNotes: any, releaseName: any) => {
            const dialogOpts = {
                type: "info" as const, // Explicitly declare as a literal type
                buttons: ["Restart", "Later"],
                title: "Application Update",
                message: "New Studiocamp version available",
                detail: "Restart to apply the updates.",
            };
          dialog.showMessageBox(dialogOpts).then((returnValue) => {
            if (returnValue.response === 0) {
            //   log.info("update downloaded");
              autoUpdater.quitAndInstall();
            }
          });
        },
      );
}