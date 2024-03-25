import { Box, useTheme } from "@mui/material";

export default function CustomBox({
  minHeight = 120,
  active = false,
  padding = "10px 20px",
  width = "max-content",
  children,
}) {
  const theme = useTheme();

  return (
    <Box
      style={{
        backgroundColor: active ? theme.box.active : theme.box.inactive,
        color: "white",
        padding: padding,
        height: "fit-content",
        minHeight: minHeight,
        // maxWidth: 220,
        // width: "100%",
        width: width,
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
