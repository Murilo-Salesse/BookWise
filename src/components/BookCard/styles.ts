import { styled } from "@/stitches.config";
import Image from "next/image";
import { Heading } from "../Typography";

export const Container = styled("div", {
  display: "flex",
  gap: "$5",
  padding: "18px 5px",
  backgroundColor: "$gray700",
  borderRadius: 8,
  cursor: "pointer",
  border: "1px solid $gray700",
  transition: "0.2s",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    borderColor: "$gray600",
  },
});

export const BookImage = styled(Image, {
  borderRadius: 4,
  objectFit: "cover",
});

export const BookDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const BookName = styled(Heading, {
  overflow: "hidden",
  textOverflow: "hidden",
  display: "webkit-box",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
});

export const ReadBadge = styled("span", {
  position: "absolute",
  display: "block",
  background: "#0a313c",
  top: 0,
  right: 0,
  color: "$green100",
  fontWeight: "$bold",
  fontSize: "$xs",
  padding: "$1 $2",
  borderRadius: "0px 4px 0px 4px",
});
