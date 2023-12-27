// ProgressStore.ts
import Store from "electron-store";
import { getExercisesByLevelId, getLevels } from "./csv/csv-loader";
/*import { getSupabase, updateSupabaseSession } from "./supabase/supabaseClient";*/

const yourEncryptionKey = "MyStrongEncryptionKey";
const store = new Store({ encryptionKey: yourEncryptionKey });
interface ExerciseProgress {
  id: number;
  enabled: boolean | string;
  completed: boolean | string;
}
interface Level {
  completed: boolean;
  id: number;
  enabled: boolean | string;
  exercises: ExerciseProgress[];
}

interface Course {
  complete: boolean; // You might want to change this to a boolean if it represents a boolean value
  levels: Level[];
}
class ProgressStore {
  private static instance: ProgressStore | null = null;

  private constructor() {
    this.startTokenRefresh();
  }

  public static getInstance(): ProgressStore {
    if (!this.instance) {
      this.instance = new ProgressStore();
    }
    return this.instance;
  }
  private tokenRefreshInterval: NodeJS.Timer | null = null;

  startTokenRefresh() {
    this.tokenRefreshInterval = setInterval(() => {
      // this.refreshTokens();
    }, 400000); // 120000 ms = 2 minutes
  }

  private async refreshTokens() {
    try {
      // Implement your token refresh logic here
      // For example, you might make a network request to your authentication server
      const { newAccessToken, newRefreshToken } = await this.getNewTokens();

      // this.setAccessToken(newAccessToken);
      // this.setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      // Handle token refresh failure as needed
    }
  }

  private async getNewTokens() {
    // Implement your logic to obtain new access and refresh tokens here
    // This could involve making a network request to your authentication server
    // For the sake of this example, I'm just returning dummy tokens
    console.log(
      "refresh",
      // (await getSupabase().auth.getSession()).data.session?.user,
    );
    return {
      newAccessToken: "newAccessToken",
      newRefreshToken: "newRefreshToken",
    };
  }

  // Factory method to create an instance and perform asynchronous initialization
  static async create(courseId: number): Promise<ProgressStore> {
    const instance = this.getInstance();
    if (!instance.doesCourseExist(1)) {
      await instance.initialize(1);
    }
    return instance;
  }

  async initialize(courseId: number) {
    // Initialize course progress structure if it doesn't exist
    const levels = await getLevels(); // Await the promise here

    const levelsWithExercises = levels.map(async (level, index) => {
      // Fetch exercises for the current level
      const exercises = await getExercisesByLevelId(level.id);

      // Create a new level object with exercises
      const levelWithExercises: Level = {
        id: level.id,
        enabled: index === 0 ? true : false,
        completed: false,
        exercises: exercises.map((exercise, index) => {
          return {
            id: exercise.id,
            enabled: index === 0 ? true : false,
            completed: false,
          };
        }),
      };

      return levelWithExercises;
    });

    // Resolve all the promises using Promise.all
    const resolvedLevels = await Promise.all(levelsWithExercises);

    store.set(`course.${courseId}`, {
      complete: false,
      levels: resolvedLevels, // Add levels with exercises to the course
    });
  }

  doesCourseExist(courseId: number) {
    const course = store.get(`course.${courseId}`) as Course;
    return course !== undefined;
  }

  async getCourseProgress(courseId: string): Promise<number> {
    const course = store.get(`course.${courseId}`) as Course;
    const allLevels = await getLevels();
    let completedLevels: any[] = [];
    if (course) {
      completedLevels = course.levels.filter((level) => {
        return level.completed === true;
      });
    }
    const percentage = (completedLevels.length / allLevels.length) * 100;
    return percentage;
  }

  async getExerciseProgress(
    courseId: number,
    levelId: number,
    exerciseId: number,
  ): Promise<ExerciseProgress | undefined> {
    const course = store.get(`course.${courseId}`) as Course;

    // Find the specified level
    const level = course.levels.find((l) => l.id === levelId);

    if (!level) {
      return undefined; // Level not found
    }

    // Find the specified exercise within the level
    const exercise = level.exercises.find((ex) => ex.id === exerciseId);

    if (!exercise) {
      return undefined; // Exercise not found
    }

    return exercise; // Return the exercise progress
  }

  getLevelProgress(courseId: number, levelId: number) {
    const course = store.get(`course.${courseId}`) as Course;
    if (!course) {
      return null; // Or handle the error in an appropriate way
    }
    const level = course.levels.find((l) => l.id === levelId);
    if (!level) {
      return null; // Or handle the error in an appropriate way
    }
    if (level.exercises && level.exercises.length > 0) {
      level.completed =
        level.exercises[level.exercises.length - 1].completed === true;
    } else {
      // Handle the case where there are no exercises in the level
      return null; // Or handle the error in an appropriate way
    }
    return level;
  }

  async getLevelProgressPercentage(courseId: number, levelId: number) {
    const course = store.get(`course.${courseId}`) as Course;
    const level = course.levels.find((l) => l.id === levelId);
    const allExercises = await getExercisesByLevelId(levelId);
    let completedExercises: any[] = [];
    if (level) {
      completedExercises = level?.exercises.filter((e) => {
        return e.completed === true;
      });
    }
    const percentage = (completedExercises.length / allExercises.length) * 100;
    return percentage;
  }

  async setExerciseCompleted(
    courseId: number,
    levelId: number,
    exerciseId: number,
  ) {
    const course = store.get(`course.${courseId}`) as Course;
    course.levels = course.levels.map((level, levelIndex) => {
      if (level.id === levelId) {
        level.exercises.map((exercise, exerciseIndex) => {
          if (exercise.id === exerciseId) {
            exercise.completed = true;
            if (level.exercises.length - 1 === exerciseIndex) {
              course.levels[levelIndex].completed = true;
              if (course.levels.length - 1 === levelIndex) {
                course.complete = true;
              } else {
                course.levels[levelIndex + 1].enabled = true;
              }
            } else {
              level.exercises[exerciseIndex + 1].enabled = true;
            }
          }
          return exercise; // Return the exercise object, whether modified or not
        });
      }
      return level; // Return the level object, whether modified or not
    }) as Level[]; // Explicitly cast to Level[]
    store.set(`course.${courseId}`, course);
  }

  getWatchedExercises(): string {
    const watched = store.get("watchedExercises") as string;
    if (watched === undefined) {
      return "";
    }
    return watched;
  }

  hasWatchedExercise(exerciseId: string): boolean {
    const watchedList = this.getWatchedExercises();
    if (watchedList === "") {
      return false;
    }
    const stringArray = watchedList.split(",");
    return stringArray.includes(exerciseId);
  }

  updateWatchedExercise(exerciseId: string): void {
    if (!this.hasWatchedExercise(exerciseId)) {
      let watch = this.getWatchedExercises();
      if (watch.length === 0) {
        watch = exerciseId;
      } else {
        watch = watch.concat(",", exerciseId);
      }
      store.set("watchedExercises", watch);
    }
  }

  hasAskedForAppManagementPermission(): boolean {
    return store.get("appManagementPermission") as boolean;
  }

  askingForAppManagementPermission(): void {
    store.set("appManagementPermission", true);
  }

  hasFinishedSetup(): boolean {
    return store.get("finishedSetup") as boolean;
  }

  finishedSetup(): void {
    store.set("finishedSetup", true);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    store.set("tokens", { accessToken, refreshToken });
    // updateSupabaseSession(accessToken, refreshToken);
  }

  getTokens(): { accessToken: string; refreshToken: string } {
    const tokens = store.get("tokens") as {
      accessToken: string;
      refreshToken: string;
    };
    return tokens;
  }

  setComputerId(id: string): void {
    store.set("computerId", id);
  }

  getComputerId(): string {
    return store.get("computerId") as string;
  }
}

export default ProgressStore;
