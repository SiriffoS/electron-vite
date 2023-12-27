import React from "react";
import { Icon } from "@chakra-ui/react";
import { IoCloseCircle } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { TbCircleFilled } from "react-icons/tb";

export enum StepStatus {
  Open = "OPEN",
  Locked = "LOCKED",
  Done = "DONE",
  Error = "ERROR",
}

interface StepStatusComponentProps {
  status?: StepStatus;
}
export const StepStatusComponent: React.FC<StepStatusComponentProps> = ({
  status = StepStatus.Locked,
}) => {
  const iconProps = {
    height: "25px",
    width: "15px",
  };

  return (
    <Icon
      {...iconProps}
      as={
        status === StepStatus.Done
          ? HiCheckCircle
          : status === StepStatus.Error
            ? IoCloseCircle
            : TbCircleFilled
      }
      color={
        status === StepStatus.Done
          ? "sc_green.400"
          : status === StepStatus.Error
            ? "sc_red.300"
            : "sc_black.300"
      }
    />
  );
};
