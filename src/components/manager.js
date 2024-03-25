import { Fab, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import { Add } from "@mui/icons-material";
import CustomBox from "./shared/box";
import { useDispatch } from "react-redux";
import { addBot } from "../redux/actions/bot";

function Manager({ manager }) {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  return (
    <CustomBox active width="200px">
      <Stack direction="row" gap={3} alignItems={"start"}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">{manager.name}</Typography>
        </div>
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
      </Stack>
    </CustomBox>
  );
}

export default Manager;
