import { Stack, Image, Typography, Button, Avatar, Box } from "@mui/material";

export default function SpecificPost(item) {
  return (
    <Box>
      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <Image src={item.image.href} alt={item.title} />
        <Typography variant="h1" component="h2">
          {item.title}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Avatar src={item.user.image.href} alt={item.user.name} />
          <Typography variant="h4" component="h3">
            {item.user.name}
          </Typography>
        </Stack>
        <Typography variant="body1" component="p">
          {item.content}
        </Typography>
      </Stack>
    </Box>
  );
}
