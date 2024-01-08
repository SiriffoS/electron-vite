import { SupabaseClient } from "@supabase/supabase-js";
import {Database} from "../types/supabaseTypes"

type ExerciseStatistic =
  Database["public"]["Tables"]["exercise_statistics"]["Row"];
type ExerciseStatisticInsert =
  Database["public"]["Tables"]["exercise_statistics"]["Insert"];
type ExerciseStatisticUpdate =
  Database["public"]["Tables"]["exercise_statistics"]["Update"];

class SupabaseService {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async newApplicationUser() {
    try {
      const { data, error } = await this.supabase
        .from("application_users")
        .insert([{}])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error creating a new user", error);
      return null;
    }
  }

  async insertExerciseStatistic(
    insertValues: ExerciseStatisticInsert,
  ): Promise<ExerciseStatistic[] | null> {
    try {
      const { data, error } = await this.supabase
        .from("exercise_statistics")
        .insert([insertValues])
        .select();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in insertExerciseStatistic:", error);
      return null;
    }
  }

  async updateExerciseStatistic(
    id: number,
    updateData: ExerciseStatisticUpdate,
  ): Promise<ExerciseStatistic[] | null> {
    try {
      const { data, error } = await this.supabase
        .from("exercise_statistics")
        .update(updateData)
        .match({ row_id: id });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error in updateExerciseStatistic:", error);
      return null;
    }
  }
}

export default SupabaseService;
