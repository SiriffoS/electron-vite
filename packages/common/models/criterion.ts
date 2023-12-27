export enum CriterionType {
  /**
   * @description Check the clip notes of a clip at a specified track and clip slot index
   * @param trackIndex: number - the track index (0 - unlimited)
   * @param clipSlotIndex: number - the clip slot index (0 - unlimited)
   * @param clipNotesCriteria: Note[] the required notes e.g. { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false }, { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
   * @param checkPitch: boolean - whether each note pitch should be checked
   * @param checkTime: boolean - whether each note time should be checked
   * @param checkDuration: boolean - whether each note duration should be checked
   * @param checkVelocity: boolean - whether each note velocity should be checked
   * @param checkMuted: boolean - whether each note muted status should be checked
   */
  ClipNotesByTrackAndClipSlotIndex = "CLIP_NOTES_BY_TRACK_AND_CLIP_SLOT_INDEX",

  /**
   * @description Function that checks if the song is playing or stopped.
   * @param isPlayingCriteria: boolean - true if the song should be playing, false if the song should be stopped
   * */
  SongIsPlayingStatus = "SONG_IS_PLAYING_STATUS",

  /**
   * @description Function that checks that the tracks of the Session View have the correct playingSlotIndex.
   * @param playingSlotIndexesCriteria: number[] - the correct playingSlotIndex for each track. First slot has index 0, -2 = Clip Stop slot fired in Session View, -1 = Arrangement recording with no Session clip playing. [not in return/master tracks], e.g. [0, 1, -2, 3, 4, 5, 6, 7, 8, 9]
   * @returns Returns a promise with a boolean. True if the actual playingSlotIndexes is the same as the criteria, otherwise false.
   */
  ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack = "CLIPS_PLAYING_SLOT_INDEXES_BY_PLAYING_SLOT_INDEX_AT_EACH_TRACK",

  /**
   * @description Function that checks that the tracks of the Session View have the correct number of tracks.
   * @param trackLengthMinCriteria: number - the minimum number of tracks in the song
   * @param trackLengthMaxCriteria: number - the maximum number of tracks in the song - can be the same as trackLengthMinCriteria
   * @returns A promise with a boolean. True if the actual number of tracks is between the min and max criteria, otherwise false.
   * */
  TrackLengthByMinAndMaxLength = "TRACK_LENGTH_BY_MIN_AND_MAX_LENGTH",

  /**
   * @description Function that checks if the track names at the specified indexes are correct
   * @param trackIndexesAndNamesCriteria: [number, string][] - array of track indexes and names, e.g. [[0, "1 Bass"], [1, "2 Drums"]]
   * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track has the correct name, as well as any additional verification data.
   */
  TrackNamesByIndex = "TRACK_NAMES_BY_INDEX",

  /**
   * @description Function that checks if the track types at the specified indexes are correct
   * @param trackIndexesAndTypesCriteria: [number, string][] - array of track indexes and types, either MIDI or Audio, e.g. [[0, "MIDI"], [1, "Audio"]]
   * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track has the correct type, as well as any additional verification data.
   * */
  TrackTypesByIndex = "TRACK_TYPES_BY_INDEX",

  /**
   * @description Function that checks if a clip exists in the specified track at a given clip slot index. Uses the has_clip property of the ClipSlot object.
   * @param trackIndex: number - the index of the track
   * @param clipSlotIndex: number - the index of the clip slot
   * @param hasClipCriteria: boolean - true if the clip should exist, false if the clip should not exist
   * @returns A Promise with an ICheckResult object containing a boolean indicating whether the clip existance is correct, as well as any additional verification data.
   */
  ClipExistByTrackAndClipSlotIndex = "CLIP_EXIST_BY_TRACK_AND_CLIP_SLOT_INDEX",

  /**
   * @description Function that checks if the clip length is correct at the specified track and clip slot index.
   * @param trackIndex: number - the index of the track
   * @param clipSlotIndex: number - the index of the clip slot
   * @param clipLengthCriteria: number - the required length of the clip
   * @returns
   */
  ClipLengthByTrackAndClipSlotIndex = "CLIP_LENGTH_BY_TRACK_AND_CLIP_SLOT_INDEX",

  /**
   * @description Function that checks if the clip names at the specified clip slot indexes of the specified track indexes are correct
   * @param trackIndexesAndClipNamesCriteria: [number, [number, string][]][] - array of track indexes and clip slot indexes and names. If the clip slot should be empty, we will write null instead of a string, e.g. [[0, [[0, null], [1, "D2"]]], [1, [[0, "B1"], [1, null]]]]
   * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track contains the correct clip names, as well as any additional verification data.
   * */
  ClipNamesByTrackAndSlotIndexes = "CLIP_NAMES_BY_TRACK_AND_SLOT_INDEXES",

  /**
   * @description Function that checks if the song tempo is correct.
   * @param tempoCriteria: number - the required tempo of the song
   * @returns A promise with a boolean. True if the song tempo is the same as the criteria, otherwise false.
   * */
  SongTempo = "SONG_TEMPO",
  NotDefined = "NOT_DEFINED",
}
export class Criterion {
  criterionType: CriterionType = CriterionType.NotDefined;
  correctValue: any = undefined;

  constructor(criterionType: CriterionType, correctValue: any) {
    this.criterionType = criterionType;
    this.correctValue = correctValue;
  }
}
