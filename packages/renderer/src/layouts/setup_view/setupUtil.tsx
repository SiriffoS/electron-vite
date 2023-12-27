import { Link, Text } from "@chakra-ui/react";
import React from "react";

//possibly make this more atomic so that it stacks the different styles and applies them in order of appearance (possibly overwriting eachother)
export const formatText = (text: string) => {
  const parts = text.split("*");
  const boldCharacter = "-";
  const italicCharacter = "/";
  const colorCharacter = "!";
  const highlightCharacter = "§";

  return parts.map((part, index) => {
    if (part.startsWith(colorCharacter + boldCharacter)) {
      return (
        <Text as="span" color="sc_yellow.300" fontWeight="bold" key={index}>
          {part.substring(2, part.length)}
        </Text>
      );
    } else if (part.startsWith(colorCharacter)) {
      return (
        <Text as="span" color="sc_yellow.300" key={index}>
          {part.substring(1, part.length)}
        </Text>
      );
    } else if (part.startsWith(boldCharacter)) {
      return (
        <Text as="span" fontWeight="bold" color="sc_white.50" key={index}>
          {part.substring(1, part.length)}
        </Text>
      );
    } else if (part.startsWith(italicCharacter + highlightCharacter)) {
      return (
        <Text as="span" fontStyle="italic" color={"sc_white.50"} key={index}>
          {part.substring(2, part.length)}
        </Text>
      );
    } else if (part.startsWith(italicCharacter)) {
      return (
        <Text as="span" fontStyle="italic" key={index}>
          {part.substring(1, part.length)}
        </Text>
      );
    } else if (part.startsWith(highlightCharacter)) {
      return (
        <Text as="span" color="sc_white.50" key={index}>
          {part.substring(1, part.length)}
        </Text>
      );
    } else {
      return (
        <Text as="span" key={index}>
          {part}
        </Text>
      );
    }
  });
};
