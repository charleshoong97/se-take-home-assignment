import { Typography, useMediaQuery } from "@mui/material";
import moment from "moment";
import CustomBox from "./shared/box";

export default function Order({ order }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <CustomBox active={Boolean(order.bot)}>
      <div style={{ position: "relative" }}>
        <Typography
          variant="body1"
          style={{ fontSize: matches ? "1rem" : "13px" }}
        >
          {order.name}
        </Typography>

        <Typography style={{ fontSize: 12 }}>
          {moment(order.createdOn).format("hh:mm:ss A")}
        </Typography>

        {order.startOn && (
          <>
            <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
              RUNNING :{" "}
              <br
              // style={{ display: matches ? "none" : "inline" }}
              />
              {order.bot.name}
            </Typography>
            <Typography style={{ fontSize: 12 }}>
              {moment(order.startOn).format("hh:mm:ss A")}
            </Typography>
          </>
        )}

        <div
          style={{
            visibility: order.VIP ? "visible" : "hidden",
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
