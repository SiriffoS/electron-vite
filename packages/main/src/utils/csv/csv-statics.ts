import path from "path";
import { app } from "electron";
const fs = require('fs');


const appPath = app.getAppPath();
const resourcesPath = path.join(appPath, "resources");

export const CSV_FOLDER_PATH = path.join(
  resourcesPath,
  "..",
  "public",
  "assets",
  "data",
  "csv",
);
fs.readdir(CSV_FOLDER_PATH, (err: any, files: any) => {
  if (err) {
      console.error('Error reading the directory:', err);
      return;
  }
  console.log('Contents of the folder:', files);
});

export const ENTITIES_FOLDER_PATH = path.join(CSV_FOLDER_PATH, "entities");
export const SECTIONS_FILE_PATH = path.join(
  ENTITIES_FOLDER_PATH,
  "sections.csv",
);
export const COURSES_FILE_PATH = path.join(ENTITIES_FOLDER_PATH, "courses.csv");
export const LEVELS_FILE_PATH = path.join(ENTITIES_FOLDER_PATH, "levels.csv");
export const EXERCISES_FILE_PATH = path.join(
  ENTITIES_FOLDER_PATH,
  "exercises.csv",
);
export const TASKS_FILE_PATH = path.join(ENTITIES_FOLDER_PATH, "tasks.csv");
export const DAW_EVENT_RESPONSES_FILE_PATH = path.join(
  ENTITIES_FOLDER_PATH,
  "dawEventResponses.csv",
);
export const DAW_INITIALISERS_FILE_PATH = path.join(
  ENTITIES_FOLDER_PATH,
  "dawInitialisers.csv",
);

export const RELATIONSHIPS_FOLDER_PATH = path.join(
  CSV_FOLDER_PATH,
  "relationships",
);
export const SECTION_COURSE_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "sectionCourse.csv",
);

export const COURSE_LEVEL_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "courseLevel.csv",
);
export const LEVEL_EXERCISE_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "levelExercise.csv",
);
export const EXERCISE_TASK_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "exerciseTask.csv",
);

export const TASK_DAW_EVENT_RESPONSE_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "taskDawEventResponse.csv",
);

export const TASK_DAW_INITIALISER_FILE_PATH = path.join(
  RELATIONSHIPS_FOLDER_PATH,
  "taskDawInitialiser.csv",
);

export type SectionCourseRelation = { sectionId: string; courseId: string };
export type CourseLevelRelation = { courseId: string; levelId: string };
export type LevelExerciseRelation = { levelId: string; exerciseId: string };
export type ExerciseTaskRelation = { exerciseId: string; taskId: string };
export type TaskDawEventResponseRelation = {
  taskId: string;
  dawEventResponseId: string;
};
export type TaskDawInitialiserRelation = {
  taskId: string;
  dawInitialiserId: string;
};
