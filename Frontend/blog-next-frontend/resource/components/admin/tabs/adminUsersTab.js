import * as React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import Routes from "../../../routes";
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AdminTab from "../utils/adminTab";
import SearchPostsForm from "../../search/searchPostsForm";

function RowItem(props) {
  const { row, handleClick, isItemSelected, labelId } = props;

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Stack direction="row" alignItems={"center"}>
          <Avatar
            alt={row.profile_picture}
            src={row.profile_picture}
            sx={{ mx: 2 }}
          />
          {row.username}
        </Stack>
      </TableCell>
      <TableCell align="right">{row._id}</TableCell>
      <TableCell align="right">{row.createdAt}</TableCell>
      <TableCell align="right" sx={{ wordBreak: "break-all" }}>
        {row.email}
      </TableCell>
      <TableCell align="right">
        {row.auth0_id ? row.auth0_id.split("|")[0] : "None"}
      </TableCell>
      <TableCell align="right">{row.profile_picture}</TableCell>
      <TableCell align="right">
        {/* <NextLink passHref href={Routes.users.edit(row._id)} key={row._id}> */}
        <IconButton>
          <EditIcon />
        </IconButton>
        {/* </NextLink> */}
      </TableCell>
    </TableRow>
  );
}

RowItem.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  handleClick: PropTypes.func.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  labelID: PropTypes.string.isRequired,
  resetSelected: PropTypes.func.isRequired,
};

export default function AdminUsersTab({ data }) {
  const headCells = [
    {
      id: "username",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "created-at",
      numeric: false,
      disablePadding: false,
      label: "Created",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "E-mail",
    },
    {
      id: "auth-method",
      numeric: false,
      disablePadding: false,
      label: "Authentication",
    },
    {
      id: "avatar-url",
      numeric: false,
      disablePadding: false,
      label: "Avatar URL",
    },
  ];

  const components = {
    RowComponent: RowItem,
  };
  const args = {
    apiDestionation: "users",
    label: "Users",
    defaultRows: data,
    headCells: headCells,
    removable: true,
  };

  return <AdminTab args={args} components={components} />;
}
