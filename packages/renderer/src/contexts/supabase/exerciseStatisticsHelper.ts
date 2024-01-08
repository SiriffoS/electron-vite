import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabaseTypes";
import SupabaseService from "_common/supabase/supabaseService";
import useExerciseStore from "_/utils/stateStores/useExerciseStore";

type ExerciseStatistic =
  Database["public"]["Tables"]["exercise_statistics"]["Row"];
type ExerciseStatisticInsert =
  Database["public"]["Tables"]["exercise_statistics"]["Insert"];
type ExerciseStatisticUpdate =
  Database["public"]["Tables"]["exercise_statistics"]["Update"];

export class ExerciseStatisticsHelper {
  private supabaseService: SupabaseService;
  private currentExerciseStartTime: Date | null = null;
  private currentRowId: number | null = null;

  constructor(supabaseClient: SupabaseClient) {
    this.supabaseService = new SupabaseService(supabaseClient);
  }

  async startExercise(
    exerciseId: string,
    taskId: number,
  ): Promise<ExerciseStatistic[] | null> {
    this.currentExerciseStartTime = new Date();
    let appId = await window.electronAPI.getComputerId();
    if (!appId) {
      const data = await this.supabaseService.newApplicationUser();
      appId = data.id;
      await window.electronAPI.setComputerId(appId);
    }

    const insertData: ExerciseStatisticInsert = {
      exercise_id: parseInt(exerciseId),
      task_id: taskId,
      app_id: appId,
      start_timestamp: this.currentExerciseStartTime.toISOString(),
    };

    try {
      const data =
        await this.supabaseService.insertExerciseStatistic(insertData);
      if (data && data.length > 0) {
        this.currentRowId = data[0].row_id;
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error inserting exercise start data:", await error);
      return null;
    }
  }

  async endExercise(
    exerciseId: string,
    attempts: number,
    hintsUsed: number,
  ): Promise<boolean> {
    if (!this.currentExerciseStartTime) {
      console.error(
        "Exercise has not been started or the start record was not created.",
      );
      return false;
    }

    if (this.currentRowId === null) {
      console.error(
        "Current row ID is null. Cannot update exercise statistics.",
      );
      return false;
    }

    const endTime = new Date();
    const duration = this.calculateDuration(endTime);
    const boughtProductId = (await window.electronAPI.getTokens()) ? 1 : 0;
    const hasWatchedExercise =
      await window.electronAPI.hasWatchedExercise(exerciseId);

    const updateData: ExerciseStatisticUpdate = {
      completion_time: duration,
      attempts: attempts,
      hints_used: hintsUsed,
      did_complete: true,
      bought_product_id: boughtProductId,
      watched_video: hasWatchedExercise,
    };

    try {
      console.log("end ex 3");
      await this.supabaseService.updateExerciseStatistic(
        this.currentRowId,
        updateData,
      );
      useExerciseStore.getState().resetExercise();
      return true;
    } catch (error) {

      console.error("Error updating exercise completion data:", error);
      return false;
    } finally {
      this.currentExerciseStartTime = null;
      this.currentRowId = null;
    }
  }

  private calculateDuration(endTime: Date): number {
    if (this.currentExerciseStartTime) {
      return Math.round(
        (endTime.getTime() - this.currentExerciseStartTime.getTime()) / 1000,
      );
    } else {
      return 0;
    }
  }
}
