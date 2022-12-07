import PropTypes from "prop-types";
import Head from "next/head";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Blog`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
