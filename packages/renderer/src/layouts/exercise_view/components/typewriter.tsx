import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { Log, LogType } from "./console";
import { FONT_FAMILY } from "_/renderer/theme/foundation/textStyles";

interface TypewriterProps {
  logs: Log[];
}

const Typewriter: React.FC<TypewriterProps> = ({ logs }) => {
  const [display, setDisplay] = useState<JSX.Element[]>([]);

  const getLogTextColor = (logType: LogType): string => {
    switch (logType) {
      case LogType.Success:
        return "sc_green.200";
      case LogType.Warning:
        return "sc_yellow.300";
      case LogType.Error:
        return "sc_red.400";
      case LogType.Default:
        return "sc_white.50";
      case LogType.Subtle:
        return "sc_white.400";
      default:
        return "";
    }
  };

  const typeWriter = () => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;

    const intervalId = setInterval(() => {
      if (!logs[currentTextIndex]) {
        clearInterval(intervalId);
        return;
      }
      const newDisplay = logs.map((log, index) => {
        if (index < currentTextIndex) {
          return (
            <div key={index} style={{ marginBottom: "5px" }}>
              <Text color={getLogTextColor(log.logType)}>{log.text}</Text>
            </div>
          );
        } else if (index === currentTextIndex) {
          return (
            <div key={index} style={{ marginBottom: "5px" }}>
              <Text color={getLogTextColor(log.logType)}>
                {log.text.slice(0, currentCharIndex) + " "}
                <span className="blinking-cursor">&nbsp;</span>
              </Text>
            </div>
          );
        } else {
          return (
            <div key={index} style={{ marginBottom: "5px" }}>
              <span key={index} style={{ visibility: "hidden" }}>
                {log.text}
              </span>
            </div>
          );
        }
      });
      setDisplay(newDisplay);
      currentCharIndex++;
      if (currentCharIndex > logs[currentTextIndex].text.length) {
        currentTextIndex++;
        currentCharIndex = 0;
      }
    }, 1);
  };

  useEffect(() => {
    const initialDisplay = logs.map((log, index) => (
      <span key={index} style={{ visibility: "hidden" }}>
        {log.text}
      </span>
    ));
    setDisplay(initialDisplay);
    typeWriter();
  }, [logs]);

  return (
    <div
      style={{
        overflow: "auto",
        height: "171px",
        whiteSpace: "pre-wrap",
        fontFamily: FONT_FAMILY,
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "150%",
      }}
    >
      {display}
    </div>
  );
};

export default Typewriter;
