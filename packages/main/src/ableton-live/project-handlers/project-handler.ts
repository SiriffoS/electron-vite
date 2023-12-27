import { ICheckResult } from "_common/models/checkResult";
import { IpcMainInvokeEvent, app, shell } from "electron";
import fs from "fs";
import path from "path";
import util from "util";

// Define constants for folder paths
const PROJECTS_FOLDER_PATH = path.join(app.getAppPath(), "/public/assets/projects");

const CURRENT_PROJECT_FOLDER_PATH = path.join(
  PROJECTS_FOLDER_PATH,
  "current_project",
);
const ORIGINAL_PROJECTS_FOLDER_PATH = path.join(
  PROJECTS_FOLDER_PATH,
  "original_projects",
);

// Promisify required 'fs' module functions for easier usage with async/await
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const unlink = util.promisify(fs.unlink);
const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const access = util.promisify(fs.access);

// Define a static list of supported file types.
const SUPPORTED_FILE_TYPES = [".als"];

// Function to check if a given file type is supported
function isFileTypeSupported(fileName: string) {
  // Get the file extension
  const fileExtension = path.extname(fileName).toLowerCase();

  // Check if the file extension is in the supported file types list
  return SUPPORTED_FILE_TYPES.includes(fileExtension);
}
//Function to validate if a given path is within the intended boundaries
function isPathInBoundaries(targetPath: string, basePath: string) {
  const normalizedBasePath = path.resolve(basePath);
  const normalizedTargetPath = path.resolve(targetPath);
  return normalizedTargetPath.startsWith(normalizedBasePath);
}

export async function openProjectAndCleanUpCheckResult(
  projectFolder: string,
  projectFile: string,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false, message: "" };
  try {
    await openProjectAndCleanUp(projectFolder, projectFile);
    checkResult.isCorrect = true;
    checkResult.message = "Opening Ableton Live project";
    return checkResult;
  } catch (error) {
    checkResult.message = "Error openning Ableton Live project";
    return checkResult;
  }
}

export async function openProjectAndCleanUp(
  projectFolder: string,
  projectFile: string,
) {
  try {
    // Check if the file type is supported
    if (!isFileTypeSupported(projectFile)) {
      console.error("Error: Unsupported file type");
      return;
    }
    console.log("projectf", ORIGINAL_PROJECTS_FOLDER_PATH);

    const projectToCopyFolderPath = path.join(
      ORIGINAL_PROJECTS_FOLDER_PATH,
      projectFolder,
    );
    if (
      !isPathInBoundaries(
        projectToCopyFolderPath,
        ORIGINAL_PROJECTS_FOLDER_PATH,
      )
    ) {
      console.error("Error: Invalid project folder path");
      return;
    }

    const destinationFolderPath = path.join(
      CURRENT_PROJECT_FOLDER_PATH,
      projectFolder,
    );

    await copyFolderContentsRecursively(
      projectToCopyFolderPath,
      destinationFolderPath,
    );

    const startFilePath = path.join(destinationFolderPath, projectFile);
    await shell.openPath(startFilePath);

    // Call 'cleanUpCurrentProjectsFolder' to delete other project folders (except the currently opened one)
    await cleanUpCurrentProjectsFolder(projectFolder);
  } catch (error) {
    console.error(
      "An error occurred while opening the project and cleaning up:",
      error,
    );
  }
}

// Function to delete all other project folders (except the currently opened one) in the 'current_project' folder
async function cleanUpCurrentProjectsFolder(excludeFolder: string) {
  try {
    const currentProjectEntries = await readdir(CURRENT_PROJECT_FOLDER_PATH, {
      withFileTypes: true,
    });

    const deletePromises = currentProjectEntries.map(async (entry) => {
      try {
        if (entry.isDirectory() && entry.name !== excludeFolder) {
          const entryPath = path.join(CURRENT_PROJECT_FOLDER_PATH, entry.name);
          if (!isPathInBoundaries(entryPath, CURRENT_PROJECT_FOLDER_PATH)) {
            console.error("Error: Invalid project folder path");
            return;
          }
          await deleteContentsInDirectoryRecursively(entryPath, false);
          return rmdir(entryPath);
        }
      } catch (error) {
        console.error(
          `An error occurred while deleting folder '${entry.name}':`,
          error,
        );
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error(
      "An error occurred while cleaning up the current projects folder:",
      error,
    );
  }
}

//Asynchronously deletes all subfolders and files in the specified directory (dir). Only allows deletion if the target directory is the current project folder.
async function deleteContentsInDirectoryRecursively(
  dir: string,
  isRootCall = true,
) {
  try {
    if (
      (!isRootCall || dir === CURRENT_PROJECT_FOLDER_PATH) &&
      isPathInBoundaries(dir, CURRENT_PROJECT_FOLDER_PATH)
    ) {
      const entries = await readdir(dir, { withFileTypes: true });

      const promises = entries.map(async (entry) => {
        try {
          const entryPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            await deleteContentsInDirectoryRecursively(entryPath, false);
            return rmdir(entryPath);
          } else {
            return unlink(entryPath);
          }
        } catch (error) {
          console.error(
            `An error occurred while deleting '${entry.name}':`,
            error,
          );
        }
      });

      await Promise.all(promises);
    } else {
      console.error("Error: Attempting to delete an unauthorized directory");
    }
  } catch (error) {
    console.error(
      "An error occurred while deleting contents in the directory:",
      error,
    );
  }
}

// Function to copy the contents of one folder (src) to another folder (dest)
async function copyFolderContentsRecursively(src: string, dest: string) {
  try {
    if (
      isPathInBoundaries(src, ORIGINAL_PROJECTS_FOLDER_PATH) &&
      isPathInBoundaries(dest, CURRENT_PROJECT_FOLDER_PATH)
    ) {
      await mkdir(dest, { recursive: true });
      const entries = await readdir(src, { withFileTypes: true });
      const promises = entries.map(async (entry) => {
        try {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);

          if (entry.isDirectory()) {
            return copyFolderContentsRecursively(srcPath, destPath);
          } else {
            return copyFile(srcPath, destPath);
          }
        } catch (error) {
          console.error(
            `An error occurred while copying '${entry.name}':`,
            error,
          );
        }
      });

      await Promise.all(promises);
    } else {
      console.error("Error: Attempting to copy unauthorized folder contents");
    }
  } catch (error) {
    console.error(
      "An error occurred while copying folder contents recursively:",
      error,
    );
  }
}
