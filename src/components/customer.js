import { Fab, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import { Add } from "@mui/icons-material";
import CustomBox from "./shared/box";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/actions/order";

function Customer({ customer }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAddOrder = (event) => {
    dispatch(
      addOrder({
        order: {
          name:
            "Order-" + (moment().unix() * Math.random()).toString().slice(0, 7),
          VIP: customer.lvl === "VIP",
          createdOn: moment().toDate(),
        },
      })
    );
  };

  return (
    <CustomBox active width="200px">
      <Stack direction="row" gap={3} alignItems={"start"}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">{customer.name}</Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", color: "red" }}
          >
            {customer.lvl}
          </Typography>
        </div>
        <Fab
          style={{
            backgroundColor: theme.actions.primary,
            color: "white",
          }}
          size="small"
          onClick={handleAddOrder}
        >
          <Add />
        </Fab>
      </Stack>
    </CustomBox>
  );
}

export default Customer;
