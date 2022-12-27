import PropTypes from "prop-types";
import Head from "next/head";
// React
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";
// Components
import ResponsiveDrawer from "./sideBar";
import Footer from "./footer";

// ----------------------------------------------------------------------

const AdminPage = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Blog`}</title>
      {meta}
    </Head>

    <ResponsiveDrawer />

    <Box ref={ref} {...other}>
      {children}
    </Box>

    <Footer />
    <style jsx global>
      {`
        html,
        body {
          background: #f9f9f9;
          overflow-x: hidden;
          padding: 0 !important;
        }
        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        main {
          flex: 1;
        }
      `}
    </style>
  </>
));

export default AdminPage;
