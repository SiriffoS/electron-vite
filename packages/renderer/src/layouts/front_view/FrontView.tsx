import { Flex, Box, Progress, IconButton, SlideFade, Image } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Direction, Section, Size, Variant } from "_common/models/section";
import { Course } from "_common/models/course";
// import { ExerciseStatisticsContext } from "_/contexts/supabase/exerciseStatisticsContext";
// import { ExerciseStatisticsHelper } from "_/contexts/supabase/exerciseStatisticsHelper";

const PATH_TO_COURSE_IMAGE_FOLDER = "../assets/images/course/";
const FILE_EXTENSION = ".jpg";

export const FrontView: React.FC = () => {
  const [sections, setSections] = useState<Section[]>();
  // const exerciseStatisticsHelper = useContext<ExerciseStatisticsHelper | null>(
  // ExerciseStatisticsContext,
  // );

  //fetch sections when the view mounts
  useEffect(() => {
    const fetchSections = async () => {
      //Fetch all sections from the backend
      const sections: Section[] = await window.electronAPI.getSections();
      setSections(sections);
    };
    fetchSections();
  }, []);
  return (
    <Flex
      id="courseBrowser"
      layerStyle={"mainContentContainer"}
      flexDir="column"
      height={"100%"}
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::-moz-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
      }}
    >
      {sections?.map((section, i) => (
        <SlideFade
          key={i}
          in={true}
          offsetX="0px"
          offsetY={"10px"}
          delay={i * 0.05}
        >
          <SectionComponent
            id={section.id}
            title={section.title}
            variant={section.variant}
            size={section.size}
            direction={section.direction}
          ></SectionComponent>
        </SlideFade>
      ))}
    </Flex>
  );
};

interface SectionComponentProps {
  id: number;
  title: string;
  variant: Variant;
  size: Size;
  direction: Direction;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  id,
  title,
  variant,
  size,
  direction,
}) => {
  const [courses, setCourses] = useState<Course[]>();
  const [completionPercentages, setCompletionPercentages] = useState<{
    [id: number]: number;
  }>({});

  useEffect(() => {
    const fetchCompletionPercentages = async () => {
      const courses: Course[] =
        await window.electronAPI.getCoursesBySectionId(id);
      setCourses(courses);
      const percentagePromises = courses?.map((course: Course) => {
        return window.electronAPI
          .getCourseProgress(course.id)
          .then((percentage: number) => ({
            id: course.id,
            percentage,
          }));
      });

      if (percentagePromises) {
        const percentagesData = await Promise.all(percentagePromises);
        const percentagesMap: { [id: number]: number } = {};
        percentagesData.forEach((data) => {
          percentagesMap[data.id] = data.percentage;
        });

        setCompletionPercentages(percentagesMap);
      }
    };

    fetchCompletionPercentages();
  }, []);
  return (
    <Flex flexDir={"column"} gap={"md"}>
      <Box opacity={id > 1 ? 0.2 : 1} textStyle={"h1"}>
        {title}
      </Box>
      <Flex
        flexDir={direction}
        gap={"md"}
        overflowX="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-moz-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        }}
      >
        {courses?.map((course: Course, i) => (
          <SlideFade
            key={i}
            in={true}
            offsetX="10px"
            offsetY={"0px"}
            delay={i * 0.05}
          >
            <CourseComponent
              id={course.id}
              title={course.title}
              subtitle={course.subtitle}
              imageFileName={course.imageFileName}
              soundFileName={course.soundFileName}
              variant={variant}
              size={size}
              isEnabled={course.id === 1 ? true : false}
              completionPercentage={completionPercentages[course.id] || 0} // Use 0 as a default if percentage is not available
            />
          </SlideFade>
        ))}
      </Flex>
    </Flex>
  );
};

interface CourseComponentProps {
  id: number;
  title: string;
  subtitle: string;
  imageFileName: string;
  soundFileName: string;
  variant: Variant;
  size: Size;
  isEnabled?: boolean;
  completionPercentage?: number;
}

const CourseComponent: React.FC<CourseComponentProps> = ({
  id,
  title,
  subtitle,
  imageFileName,
  soundFileName,
  variant,
  size,
  isEnabled,
  completionPercentage,
}) => {
  switch (variant) {
    case Variant.Standard:
      return (
        <CourseStandardComponent
          id={id}
          title={title}
          subtitle={subtitle}
          imageFileName={imageFileName}
          soundFileName={soundFileName}
          variant={variant}
          size={size}
          isEnabled={isEnabled}
          completionPercentage={completionPercentage}
        ></CourseStandardComponent>
      );
      break;
    case Variant.Feature:
      return (
        <CourseFeatureComponent
          id={id}
          title={title}
          subtitle={subtitle}
          imageFileName={imageFileName}
          soundFileName={soundFileName}
          variant={variant}
          size={size}
          isEnabled={isEnabled}
          completionPercentage={completionPercentage}
        ></CourseFeatureComponent>
      );
    default:
      return <div>No variant set</div>;
      break;
  }
};

const getCardHeight = (size: string) => {
  switch (size) {
    case "xs":
      return "30px";
    case "sm":
      return "50px";
    case "md":
      return "60px";
    case "lg":
      return "90px";
    case "xl":
      return "100px";
    default:
      return "500px";
  }
};

const getCardWidth = (variant: string, size: string) => {
  if (variant === "Teaser Card Feature" && size === "lg") {
    return "160px";
  } else {
    return "180px";
  }
};

const getCourseAssetPath = (fileName: string): string => {
  // Get the base URL provided by Vite
  return new URL(`/assets/images/course/${fileName}`, import.meta.url).href;
};
const CourseStandardComponent: React.FC<CourseComponentProps> = ({
  id,
  title,
  subtitle,
  imageFileName,
  soundFileName,
  size,
  variant,
  isEnabled = false,
  completionPercentage,
}: CourseComponentProps) => {
  const cardHeight: string = getCardHeight(size);
  const cardWidth: string = getCardWidth(variant, size);
  let courseImageFilePath: string = getCourseAssetPath(
    imageFileName + FILE_EXTENSION,
  );

  const [isHovered, setIshovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (isEnabled) {
      navigate("/course/" + id);
    }
  };

  return (
    <div onClick={handleOnClick}>
      <Flex
        flexDir="row"
        gap={"md"}
        height={cardHeight}
        width={cardWidth}
        overflow={"clip"}
        layerStyle={isEnabled ? "" : "contentDisabled"}
        cursor={isEnabled ? "pointer" : "default"}
        onMouseEnter={() => setIshovered(isEnabled)}
        onMouseLeave={() => setIshovered(false)}
      >
        <Flex
          flexDir="column"
          bgImage={"url('" + courseImageFilePath + "')"}
          bgSize={"cover"}
          borderRadius={"md"}
          boxShadow={"btnShadow"}
          minHeight={cardHeight}
          minWidth={cardHeight}
          overflow={"clip"}
        >
          <Flex
            alignSelf={"stretch"}
            grow={1}
            align={"center"}
            justify={"center"}
            bg={
              (isEnabled && isHovered) || isPlaying
                ? "blackAlpha.700"
                : "blackAlpha.500"
            }
            color={"sc_white.50"}
          >
            {/* {((isEnabled && isHovered) || isPlaying) && (
            <IconButton
              variant={"play-control-icon-button"}
              icon={isPlaying ? <HiPause /> : <HiPlay />}
              aria-label={"play"}
              bg="transparent"
              onClick={() => setIsPlaying(!isPlaying)}
            />
          )} */}
          </Flex>
          {isEnabled && (
            <Progress
              value={completionPercentage}
              height={size === "xs" ? "2px" : "5px"}
            />
          )}
        </Flex>

        <Flex flexDir="column" gap={size === "xs" ? "0px" : "2px"}>
          <Box
            color={
              isPlaying
                ? "sc_green.500"
                : isEnabled && isHovered
                  ? "sc_white.50"
                  : "sc_white.200"
            }
            textStyle={"h2"}
          >
            {title}
          </Box>
          <Box
            color={isEnabled && isHovered ? "sc_white.300" : "sc_white.500"}
            textStyle={"sh1"}
            noOfLines={size === "xs" ? 1 : 2}
          >
            {subtitle}
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

const CourseFeatureComponent: React.FC<CourseComponentProps> = ({
  id,
  title,
  subtitle,
  imageFileName,
  soundFileName,
  size,
  variant,
  isEnabled = false,
  completionPercentage,
}: CourseComponentProps) => {
  const cardHeight: string = getCardHeight(size);
  const cardWidth: string = getCardWidth(variant, size);
  const courseImageFilePath: string = getCourseAssetPath(
    imageFileName + ".jpg",
  );

  const [isHovered, setIshovered] = useState(false);
  //const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Flex
        flexDir="column"
        bgImage={"url('" + courseImageFilePath + "')"}
        bgSize={"cover"}
        borderRadius={"md"}
        boxShadow={"btnShadow"}
        overflow={"clip"}
        height={cardHeight}
        minWidth={cardWidth}
        layerStyle={isEnabled ? "" : "contentDisabled"}
        cursor={isEnabled ? "pointer" : "default"}
        onMouseEnter={() => setIshovered(isEnabled)}
        onMouseLeave={() => setIshovered(false)}
      >
        <Flex
          flexDir={"column"}
          p={"sm"}
          grow={1}
          align={"flex-start"}
          justify={"left"}
          overflow={"clip"}
          gap={"sm"}
        >
          <Box color={"sc_white.200"} textStyle={"h2"}>
            {title}
          </Box>
          <Box
            color={"sc_white.500"}
            textStyle={"sh1"}
            noOfLines={size === "sm" ? 1 : 2}
          >
            {subtitle}
          </Box>
        </Flex>
        {/*<Circle
          size="30px"
          bg={"sc_black.900"}
          boxShadow={"btnShadow"}
          color={"sc_white.50"}
        >
          <Icon as={HiPlay} />
  </Circle>*/}
        <Progress value={completionPercentage} />
      </Flex>
    </>
  );
};
