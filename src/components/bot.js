import { Fab, Stack, Typography, styled } from "@mui/material";
import CustomBox from "./shared/box";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useDispatch, useSelector } from "react-redux";
import { offBot, onBot } from "../redux/actions/bot";
import { useEffect, useState } from "react";
import { assignOrder, completeOrder } from "../redux/actions/order";
import { store } from "../redux/store";

const maxTime = 10;

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    // width: "100%",
  },
  [theme.breakpoints.up("xs")]: {
    minWidth: "280px",
  },
}));

export default function Bot({ bot }) {
  const dispatch = useDispatch();
  const botList = useSelector((state) => state.bot);
  const orderList = useSelector((state) => state.order);

  const currentBot = botList.find((b) => b.name === bot.name);

  const [processing, setProcessing] = useState(false);

  const [countDown, setCountDown] = useState(maxTime);

  const handleToggleActive = () => {
    if (currentBot.active) {
      dispatch(
        offBot({
          bot: currentBot,
          order: currentBot.currentOrder,
        })
      );
      setProcessing(false);
    } else {
      dispatch(
        onBot({
          bot: currentBot,
          order: currentBot.currentOrder,
        })
      );
      setProcessing(false);
    }
  };

  useEffect(() => {
    console.log("triggered : ", processing);

    if (Boolean(currentBot.currentOrder)) {
      if (!processing) {
        setProcessing(true);
        let x = setInterval(
          (runningBot) => {
            console.log("processing order");

            const isActive = store
              .getState()
              .bot.find((b) => b.name === currentBot.name).active;

            if (!isActive) {
              console.log("terminated");
              setCountDown(0);
              setProcessing(false);
              clearInterval(x);
              return;
            }
            var now = new Date().getTime();
            var distance = now - runningBot.currentOrder.startOn.getTime();
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountDown(maxTime - seconds);

            if (seconds >= maxTime) {
              console.log("completed order");
              setProcessing(false);
              dispatch(
                completeOrder({
                  bot: runningBot,
                  order: runningBot.currentOrder,
                })
              );
              clearInterval(x);
            }
          },
          1000,
          currentBot
        );
      }
    } else {
      const createdOn = currentBot.createdOn;

      if (
        !botList.some(
          (b) =>
            b.active &&
            b.createdOn.getTime() < createdOn.getTime() &&
            !Boolean(b.currentOrder)
        )
      ) {
        let nextOrder = orderList.find(
          (o) =>
            o.bot === undefined &&
            o.startOn === undefined &&
            o.completeOn === undefined
        );

        if (Boolean(nextOrder) && currentBot.active) {
          console.log("assign order");
          dispatch(
            assignOrder({
              bot: currentBot,
              order: nextOrder,
            })
          );
        }
      }
    }
  }, [botList, orderList, processing]);

  return (
    <Root>
      <CustomBox
        minHeight={30}
        padding="10px 5px"
        active={currentBot.active}
        width="inherit"
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Fab
            size="small"
            style={{ height: 36, width: 36, backgroundColor: "white" }}
            onClick={handleToggleActive}
          >
            <RadioButtonCheckedIcon height={10} style={{ color: "red" }} />
          </Fab>
          <Typography variant="body1">
            {currentBot.name} :{" "}
            <strong>{currentBot.currentOrder?.name ?? "-"}</strong>
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          style={{
            color: "red",
            position: "absolute",
            right: 10,
            bottom: 0,
            visibility: Boolean(currentBot.currentOrder) ? "visible" : "hidden",
          }}
        >
          Remaining : {countDown}
        </Typography>
      </CustomBox>
    </Root>
  );
}
