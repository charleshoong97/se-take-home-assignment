import { Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import CustomBox from "./shared/box";

export default function Completed({ completed }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <CustomBox active>
      <div style={{ position: "relative" }}>
        <Typography
          variant="body1"
          style={{ fontSize: matches ? "1rem" : "13px" }}
        >
          {completed.name}
        </Typography>
        <Typography style={{ fontSize: 12 }}>
          {moment(completed.createdOn).format("hh:mm:ss A")}
        </Typography>

        <Typography style={{ fontSize: 12 }}>
          {moment(completed.startOn).format("hh:mm:ss A")}
        </Typography>

        <Typography style={{ fontSize: 12 }}>
          {moment(completed.completedOn).format("hh:mm:ss A")}
        </Typography>

        <div
          style={{
            visibility: completed.VIP ? "visible" : "hidden",
            position: "absolute",
            top: "-6px",
            right: "-12px",
            width: 10,
            height: 10,
            backgroundColor: "yellow",
            borderRadius: 10,
          }}
        />
      </div>
    </CustomBox>
  );
}
