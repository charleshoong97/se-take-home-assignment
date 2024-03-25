import { Fab, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import { Add, Remove } from "@mui/icons-material";
import CustomBox from "./shared/box";
import { useDispatch, useSelector } from "react-redux";
import { addBot, removeBot } from "../redux/actions/bot";

function Manager({ manager }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const botList = useSelector((state) => state.bot);

  const handleAddBot = (event) => {
    dispatch(
      addBot({
        bot: {
          name:
            "Bot-" + (moment().unix() * Math.random()).toString().slice(0, 7),
          active: true,
          currentOrder: undefined,
          createdOn: moment().toDate(),
        },
      })
    );
  };

  const handleRemoveBot = (event) => {
    const lastBot = botList.slice(-1)[0];

    dispatch(
      removeBot({
        bot: lastBot,
        order: lastBot.currentOrder,
      })
    );
  };

  return (
    <CustomBox active width="200px">
      <Stack direction="row" gap={3} alignItems={"start"}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">{manager.name}</Typography>
        </div>
        <Stack direction={"column"} spacing={3}>
          <Fab
            style={{
              backgroundColor: theme.actions.primary,
              color: "white",
            }}
            size="small"
            onClick={handleAddBot}
          >
            <Add />
          </Fab>
          <Fab
            style={{
              backgroundColor: theme.actions.primary,
              color: "white",
            }}
            size="small"
            onClick={handleRemoveBot}
          >
            <Remove />
          </Fab>
        </Stack>
      </Stack>
    </CustomBox>
  );
}

export default Manager;
