import {
  Flex,
  Button,
  Icon,
  Text,
  Box,
  Progress,
  SlideFade,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Accordion,
  IconButton,
  Collapse,
  ListItem,
  UnorderedList,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { IoClose, IoCloseCircle, IoPlaySharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiFolderMusicLine, RiQuestionnaireLine } from "react-icons/ri";
import { TbCircleFilled } from "react-icons/tb";
import { RxDotFilled } from "react-icons/rx";
import { BiChat, BiError } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "_common/models/exercise";
import SoundPlayerComponent from "./components/soundPlayerComponent";
import { HintListComponent } from "./components/hintListComponent";
import { Task } from "_common/models/task";
import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";
import { AlertComponent } from "../shared-components/alertComponent";
import { StepStatus } from "../shared-components/stepStatusComponent";
import { CloseButton } from "../shared-components/closeButton";
import { useSetupStates } from "../shared-components/useSetupStates";
import { ImCheckmark } from "react-icons/im";
import { ICheckResult } from "_common/models/checkResult";
import { Howl } from "howler";
import { formatText } from "../setup_view/setupUtil";
import { BsMagic } from "react-icons/bs";
import { MoreOptionsButton } from "../shared-components/moreOptionsButtonComponent";
import { ExerciseStatisticsContext } from "_/contexts/supabase/exerciseStatisticsContext";
import { ExerciseStatisticsHelper } from "_/contexts/supabase/exerciseStatisticsHelper";
import useExerciseStore from "_/utils/stateStores/useExerciseStore";
import successSoundFile from '../../sounds/daw-solution-correct-sound.mp3';
import failSoundFile from '../../sounds/daw-solution-incorrect-sound.mp3';

const PATH_TO_VIDEO_FOLDER = "public/assets/videos/";
const PATH_TO_THUMBNAILS_FOLDER = "/assets/Images/thumbnails/";
const IMAGE_FILE_EXTENSION = ".jpg";
const VIDEO_FILE_EXTENSION = ".mp4";

export const ExerciseView: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { exerciseId = "0" } = useParams<{ exerciseId?: string }>();
  const { levelId = "99999999999999999" } = useParams<{ levelId: string }>();
  const levelIdInt = parseInt(levelId);
  const exerciseIdInt = parseInt(exerciseId);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [enabledIndex, setEnabledIndex] = useState(0);

  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [currentTask, setCurrentTask] = useState<Task>(new Task());
  const [hints, setHints] = useState<string[]>([]); //DONE
  const [openVideo, setOpenVideo] = useState(false);
  const [exerciseVideoName, setExerciseVideoName] = useState<string>("");
  const [isAnimated, setIsAnimated] = useState(false);
  const [newVideo, setNewVideo] = useState(true);
  const [inCorrectProjectMessage, setIncorrectProjectMessage] = useState("");
  const exerciseStatisticsHelper = useContext<ExerciseStatisticsHelper | null>(
    ExerciseStatisticsContext,
  );
  const { attempts, hintsUsed } = useExerciseStore();

  const {
    isMidiScriptCopiedStatus = { isCorrect: true },
    dawConnectedCheckResult,
    setForceUpdate,
  } = useSetupStates();

  useEffect(() => {
    const getExercise = async () => {
      if (exerciseId) {
        /*const level: Level = await window.electronAPI.getLevelById(
          parseInt(levelId)
        );*/

        const exercise: Exercise = await window.electronAPI.getExerciseById(
          parseInt(exerciseId),
        );
        // setTitle(level.title + ": " + exercise.title);
        setTitle(exercise.title);
        const hasWatchedExercise =
          await window.electronAPI.hasWatchedExercise(exerciseId);
        setNewVideo(!hasWatchedExercise);
        setForceUpdate(true);
      }
    };
    getExercise();
  }, []);

  const resizeWindow = async () => {
    setOpenVideo((prevOpenVideo) => (prevOpenVideo = !prevOpenVideo));
    await window.electronAPI.updateWatchedExercise(exerciseId);
    const hasWatchedExercise =
      await window.electronAPI.hasWatchedExercise(exerciseId);
    setNewVideo(!hasWatchedExercise);
    if (!openVideo) {
      window.electronAPI.resizeToFullscreen();
    } else {
      window.electronAPI.resizeToNormalSize();
    }
  };

  useEffect(() => {
    const fetchExerciseAndTasks = async () => {
      //Fetch the exercise from the backend
      const exerciseById: Exercise =
        await window.electronAPI.getExerciseById(exerciseIdInt);
      setExerciseVideoName(exerciseById.videoFileName);
      //Fetch tasks for exercise
      const tasksByExerciseId: Task[] =
        await window.electronAPI.getTasksByExerciseId(exerciseIdInt);
      setTasks(tasksByExerciseId);
    };
    fetchExerciseAndTasks();
  }, [exerciseId]);
  const hasSentStatisticsRef = useRef(false);

  //Fetch the current task and hints when the currentTaskIndex changes
  useEffect(() => {
    async function fetchTaskAndHints() {
      const task: Task = tasks[currentTaskIndex];

      if (task) {
        task._checkTextListed = task.checkText.split("|");
      }
      setCurrentTask(task);
      if (task && task.hints) {
        const taskHints = task.hints.split("|");
        if (taskHints) {
          setHints(taskHints);
        }
      }
      let projectCheckResult: ICheckResult;
      projectCheckResult =
        await window.electronAPI.getProjectVerificationResultByTaskId(
          currentTask?.id,
        );

      if (!exerciseStatisticsHelper) {
        return;
      }
      if (!hasSentStatisticsRef.current && task) {
        exerciseStatisticsHelper.startExercise(exerciseId, task.id);
        hasSentStatisticsRef.current = true;
      }
    }

    fetchTaskAndHints();
  }, [currentTaskIndex, tasks]);

  const [stopSound, setStopSound] = useState(false);
  const handleNextClick = async () => {
    setStopSound(true);
    if (exerciseStatisticsHelper) {
      exerciseStatisticsHelper.endExercise(exerciseId, attempts, hintsUsed);
      hasSentStatisticsRef.current = false;
    }
    //<Link to={"/course/1/level/1/exercise/" + id}>
    // If there are more tasks, increment the index to render the next task
    if (currentTaskIndex == tasks.length - 1) {
      await window.electronAPI.setExerciseCompleted(
        1,
        levelIdInt,
        parseInt(exerciseId),
      );
    }
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      //return to the level view
      navigate(-1);
    }
  };

  return (
    <>
      {openVideo && (
        <VideoComponent
          setOpenVideo={setOpenVideo}
          videoName={exerciseVideoName}
          resizeWindow={resizeWindow}
        />
      )}
      <Flex flexDir="column" hidden={openVideo}>
        <Flex layerStyle={"controlBar"} justifyContent="space-between">
          <CloseButton clickHandler={() => navigate(-1)}></CloseButton>
          <Flex w="100%" justifyContent="flex-end" gap="5px">
            <MoreOptionsButton />
          </Flex>
        </Flex>
        {!isMidiScriptCopiedStatus?.isCorrect && (
          <Flex layerStyle={"controlBar"} justifyContent={"end"}>
            <Button
              textColor="sc_yellow.300"
              variant="controlButton"
              bg="sc_black.400"
              onClick={() => navigate("/setup")}
              maxHeight={"25px"}
            >
              🛠️ Setup is needed
            </Button>
          </Flex>
        )}
        <Flex
          layerStyle={"mainContentContainer"}
          flexDir="column"
          opacity={!isMidiScriptCopiedStatus?.isCorrect ? 0.2 : 1}
          style={
            !isMidiScriptCopiedStatus?.isCorrect
              ? { pointerEvents: "none" }
              : {}
          }
        >
          {exerciseVideoName && (
            <Flex flexDir={"column"} gap={"lg"}>
              <VideoThumbnail
                resizeWindow={resizeWindow}
                thumbnailName={exerciseVideoName}
                newVideo={newVideo}
                title={title}
              ></VideoThumbnail>
            </Flex>
          )}
          <Flex flexDir={"column"} gap={"lg"}>
            <TargetDivider
              progress={((currentTaskIndex + 1) / (tasks.length + 1)) * 100}
            />
            <ProjectSection
              currentTaskId={currentTask?.id}
              setEnabledIndex={setEnabledIndex}
              disabled={
                enabledIndex !== 0 || !isMidiScriptCopiedStatus?.isCorrect
              }
              setIncorrectMessage={setIncorrectProjectMessage}
              incorrectMessage={inCorrectProjectMessage}
            />
            {currentTask && currentTask.soundFileName ? (
              <>
                <TargetSoundComponent
                  currentTask={currentTask}
                  disabled={
                    enabledIndex < 1 || !dawConnectedCheckResult?.isCorrect
                  }
                  setEnabledIndex={setEnabledIndex}
                  isAnimated={isAnimated}
                  stop={stopSound}
                />
                <CheckComponent
                  currentTask={currentTask}
                  hints={hints}
                  disabled={
                    enabledIndex < 2 || !dawConnectedCheckResult?.isCorrect
                  }
                  handleNextClick={handleNextClick}
                  isAnimated={isAnimated}
                  setIsAnimated={setIsAnimated}
                  exerciseId={exerciseIdInt}
                  setEnabledIndex={setEnabledIndex}
                  setIncorrectProjectMessage={setIncorrectProjectMessage}
                  isLastExercise={currentTaskIndex == tasks.length - 1}
                />
              </>
            ) : (
              <CheckComponent
                currentTask={currentTask}
                hints={hints}
                disabled={
                  enabledIndex < 1 || !dawConnectedCheckResult?.isCorrect
                }
                handleNextClick={handleNextClick}
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
                exerciseId={exerciseIdInt}
                setEnabledIndex={setEnabledIndex}
                setIncorrectProjectMessage={setIncorrectProjectMessage}
                isLastExercise={currentTaskIndex == tasks.length - 1}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

interface CircleIconProps {
  correct?: boolean;
}
const CircleIcon: React.FC<CircleIconProps> = ({ correct }) => {
  const iconProps = {
    height: "25px",
    width: "15px",
  };

  return (
    <Icon
      {...iconProps}
      as={
        correct === true
          ? HiCheckCircle
          : correct === false
            ? IoCloseCircle
            : TbCircleFilled
      }
      color={
        correct === true
          ? "sc_green.400"
          : correct === false
            ? "sc_red.300"
            : "sc_black.300"
      }
    />
  );
};
interface TaskButtonProps {
  video: boolean;
  handleClickButton: () => void;
}

const TaskButton: React.FC<TaskButtonProps> = ({
  video,
  handleClickButton,
}) => {
  return (
    <IconButton
      variant="iconButton"
      icon={video ? <MdOndemandVideo /> : <RiFolderMusicLine />}
      aria-label={""}
      onClick={handleClickButton}
    />
  );
};

interface TaskComponentProps {
  taskText: string;
  video: boolean;
  children?: React.ReactNode;
  disabled: boolean;
  buttonClick: () => void;
  correct?: boolean;
  lowFocus: boolean;
}

const TaskComponent: React.FC<TaskComponentProps> = ({
  taskText,
  video,
  disabled,
  buttonClick,
  correct,
  lowFocus,
}) => {
  return (
    <Flex
      gap="10px"
      opacity={lowFocus ? 0.5 : disabled ? 0.2 : 1}
      style={disabled && !lowFocus ? { pointerEvents: "none" } : {}}
    >
      <CircleIcon correct={correct} />
      <Flex justifyContent="space-between" flexGrow="1">
        <Flex textStyle="p1" alignSelf="stretch" alignItems="center">
          <Text>{taskText}</Text>
        </Flex>
        <TaskButton video={video} handleClickButton={buttonClick} />
      </Flex>
    </Flex>
  );
};

interface VideoSectionProps {
  disabled: boolean;
  setEnabledIndex: Dispatch<SetStateAction<number>>;
  resizeWindow: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  disabled,
  setEnabledIndex,
  resizeWindow,
}) => {
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [lowFocus, setLowFocus] = useState(false);
  const videoButtonHandler = () => {
    setIsCorrect(true);
    setEnabledIndex((prevEnabledIndex) => {
      let nextIndex = prevEnabledIndex;
      if (prevEnabledIndex === 0) {
        nextIndex = prevEnabledIndex + 1;
      }
      return nextIndex;
    });
    setLowFocus(true);
    resizeWindow();
  };
  return (
    <TaskComponent
      taskText="Watch this video"
      video={true}
      disabled={disabled}
      correct={isCorrect}
      buttonClick={videoButtonHandler}
      lowFocus={lowFocus}
    />
  );
};

interface ProjectComponentProps {
  disabled: boolean;
  currentTaskId?: number;
  setEnabledIndex: Dispatch<SetStateAction<number>>;
  incorrectMessage: string;
  setIncorrectMessage: Dispatch<SetStateAction<string>>;
}

const ProjectSection: React.FC<ProjectComponentProps> = React.memo(
  ({
    disabled,
    currentTaskId,
    setEnabledIndex,
    incorrectMessage,
    setIncorrectMessage,
  }) => {
    const [lowFocus, setLowFocus] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean>();
    useEffect(() => {
      if (incorrectMessage !== "") {
        setIsCorrect(false);
        setLowFocus(false);
        disabled = false;
      }
    }, [incorrectMessage]);

    return (
      <Flex flexDir="column" gap="10px">
        <TaskComponent
          taskText="Open Exercise"
          video={false}
          disabled={disabled}
          correct={isCorrect}
          buttonClick={async () => {
            window.electronAPI
              .openStartProjectByTaskId(currentTaskId)
              .catch(console.error)
              .then(() => setIsCorrect(true));
            setEnabledIndex((prevEnabledIndex) =>
              prevEnabledIndex === 0 ? prevEnabledIndex + 1 : prevEnabledIndex,
            );
            setLowFocus(true);
            setIncorrectMessage("");
          }}
          lowFocus={lowFocus}
        />
        <Collapse in={incorrectMessage !== ""} animateOpacity>
          <AlertComponent
            visible={incorrectMessage !== ""}
            status={StepStatus.Error}
            text={incorrectMessage}
            onClose={() => setIncorrectMessage("")}
          ></AlertComponent>
        </Collapse>
      </Flex>
    );
  },
);
interface targetProviderProps {
  progress: number;
}
const TargetDivider: React.FC<targetProviderProps> = ({ progress }) => {
  return (
    <Flex alignItems="center" gap="10px">
      <Flex color={"sc_white.300"} textStyle={"h1"}>
        Tasks
      </Flex>
      <Progress variant="track" value={progress}></Progress>
    </Flex>
  );
};

interface VideoComponentProps {
  setOpenVideo: Dispatch<SetStateAction<boolean>>;
  videoName: string;
  resizeWindow: () => void;
}
const VideoComponent: React.FC<VideoComponentProps> = ({
  videoName,
  resizeWindow,
}) => {
  const [fullScreenSize, setFullScreenSize] = useState([]);
  useEffect(() => {
    const fetchScreenSize = async () => {
      const screenSize = await window.electronAPI.getScreenSize();
      setFullScreenSize(screenSize);
    };

    fetchScreenSize();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Execute your function here
        resizeWindow();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Flex flexDir="column" width="100%">
      <Flex
        mt={0}
        width="100%"
        height="44px"
        bg="sc_black.800"
        flexDir="row"
        justifyContent="space-between"
        padding="10px"
        gap="md"
      >
        <SlideFade
          in={true}
          offsetX="-100px"
          offsetY="0px"
          transition={{ enter: { duration: 1 } }}
        >
          <Button
            onClick={resizeWindow}
            variant="controlButtonFocused"
            flexGrow="0"
          >
            Back to exercise
          </Button>
        </SlideFade>
        {/* <Box textStyle="p1">
          This video is a mandatory watch, as it covers critical information.
        </Box> */}
      </Flex>
      <ReactPlayer
        id="img"
        playing={true}
        controls={true}
        width={fullScreenSize[1]}
        height={fullScreenSize[0] - 74}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload, nofullscreen",
              // disablePictureInPicture: "{true}",
            },
          },
        }}
        url={
          "media-loader://" +
          PATH_TO_VIDEO_FOLDER +
          videoName +
          VIDEO_FILE_EXTENSION
        }
      />
    </Flex>
  );
};

interface TargetSoundComponentProps {
  disabled: boolean;
  currentTask: Task;
  setEnabledIndex: Dispatch<SetStateAction<number>>;
  isAnimated: boolean;
  stop: boolean;
}

const TargetSoundComponent: React.FC<TargetSoundComponentProps> = ({
  disabled,
  currentTask,
  setEnabledIndex,
  isAnimated,
  stop,
}) => {
  useEffect(() => {
    if (currentTask && !disabled && !currentTask.soundFileName) {
      setEnabledIndex(
        (prevEnabledIndex) => (prevEnabledIndex = prevEnabledIndex + 1),
      );
    }
  }, [disabled]);

  const [slideFadeKey, setSlideFadeKey] = useState<string>(
    Date.now().toString(),
  );

  const [isCorrect, setIsCorrect] = useState<boolean>();
  useEffect(() => {
    setSlideFadeKey(Date.now().toString());
  }, [isAnimated]);

  useEffect(() => {
    setIsCorrect(undefined);
  }, [currentTask.id]);

  return (
    <SlideFade
      key={slideFadeKey}
      in={true}
      offsetX="100px"
      offsetY={"0px"}
      transition={{ enter: { duration: 0.5 } }}
    >
      <Flex
        gap="10px"
        opacity={disabled ? 0.2 : 1}
        width="100%"
        style={disabled ? { pointerEvents: "none" } : {}}
      >
        <CircleIcon correct={isCorrect} />
        <Flex
          flexDir="column"
          gap="10px"
          justifyContent="space-between"
          flexGrow="1"
          overflow="hidden"
        >
          <Flex textStyle="p1" alignSelf="stretch" paddingTop="5px">
            <Text>Play target sound</Text>
          </Flex>
          {currentTask && currentTask.soundFileName && (
            <SlideFade in={true} offsetX="10px" offsetY={"0px"}>
              <SoundPlayerComponent
                title={currentTask.soundText || "Target sound"}
                fileName={currentTask.soundFileName}
                isEnabled={true}
                stop={stop}
                onPlayedCallback={async () => {
                  setEnabledIndex(
                    (prevEnabledIndex) =>
                    (prevEnabledIndex =
                      prevEnabledIndex === 1
                        ? prevEnabledIndex + 1
                        : prevEnabledIndex),
                  );
                  setIsCorrect(true);
                }}
              />
            </SlideFade>
          )}
        </Flex>
      </Flex>
    </SlideFade>
  );
};

interface CheckComponentProps {
  hints: string[];
  disabled: boolean;
  currentTask: Task;
  handleNextClick: () => void;
  isAnimated: boolean;
  setIsAnimated: Dispatch<SetStateAction<boolean>>;
  exerciseId: number;
  setEnabledIndex: Dispatch<SetStateAction<number>>;
  setIncorrectProjectMessage: Dispatch<SetStateAction<string>>;
  isLastExercise: boolean;
}

const CheckComponent: React.FC<CheckComponentProps> = ({
  hints,
  disabled,
  currentTask,
  handleNextClick,
  setIsAnimated,
  isAnimated,
  setEnabledIndex,
  setIncorrectProjectMessage,
  isLastExercise,
}) => {
  const [correctSolution, setCorrectSolution] = useState<boolean>();
  const [status, setStatus] = useState(StepStatus.Open);
  const [message, setMessage] = useState<string>();

  const { incrementAttempts } = useExerciseStore();

  const successSound = new Howl({
    src: [successSoundFile],
    preload: true,
    onplayerror: (e) => console.log(e),
    onend: () => {
      successSound.stop();
      console.log("plaaaying success");
    },
  });
  const failSound = new Howl({
    src: [failSoundFile],
    preload: true,
    onplayerror: (e) => console.log(e),
    onend: () => {
      failSound.stop();
      console.log("plaaaying fail");
    },
  });

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const verifySolution = async () => {
    setIsLoading(true);
    let projectCheckResult: ICheckResult;
    projectCheckResult =
      await window.electronAPI.getProjectVerificationResultByTaskId(
        currentTask?.id,
      );

    if (!projectCheckResult.isCorrect) {
      if (projectCheckResult.message) {
        setIncorrectProjectMessage(projectCheckResult.message);
      }
      setEnabledIndex((prevEnabledIndex) =>
        currentTask.soundFileName === undefined ||
          currentTask.soundFileName === ""
          ? (prevEnabledIndex = prevEnabledIndex - 1)
          : (prevEnabledIndex = prevEnabledIndex - 2),
      );
    } else {
      let solutionCheckResult: ICheckResult;
      solutionCheckResult =
        await window.electronAPI.getSolutionVerificationResultByTaskId(
          currentTask.id,
        );

      if (solutionCheckResult) {
        setIsAlertVisible(true);
        if (solutionCheckResult?.isCorrect) {
          setStatus(StepStatus.Done);
          successSound.play();
        } else {
          incrementAttempts();
          setStatus(StepStatus.Error);
          failSound.play();
        }
        if (solutionCheckResult.message) {
          setMessage(solutionCheckResult.message);
        }
      }
      setCorrectSolution(solutionCheckResult.isCorrect);
    }
    setIsLoading(false);
  };
  const [slideFadeKey, setSlideFadeKey] = useState<string>(
    Date.now().toString(),
  );

  useEffect(() => {
    if (isAnimated) {
      setIsAnimated(false);
      if (!isLoading) {
        setTimeout(() => setSlideFadeKey(Date.now().toString()), 100);
      }
    }
  }, [isAnimated]);

  return (
    <SlideFade
      key={slideFadeKey}
      in={true}
      offsetX="100px"
      offsetY={"0px"}
      transition={{ enter: { duration: 0.5 } }}
    >
      <Flex
        gap="10px"
        opacity={disabled ? 0.2 : 1}
        style={disabled ? { pointerEvents: "none" } : {}}
      >
        <CircleIcon correct={correctSolution} />
        <Flex
          flexDir="column"
          gap="10px"
          justifyContent="space-between"
          flexGrow="1"
        >
          <Flex
            direction="column"
            textStyle="p1"
            alignSelf="stretch"
            paddingTop="4px"
            color={"sc_white.400"}
          >
            {currentTask &&
              currentTask._checkTextListed.length > 1 &&
              currentTask._checkTextListed.map((checkText, index) => {
                if (checkText.startsWith("^")) {
                  // Start a new section with a heading
                  return (
                    <Text key={index} marginBottom={"xs"}>
                      {formatText(checkText.replace("^", ""))}
                    </Text>
                  );
                } else {
                  // Render list items for non-heading items
                  return (
                    <UnorderedList key={index} marginBottom={"sm"}>
                      <ListItem>{formatText(checkText)}</ListItem>
                    </UnorderedList>
                  );
                }
              })}
            {currentTask && currentTask._checkTextListed.length === 1 && (
              <Text>{formatText(currentTask.checkText)}</Text>
            )}
          </Flex>
          <SlideFade
            key={slideFadeKey + 2}
            in={true}
            offsetX="100px"
            offsetY={"0px"}
            transition={{ enter: { duration: 0.5 } }}
          >
            <Flex flexDir="column" gap={"md"}>
              <SlideFade
                key={slideFadeKey + 3}
                in={true}
                offsetX="100px"
                offsetY={"0px"}
                transition={{ enter: { duration: 0.5 } }}
              >
                {hints.length > 0 && <AccordionComponent hints={hints} />}
              </SlideFade>
              {!correctSolution ? (
                <SlideFade
                  key={slideFadeKey + 4}
                  in={true}
                  offsetX="100px"
                  offsetY={"0px"}
                  transition={{ enter: { duration: 0.5 } }}
                >
                  <Flex flexDir="column">
                    <Button
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      variant={"primaryButton"}
                      onClick={verifySolution}
                    >
                      Check
                    </Button>
                  </Flex>
                </SlideFade>
              ) : (
                <Button
                  p={"0px"}
                  overflow={"hidden"}
                  gap={"0px"}
                  width="100%"
                  variant="secondaryButton"
                  transitionDuration="200ms"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    setCorrectSolution(undefined);
                    handleNextClick();
                    setMessage(undefined);
                    if (currentTask && currentTask.soundFileName) {
                      setEnabledIndex(
                        (prevEnabledIndex) =>
                          (prevEnabledIndex = prevEnabledIndex - 1),
                      );
                    }
                    setIsLoading(false);
                  }}
                >
                  {isLastExercise ? "Finish" : "Continue"}
                </Button>
              )}
            </Flex>
          </SlideFade>
          {message && (
            <Collapse
              key={slideFadeKey + 5}
              in={message !== null && message !== undefined}
              animateOpacity
            >
              <AlertComponent
                visible={isAlertVisible}
                status={status}
                text={message}
                onClose={() => setIsAlertVisible(false)}
              ></AlertComponent>
            </Collapse>
          )}
        </Flex>
      </Flex>
    </SlideFade>
  );
};

interface AccordionComponentProps {
  hints: string[];
}
const AccordionComponent: React.FC<AccordionComponentProps> = ({ hints }) => {
  return (
    <Accordion allowToggle variant="custom">
      <AccordionItem>
        <AccordionButton p="5px">
          <Box as="span" textStyle="p1" flex="1" textAlign="left">
            Stuck? Get a hint
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pl="5px" pr="0px" pt="0px" pb="5px" textStyle="sh1">
          <HintListComponent hints={hints} isEnabled={true} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

interface HeaderButtonsProps {
  closeButtonClick: () => void;
  setupButtonClick: () => void;
  callback?: Dispatch<SetStateAction<number>>;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  closeButtonClick,
  setupButtonClick,
}) => {
  return (
    <Flex
      padding="10px"
      gap="10px"
      height="45px"
      align="center"
      justify="space-between"
    >
      <Button
        transition="10ms linear"
        variant="controlButton"
        maxWidth="25px"
        onClick={closeButtonClick}
      >
        <Icon as={IoClose} boxSize={"10px"} />
      </Button>
      <Button variant="controlButton" flexGrow={0} onClick={setupButtonClick}>
        <Icon as={RxDotFilled} color={"sc_green.300"} boxSize={"15px"} />
        <Text textStyle="b1">Connected</Text>
      </Button>
    </Flex>
  );
};

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Flex color={"sc_white.300"} textStyle={"h1"}>
      {title}
    </Flex>
  );
};
const getThumbnailAssetPath = (fileName: string): string => {
  // Get the base URL provided by Vite
  return new URL(`/assets/images/thumbnails/${fileName}`, import.meta.url).href;
};
interface VideoThumbnailProps {
  resizeWindow: () => void;
  thumbnailName: string;
  title: string;
  newVideo: boolean;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  resizeWindow,
  thumbnailName,
  newVideo,
  title,
}) => {
  const thumbnailURL: string = getThumbnailAssetPath(
    thumbnailName + IMAGE_FILE_EXTENSION
  );
  // const thumbnailURL: string =
  // PATH_TO_THUMBNAILS_FOLDER + thumbnailName + IMAGE_FILE_EXTENSION;
  const color = newVideo ? "sc_yellow.100" : "sc_green.300";

  return (
    <Flex
      align="flex-start"
      justify="flex-start"
      position="relative"
      boxShadow="btnShadow"
    >
      <Flex
        bgImage={"url(" + thumbnailURL + ")"}
        bgSize="cover"
        borderRadius="md"
        align="center"
        justify="center"
        flexDir="column"
        padding="10px"
        height="120px"
        width="100%"
        boxShadow="videoThumbnailShadow"
        _before={{
          content: '""',
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the darkness level here
          borderRadius: "md",
          transition: "opacity 0.2s ease-in-out", // Add a smooth transition
          opacity: 1, // Apply darkness by default
        }}
        _hover={{
          "&::before": {
            opacity: 0.6, // Remove darkness on hover
          },
        }}
      >
        <Text
          position="absolute"
          textStyle="h3"
          top="10px"
          left="10px"
          color={"sc_white.200"}
        >
          Tutorial: {title}
        </Text>

        <Flex
          align="center"
          justify="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Flex
            w="36px"
            h="25px"
            borderRadius="md"
            background="rgba(0, 0, 0, 0.4)"
            align="center"
            justify="center"
            color={"sc_white.200"}
            _hover={{
              color: "sc_white.50",
              w: "40px",
              h: "27px",
              cursor: "pointer",
            }}
            onClick={() => resizeWindow()}
          >
            <Icon as={IoPlaySharp} />
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          position="absolute"
          bottom="10px"
          left="10px"
          gap="5px"
          color={color}
        >
          {!newVideo && <Icon as={ImCheckmark}></Icon>}
          <Text textStyle={"h2"}>{newVideo ? "New video" : "Watched"}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
