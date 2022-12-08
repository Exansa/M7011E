// @mui
import { Container, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function FooterSimple() {
  return (
    <footer>
      <Container
        sx={{
          textAlign: "center",
          py: 8,
          mt: 5,
          flexWrap: "nowrap",
          width: "100%",
          minWidth: "100%",
          maxWidth: "100%",
          backgroundColor: "grey.300",
        }}
      >
        <Typography variant="body3" sx={{ color: "text.secondary" }}>
          A student project part of the course M7011E at Luleå University of
          Technology.
        </Typography>
      </Container>
    </footer>
  );
}
