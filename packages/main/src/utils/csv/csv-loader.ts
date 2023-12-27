import Papa from "papaparse";
import { Course } from "_common/models/course";
import fs from "fs";
import { Level } from "_common/models/level";
import { Exercise } from "_common/models/exercise";

import {
  CourseLevelRelation,
  COURSES_FILE_PATH,
  COURSE_LEVEL_FILE_PATH,
  DAW_EVENT_RESPONSES_FILE_PATH,
  DAW_INITIALISERS_FILE_PATH,
  EXERCISES_FILE_PATH,
  ExerciseTaskRelation,
  EXERCISE_TASK_FILE_PATH,
  LevelExerciseRelation,
  LEVELS_FILE_PATH,
  LEVEL_EXERCISE_FILE_PATH,
  SectionCourseRelation,
  SECTIONS_FILE_PATH,
  SECTION_COURSE_FILE_PATH,
  TaskDawEventResponseRelation,
  TaskDawInitialiserRelation,
  TASKS_FILE_PATH,
  TASK_DAW_EVENT_RESPONSE_FILE_PATH,
  TASK_DAW_INITIALISER_FILE_PATH,
} from "./csv-statics";
import { Task } from "_common/models/task";
import { DawEventResponse } from "_common/models/dawEventResponse";
import { DawInitialiser } from "_common/models/dawInitialiser";
import { Section } from "_common/models/section";

class FileNotFoundError extends Error {
  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
    this.name = "FileNotFoundError";
  }
}

class ItemNotFoundError extends Error {
  constructor(id: number, itemType: string) {
    super(`${itemType} with id ${id} not found`);
    this.name = "ItemNotFoundError";
  }
}

interface NodeJSError extends Error {
  code?: string;
}

async function readCSVFile(filePath: string): Promise<string> {
  try {
    return await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    const nodeJSError = error as NodeJSError;
    if (nodeJSError.code === "ENOENT") {
      throw new FileNotFoundError(filePath);
    } else {
      throw error;
    }
  }
}

async function parseCSV<T>(filePath: string): Promise<T[]> {
  const content = await readCSVFile(filePath);

  // Extract the header and types
  const headerLine = content.split("\n")[0];
  const headerColumns = Papa.parse(headerLine, { delimiter: "," })
    .data[0] as string[];
  const columnNames: string[] = [];
  const columnTypes: { [key: string]: string } = {};
  headerColumns.forEach((column: string) => {
    const [name, type] = column.split(/[(\)]/);
    columnNames.push(name);
    columnTypes[name] = type;
  });

  // Type conversion based on type extracted from the header
  const typeConversion: { [key: string]: (value: any) => any } = {
    integer: (value: any) => parseInt(value),
    string: (value: any) => value,
    boolean: (value: any) => value.toLowerCase() === "true",
    list: (value: string) => value.split("|"),
  };

  // Parse the CSV content
  const result = Papa.parse(content, { header: true, delimiter: "," });

  // Convert the rows into objects using the updated column names and types
  const data: T[] = result.data.map((row: unknown) => {
    const record = row as { [key: string]: any };
    const newRow: { [key: string]: any } = {};
    for (const column in record) {
      const columnName = columnNames.find((name) => column.startsWith(name));
      if (columnName) {
        const type = columnTypes[columnName];
        newRow[columnName] = typeConversion[type](record[column]);
      }
    }
    return newRow as T;
  });

  return data;
}

async function getDataById<T>(
  id: number,
  itemType: string,
  getData: () => Promise<T[]>,
): Promise<T> {
  const data = await getData();
  const item = await data.find((item: any) => item.id === id);
  if (!item) {
    throw new ItemNotFoundError(id, itemType);
  }
  return item;
}

async function getFilteredData<T, U>(
  dataFilePath: string,
  relationFilePath: string,
  dataKey: string,
  relationKey: string,
  id: number,
): Promise<T[]> {
  const relationData = await parseCSV<{ [key: string]: string }>(
    relationFilePath,
  );

  const relatedIds = relationData
    .filter((row) => parseInt(row[relationKey], 10) === id)
    .map((row) => parseInt(row[dataKey], 10));

  const allData = await parseCSV<T>(dataFilePath);

  const filteredData = allData.filter((item: any) =>
    relatedIds.includes(item.id),
  );
  return filteredData;
}

export async function getSections(): Promise<Section[]> {
  return parseCSV<Section>(SECTIONS_FILE_PATH);
}

export async function getSectionById(sectionId: number): Promise<Section> {
  return getDataById<Section>(sectionId, "Section", getSections);
}

export async function getCoursesBySectionId(
  sectionId: number,
): Promise<Course[]> {
  return getFilteredData<Course, SectionCourseRelation>(
    COURSES_FILE_PATH,
    SECTION_COURSE_FILE_PATH,
    "courseId",
    "sectionId",
    sectionId,
  );
}

export async function getCourses(): Promise<Course[]> {
  return parseCSV<Course>(COURSES_FILE_PATH);
}

export async function getCourseById(courseId: number): Promise<Course> {
  return getDataById<Course>(courseId, "Course", getCourses);
}

export async function getLevels(): Promise<Level[]> {
  return parseCSV<Level>(LEVELS_FILE_PATH);
}

export async function getLevelById(levelId: number): Promise<Level> {
  return getDataById<Level>(levelId, "Level", getLevels);
}

export async function getLevelsByCourseId(courseId: number): Promise<Level[]> {
  return getFilteredData<Level, CourseLevelRelation>(
    LEVELS_FILE_PATH,
    COURSE_LEVEL_FILE_PATH,
    "levelId", // Updated to match CSV header
    "courseId", // Updated to match CSV header
    courseId,
  );
}

export async function getExercises(): Promise<Exercise[]> {
  return parseCSV<Exercise>(EXERCISES_FILE_PATH);
}

export async function getExerciseById(exerciseId: number): Promise<Exercise> {
  return getDataById<Exercise>(exerciseId, "Exercise", getExercises);
}

export async function getExercisesByLevelId(
  levelId: number,
): Promise<Exercise[]> {
  return getFilteredData<Exercise, LevelExerciseRelation>(
    EXERCISES_FILE_PATH,
    LEVEL_EXERCISE_FILE_PATH,
    "exerciseId",
    "levelId",
    levelId,
  );
}

export async function getTasks(): Promise<Task[]> {
  return parseCSV<Task>(TASKS_FILE_PATH);
}

export async function getTaskById(taskId: number): Promise<Task> {
  return getDataById<Task>(taskId, "Task", getTasks);
}

export async function getTasksByExerciseId(
  exerciseId: number,
): Promise<Task[]> {
  return getFilteredData<Task, ExerciseTaskRelation>(
    TASKS_FILE_PATH,
    EXERCISE_TASK_FILE_PATH,
    "taskId",
    "exerciseId",
    exerciseId,
  );
}

export async function getDawEventResponses(): Promise<DawEventResponse[]> {
  return parseCSV<DawEventResponse>(DAW_EVENT_RESPONSES_FILE_PATH);
}

export async function getDawEventResponseById(
  dawEventId: number,
): Promise<DawEventResponse> {
  return getDataById<DawEventResponse>(
    dawEventId,
    "DawEventResponse",
    getDawEventResponses,
  );
}

export async function getDawEventResponsesByTaskId(
  taskId: number,
): Promise<DawEventResponse[]> {
  return getFilteredData<DawEventResponse, TaskDawEventResponseRelation>(
    DAW_EVENT_RESPONSES_FILE_PATH,
    TASK_DAW_EVENT_RESPONSE_FILE_PATH,
    "dawEventResponseId",
    "taskId",
    taskId,
  );
}

export async function getDawInitialisers(): Promise<DawInitialiser[]> {
  return parseCSV<DawInitialiser>(DAW_INITIALISERS_FILE_PATH);
}

export async function getDawInitialiserById(
  dawInitialiserId: number,
): Promise<DawInitialiser> {
  return getDataById<DawInitialiser>(
    dawInitialiserId,
    "DawInitialiser",
    getDawInitialisers,
  );
}

export async function getDawInitialisersByTaskId(
  taskId: number,
): Promise<DawInitialiser[]> {
  return getFilteredData<DawInitialiser, TaskDawInitialiserRelation>(
    DAW_INITIALISERS_FILE_PATH,
    TASK_DAW_INITIALISER_FILE_PATH,
    "dawInitialiserId",
    "taskId",
    taskId,
  );
}
