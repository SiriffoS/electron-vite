import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Box, Button, Flex, Icon, Progress } from "@chakra-ui/react";
import { HiPlay, HiStop } from "react-icons/hi2";

const PATH_TO_TARGETSOUND_FOLDER = "../assets/sounds/targets/";
const FILE_EXTENSION = ".mp3";
interface SoundPlayerComponentProps {
  fileName: string;
  title: string;
  isEnabled: boolean;
  onPlayedCallback: () => {};
  stop: boolean;
}

const SoundPlayerComponent: React.FC<SoundPlayerComponentProps> = React.memo(
  ({ fileName, title, isEnabled, onPlayedCallback, stop }) => {
    const [sound, setSound] = useState<Howl | null>(null);
    const [isTargetPlaying, setIsTargetPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const intervalRef = useRef<number | NodeJS.Timer | null>(null);

    useEffect(() => {
      if (stop === true) {
        window.electronAPI.setDawIsPlayingStatus(false);
      }
    }, [stop]);

    const targetSoundFilePath: string =
      PATH_TO_TARGETSOUND_FOLDER + fileName + FILE_EXTENSION;
    //const [metronomeEnabled, setMetronomeEnabled] = useState<boolean>(true);
    //const intervalRef = useRef<number | null>(null);
    //const clickSoundRef = useRef<Howl | null>(null);

    useEffect(() => {
      sound?.stop();
      const soundInstance = new Howl({
        src: [targetSoundFilePath],
        preload: true,
        loop: true,
        onplay: () => {
          setIsTargetPlaying(true);
          updateProgress(soundInstance);
          //stopPlayingInDaw();
        },
        onpause: () => {
          setIsTargetPlaying(false);
          // stopMetronome();
        },
        onstop: () => {
          setIsTargetPlaying(false);
          // stopMetronome();
        },
        onend: () => {
          setIsTargetPlaying(false);
          // stopMetronome();
        },
        onseek: () => {
          updateProgress(soundInstance);
        },
      });
      setProgress(0);
      setSound(soundInstance);

      return () => {
        soundInstance.unload();
        setSound(null);
      };
    }, [fileName]);

    const stopAndResetSound = () => {
      if (sound) {
        sound?.stop();
        sound?.seek(0);
        setProgress(0);
        setIsTargetPlaying(false);
      }
    };

    const count = 0;
    useEffect(() => {
      //console.log("useEffect", count++);
      // //Add is playing listener and update based on this
      const checkIfSoundShouldBeStopped = async (isPlayingStatus: boolean) => {
        //console.log("check");
        if (isPlayingStatus === true) {
          stopAndResetSound();
        }
      };

      const addDawIsPlayingStatusListener = async () => {
        //console.log("add");
        window.electronAPI.onDawIsPlayingStatusChange(
          checkIfSoundShouldBeStopped,
        );
      };

      const getInitialIsPlayingStatus = async () => {
        //console.log("initial");
        const isPlayingStatus: boolean =
          await window.electronAPI.getDawIsPlayingStatus();
        await checkIfSoundShouldBeStopped(isPlayingStatus);
      };

      addDawIsPlayingStatusListener();
      getInitialIsPlayingStatus();

      return () => {
        window.electronAPI.removeIsPlayingStatusListener(
          checkIfSoundShouldBeStopped,
        );
        //console.log("remove");
      };
    }, [sound]);

    useEffect(() => {
      if (!isEnabled && isTargetPlaying && sound !== null) {
        stopAndResetSound();
      }
    }, [isEnabled]);

    const handlePlayPauseClick = () => {
      if (isTargetPlaying) {
        stopAndResetSound();
      } else {
        sound?.play();
        stopPlayingInDaw();
      }
      setIsTargetPlaying(!isTargetPlaying);
      onPlayedCallback();
    };

    const stopPlayingInDaw = async () => {
      window.electronAPI.setDawIsPlayingStatus(false);
    };

    // Listen for changes in the DAW Is Playing status and stop the sound playing if it is playing

    const updateProgress = (soundInstance: Howl) => {
      const interval = 1000 / 60; // 60 fps
      if (intervalRef.current !== null) {
        clearInterval(10);
      }
      intervalRef.current = setInterval(() => {
        const currentTime = soundInstance.seek() as number;
        const duration = soundInstance.duration() as number;
        const currentProgress = (currentTime / duration) * 100;
        setProgress(currentProgress);
      }, interval);
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const progressBar = e.currentTarget;
      const bounds = progressBar.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const clickPositionRatio = x / bounds.width;

      if (sound) {
        const duration = sound.duration();
        if (duration) {
          sound.seek(clickPositionRatio * duration);
          setProgress(clickPositionRatio * 100);
        }
      }
    };

    return (
      <Button
        variant="secondaryButton"
        flexDir={"column"}
        p={"0px"}
        alignItems={"flex-start"}
        overflow={"hidden"}
        gap={"0px"}
        width="100%"
        onClick={handlePlayPauseClick}
        isDisabled={!isEnabled}
      >
        <Flex
          flexDir={"row"}
          p={"sm"}
          gap={"sm"}
          width={"100%"}
          flexGrow={1}
          alignItems={"center"}
          alignSelf={"stretch"}
          justifyContent={"center"}
        >
          <Icon as={isTargetPlaying ? HiStop : HiPlay} boxSize={"15px"} />
          <Box textStyle="b1">{title}</Box>
        </Flex>
        <Progress
          value={progress}
          onClick={handleProgressBarClick}
          variant={"playProgress"}
        />
        {/* <Icon
        as={GiMetronome}
        onClick={HandleMetronomeSwitch}
        color={metronomeEnabled ? "sc_black.800" : "sc_green.400"}
        boxSize={"20px"}
      /> */}
      </Button>
    );
  },
);

export default SoundPlayerComponent;

// useEffect(() => {
//   if (isPlaying && metronomeEnabled) {
//     startMetronome(sound as Howl);
//   } else {
//     stopMetronome();
//   }
// }, [isPlaying, metronomeEnabled]);

// const clickSound = new Howl({
//   src: ["../assets/sounds/effects/metronome/ClaveSynth.wav"],
//   preload: true
// });

// const startMetronome = (soundInstance: Howl) => {
//   let beatNumber = 0;
//   const beatInterval = 60 / bpm;
//   const beatTime = soundInstance.seek() as number;
//   const nextBeatTime = beatTime + beatInterval;

//   const scheduleNextBeat = () => {
//     beatNumber++;
//     const expectedBeatTime = beatTime + beatNumber * beatInterval;
//     const elapsedTime = (soundInstance.seek() as number) - beatTime;
//     const timeUntilNextBeat = expectedBeatTime - elapsedTime;
//     intervalRef.current = window.setTimeout(() => {
//       clickSound.play();
//       scheduleNextBeat();
//     }, timeUntilNextBeat * 1000);
//   };

//   intervalRef.current = window.setTimeout(() => {
//     clickSound.play();
//     scheduleNextBeat();
//   }, nextBeatTime * 1000 - Date.now() / 1000);
// };

// const stopMetronome = () => {
//   clearInterval(intervalRef.current as number);
// };

// const HandleMetronomeSwitch = () => {
//   setMetronomeEnabled((prevMetronomeEnabled) => {
//     if (prevMetronomeEnabled) {
//       stopMetronome();
//     }
//     return !prevMetronomeEnabled;
//   });
// };
