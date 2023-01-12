import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import AccessDenied from "../../resource/components/accessDenied";

export function Settings() {
  const [value, setValue] = useState("");
  const { data: session } = useSession();
  async function handleOnButtonClick(e) {
    const path = "http://localhost:5001/admins?set=1";
    const access = "Bearer " + session.accessToken;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: access,
      },
    });
    console.log("res", res);
    const result = await res.json();
    console.log("result: ", result);
    for (let i = 0; i < result.length; i++) {
      if (result.user_id == session.user._id) {
        console.log("true");
        break;
      } else {
        console.log("false");
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.username.value == "" && event.target.email.value == "") {
      const data = {
        username: session.user.username,
        email: session.user.email,
        profile_picture: session.user.profile_picture,
      };
    } else if (event.target.username.value == "") {
      const data = {
        username: session.user.username,
        email: event.target.email.value,
        profile_picture: session.user.profile_picture,
      };
    } else if (event.target.email.value == "") {
      const data = {
        username: event.target.username.value,
        email: session.user.email,
        profile_picture: session.user.profile_picture,
      };
    }
    console.log(data);
    /*
    const path = 'http://localhost:5001/user/' + session.user._id;
    const access = "Bearer " + session.accessToken;
    const res = await fetch(path, {
      method: "PATCH",
      headers: {
        accept: "**", 
        Authorization: access,
        "Content-Type": "application/json"
      },
      body: data,
    });*/

    setValue("");
  };
  if (!session) {
    return (
      <Page>
        <AccessDenied />
      </Page>
    );
  }
  return (
    session && (
      <Page title={"Settings: " + session.name}>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="New username"
              margin="normal"
              id="username"
              name="username"
              onChange={(newValue) => {
                setValue(newValue.target.value);
              }}
              variant="outlined"
              defaultValue={value}
              value={value}
            />
            <TextField
              required
              fullWidth
              label="New email"
              margin="normal"
              id="email"
              name="email"
              onChange={(newValue) => {
                setValue(newValue.target.value);
              }}
              variant="outlined"
              defaultValue={value}
              value={value}
            />
            <Button
              sx={{ m: 1, minWidth: 120 }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
          <Button onClick={handleOnButtonClick}>edit</Button>
        </Container>
      </Page>
    )
  );
}
export default Settings;

Settings.auth = {
  admin: false,
};
