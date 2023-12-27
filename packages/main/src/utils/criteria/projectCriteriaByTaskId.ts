import { Criterion, CriterionType } from "_common/models/criterion";

export async function getProjectCriteriaByTaskId(
  taskId: number,
): Promise<Criterion[]> {
  const criteria: Criterion[] = [];
  switch (taskId) {
    //Exercise: One at a time *******************************************************
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drums"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 0, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 1, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 2, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 3, 4],
        ),
      );
      break;

    //Exercise: Multiple clips *******************************************************
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [3, 3]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bass"],
          [2, "3 Church Bells"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
          [
            1,
            [
              [0, "B1"],
              [1, "B2"],
              [2, "B3"],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
          [
            2,
            [
              [0, "C1"],
              [1, "C2"],
              [2, "C3"],
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
          [0, 0, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 1, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 2, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [1, 0, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [1, 1, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [1, 2, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 0, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 1, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 2, 4],
        ),
      );
      break;

    //Exercise: Timing clips *******************************************************
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [4, 4]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
          [3, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bass"],
          [2, "3 Leads"],
          [3, "4 Arpegiator"],
        ]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1 (1 bar)"],
              [1, "D2 (2 bars)"],
              [2, "D3 (2 bars)"],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
          [
            1,
            [
              [0, "B1 (4 bars)"],
              [1, "B2 (4 bars)"],
              [2, null],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
          [
            2,
            [
              [0, "L1 (2 bars)"],
              [1, "L2 (4 bars)"],
              [2, "L3 (4 bars)"],
              [3, null],
              [4, null],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
          [
            3,
            [
              [0, "A1 (4 bars)"],
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
          [0, 0, 4],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 1, 8],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [0, 2, 8],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [1, 0, 16],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [1, 1, 16],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 0, 8],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 1, 16],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [2, 2, 16],
        ),
        new Criterion(
          CriterionType.ClipLengthByTrackAndClipSlotIndex,
          [3, 0, 16],
        ),
      );
      break;

    //Exercise: Stock clips *******************************************************
    case 17:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
      );

      break;
    case 18:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 2]),
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
      );
      break;
    case 19:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [2, 3]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bells"],
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
      );
      break;
    case 20:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [3, 3]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bells"],
          [2, "3 Keys"],
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
          [1, [[0, "Arp Bells C Minor 121 bpm"]]],
          [2, [[0, "Arp Build Up C Minor 130 bpm"]]],
        ]),
      );
      break;
    case 21:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [110]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [3, 3]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bells"],
          [2, "3 Keys"],
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
            ],
          ],
          [
            2,
            [
              [0, "Arp Build Up C Minor 130 bpm"],
              [1, "UK Bass Reese F Minor 130 bpm"],
            ],
          ],
        ]),
      );

      break;
    //Exercise: Kicks 2 bars quarter notes *******************************************************
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [130]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Kicks"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, "D5"],
              [5, null],
              [6, null],
              [7, null],
            ],
          ],
        ]),
      );
      break;
    //Exercise: Kicks 2: 2 bars 8th notes *******************************************************

    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drum Rack"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, "D5"],
              [5, null],
              [6, null],
            ],
          ],
        ]),
      );
      break;
    //Exercise: Snares 1: 2 bars quarter notes *******************************************************
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drum Rack"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, "D5"],
              [5, null],
              [6, null],
            ],
          ],
        ]),
      );
      break;
    //Exercise: Snares 2: 2 bars eighth notes *******************************************************
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drum Kit"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, "D5"],
              [5, null],
              [6, null],
            ],
          ],
        ]),
      );
      break;
    //Exercise: Hihats 1: 2 bars eighth notes *******************************************************
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [1, 1]),
        new Criterion(CriterionType.TrackTypesByIndex, [[0, "MIDI"]]),
        new Criterion(CriterionType.TrackNamesByIndex, [[0, "1 Drum Kit"]]),
        new Criterion(CriterionType.ClipNamesByTrackAndSlotIndexes, [
          [
            0,
            [
              [0, "D1"],
              [1, "D2"],
              [2, "D3"],
              [3, "D4"],
              [4, "D5"],
              [5, null],
              [6, null],
            ],
          ],
        ]),
      );
      break;
    //Exercise: Drums to melodies 1: 2 bars eighth notes *******************************************************
    case 47:
    case 48:
    case 49:
    case 50:
    case 51:
      criteria.push(
        new Criterion(CriterionType.SongTempo, [120]),
        new Criterion(CriterionType.TrackLengthByMinAndMaxLength, [5, 5]),
        new Criterion(CriterionType.TrackTypesByIndex, [
          [0, "MIDI"],
          [1, "MIDI"],
          [2, "MIDI"],
          [3, "MIDI"],
          [4, "MIDI"],
        ]),
        new Criterion(CriterionType.TrackNamesByIndex, [
          [0, "1 Drums"],
          [1, "2 Bass"],
          [2, "3 Piano"],
          [3, "4 Melody"],
          [4, "5 Voicelike"],
        ]),
      );
      break;
    default:
      break;
  }
  return Promise.resolve(criteria);
}
