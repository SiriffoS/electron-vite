import { Criterion, CriterionType } from "_common/models/criterion";
export async function getSolutionCriteriaByTaskId(
  taskId: number,
): Promise<Criterion[]> {
  const criteria: Criterion[] = [];

  switch (taskId) {
    //Exercise: One at a time *******************************************************
    case 1:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0],
        ),
      );
      break;
    case 2:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2],
        ),
      );
      break;
    case 3:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0],
        ),
      );
      break;
    case 4:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1],
        ),
      );
      break;
    case 5:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [3],
        ),
      );
      break;

    //Exercise: Multiple clips *******************************************************
    case 6:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0, 1, -2],
        ),
      );
      break;
    case 7:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [-2, 2, 2],
        ),
      );
      break;
    case 8:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0, 0, 0],
        ),
      );
      break;
    case 9:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, -2, 1],
        ),
      );
      break;
    case 10:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, 2, 2],
        ),
      );
      break;
    case 11:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1, 2, -2],
        ),
      );
      break;

    //Exercise: Timing clips *******************************************************
    case 12:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, 1, -2, -2],
        ),
      );
      break;
    case 13:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [-2, 0, 1, -2],
        ),
      );
      break;
    case 14:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1, -2, -2, 0],
        ),
      );
      break;
    case 15:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, 0, -2, 0],
        ),
      );
      break;
    case 16:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [-2, 1, 2, 0],
        ),
      );
      break;

    //Exercise: Stock clips *******************************************************
    case 17:
      criteria.push(
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drums"]]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Elektro Straight 126 bpm"],
              [1, "Elektro Straight 126 bpm"],
              [2, "Elektro Straight 126 bpm"],
            ],
          ],
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0],
        ),
      );
      break;
    case 18:
      criteria.push(
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [2, 2]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bells"],
        ]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Elektro Straight 126 bpm"],
              [1, "Elektro Straight 126 bpm"],
              [2, "Elektro Straight 126 bpm"],
            ],
          ],
          [
            1,
            [
              [0, "Arp Bells C Minor 121 bpm"],
              [1, null],
              [2, null],
            ],
          ],
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0, 0],
        ),
      );
      break;
    case 19:
      criteria.push(
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [3, 3]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bells"],
          [2, "3 Keys"],
        ]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Elektro Straight 126 bpm"],
              [1, "Elektro Straight 126 bpm"],
              [2, "Elektro Straight 126 bpm"],
            ],
          ],
          [
            1,
            [
              [0, "Arp Bells C Minor 121 bpm"],
              [1, null],
              [2, null],
            ],
          ],

          [
            2,
            [
              [0, "Arp Build Up C Minor 130 bpm"],
              [1, null],
              [2, null],
            ],
          ],
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0, 0, 0],
        ),
      );
      break;
    case 20:
      criteria.push(
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Elektro Straight 126 bpm"],
              [1, "Elektro Straight 126 bpm"],
              [2, "Elektro Straight 126 bpm"],
            ],
          ],
          [
            1,
            [
              [0, "Arp Bells C Minor 121 bpm"],
              [1, "Uplifting Club Vamp F Min 127 bpm"],
              [2, null],
            ],
          ],

          [
            2,
            [
              [0, "Arp Build Up C Minor 130 bpm"],
              [1, "UK Bass Reese F Minor 130 bpm"],
              [2, null],
            ],
          ],
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1, 1, 1],
        ),
      );
      break;
    case 21:
      criteria.push(
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Elektro Straight 126 bpm"],
              [1, "Elektro Straight 126 bpm"],
              [2, "Elektro Straight 126 bpm"],
            ],
          ],
          [
            1,
            [
              [0, "Arp Bells C Minor 121 bpm"],
              [1, "Uplifting Club Vamp F Min 127 bpm"],
              [2, "Arp Dark G Minor 126 bpm"],
            ],
          ],

          [
            2,
            [
              [0, "Arp Build Up C Minor 130 bpm"],
              [1, "UK Bass Reese F Minor 130 bpm"],
              [2, "Climbing Keys G Minor 140 bpm"],
            ],
          ],
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, 2, 2],
        ),
      );
      break;

    //Exercise: Kicks 2 bars quarter notes *******************************************************
    case 22:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0],
        ),
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 1, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 5, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 23:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1],
        ),
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 24:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 25:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 26:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;

    //Exercise: Kicks 2: 2 bars 8th notes *******************************************************
    case 27:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 28:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 29:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 30:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [3],
        ),
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 36,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 31:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    //Snares 1: two bars quarter notes Project
    case 32:
      criteria.push(
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0],
        ),
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 1, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 3, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 5, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 7, duration: 1, velocity: 99, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 33:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 1, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 5, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 7, duration: 1, velocity: 99, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 34:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 6, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 1, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 2, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 5, duration: 1, velocity: 100, muted: false },
            { pitch: 37, time: 7, duration: 1, velocity: 99, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 35:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 3, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 1, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 2, duration: 1, velocity: 99, muted: false },
            { pitch: 37, time: 6, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 36:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 1, velocity: 99, muted: false },
            { pitch: 36, time: 2, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 1, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 1, velocity: 100, muted: false },
            { pitch: 37, time: 3, duration: 1, velocity: 100, muted: false },
            { pitch: 37, time: 5, duration: 1, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    //Exercise: Snares 2: 2 bars eighth notes *******************************************************
    case 37:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 1, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 3, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 37,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 37,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 38:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 37, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 6, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 39:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 37, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 6, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 40:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 37, time: 1, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 6, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 41:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 36,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 36,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 1, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 37, time: 6, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    //Exercise: Hihats 1: 2 bars eighth notes *******************************************************
    case 42:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 46, time: 7, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 43:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 46, time: 0, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 44:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 46, time: 3, duration: 0.5, velocity: 100, muted: false },
            { pitch: 46, time: 7, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 45:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 46, time: 7, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    case 46:
      criteria.push(
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 0.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            { pitch: 46, time: 2, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
      );
      break;
    //Exercise: Drums to melodies 1: 2 bars eighth notes *******************************************************
    case 47:
      criteria.push(
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Intro drums"],
              [1, null],
              [2, null],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 0, 8],
        ),
        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          0,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [0, -2, 0, -2, -2],
        ),
      );
      break;
    case 48:
      criteria.push(
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Intro drums"],
              [1, "Verse drums"],
              [2, null],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 1, 8],
        ),

        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          1,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [1, 1, -2, -2, 1],
        ),
      );
      break;
    case 49:
      criteria.push(
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Intro drums"],
              [1, "Verse drums"],
              [2, "Build drums"],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 2, 8],
        ),

        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          2,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 42,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [2, -2, 2, 2, -2],
        ),
      );
      break;
    case 50:
      criteria.push(
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Intro drums"],
              [1, "Verse drums"],
              [2, "Build drums"],
              [3, "Chorus drums"],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 3, 8],
        ),

        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          3,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 1.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            {
              pitch: 36,
              time: 3.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            { pitch: 38, time: 6, duration: 0.5, velocity: 100, muted: false },
            { pitch: 42, time: 1, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 2.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 3, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 4.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 5, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 46, time: 0, duration: 0.5, velocity: 100, muted: false },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [3, 3, 3, 3, 3],
        ),
      );
      break;
    case 51:
      criteria.push(
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "Intro drums"],
              [1, "Verse drums"],
              [2, "Build drums"],
              [3, "Chorus drums"],
              [4, "Outro drums"],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 4, 8],
        ),

        new Criterion(CriterionType.ClipNotesByTrackAndClipSlotIndex, [
          0,
          4,
          [
            { pitch: 36, time: 0, duration: 0.5, velocity: 100, muted: false },
            { pitch: 36, time: 4, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 36,
              time: 5.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 38, time: 2, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 6.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
            { pitch: 42, time: 7, duration: 0.5, velocity: 100, muted: false },
            {
              pitch: 42,
              time: 7.5,
              duration: 0.5,
              velocity: 100,
              muted: false,
            },
          ],
          true,
          true,
          false,
          false,
          false,
        ]),
        new Criterion(CriterionType.SongIsPlayingStatus, [true]),
        new Criterion(
          CriterionType.ClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack,
          [4, 4, 4, -2, -2],
        ),
      );
      break;
    default:
      break;
  }

  return Promise.resolve(criteria);
}
