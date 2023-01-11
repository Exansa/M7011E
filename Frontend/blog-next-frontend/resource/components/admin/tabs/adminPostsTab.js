import * as React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import Routes from "../../../routes";
import { TableCell, TableRow, Checkbox, IconButton } from "@mui/material";
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
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        sx={{ wordBreak: "break-all" }}
      >
        {row.title}
      </TableCell>
      <TableCell align="right">{row._id}</TableCell>
      <TableCell align="right">{row.created_at}</TableCell>
      <TableCell align="right" sx={{ wordBreak: "break-all" }}>
        {row.content}
      </TableCell>
      <TableCell align="right">{row.user.username}</TableCell>
      <TableCell align="right">{row.user._id}</TableCell>
      <TableCell align="right">
        {row.category ? row.category.name : "None"}
      </TableCell>
      <TableCell align="right">{row.tags.length}</TableCell>
      <TableCell align="right">
        <NextLink passHref href={Routes.posts.edit(row._id)} key={row._id}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </NextLink>
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

export default function AdminPostsTab({ data }) {
  const headCells = [
    {
      id: "title",
      numeric: false,
      disablePadding: true,
      label: "Title",
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
      id: "content",
      numeric: false,
      disablePadding: false,
      label: "Content",
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "User",
    },
    {
      id: "user-id",
      numeric: false,
      disablePadding: false,
      label: "User ID",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
    },
    {
      id: "tags",
      numeric: false,
      disablePadding: false,
      label: "Tags",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
    },
  ];

  const components = {
    RowComponent: RowItem,
    OptionalFilterDialogComponent: SearchPostsForm,
  };
  const args = {
    apiDestionation: "posts",
    label: "Posts",
    defaultRows: data.posts,
    headCells: headCells,
    removable: true,
    optionalFilterArgs: {
      defaultContent: data,
    },
  };

  return <AdminTab args={args} components={components} />;
}
