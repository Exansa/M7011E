import * as React from "react";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import AdminTab from "../utils/adminTab";

function RowItem(props) {
  const { row, handleClick, isItemSelected, labelId, resetSelected } = props;

  const [editing, setEditing] = React.useState(false);

  const enterEditMode = () => {
    resetSelected();
    setEditing(true);
  };

  const leaveEditMode = () => {
    setEditing(false);
  };

  const saveChanges = () => {};

  return (
    <TableRow hover tabIndex={-1} key={row._id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onClick={!editing ? (event) => handleClick(event, row._id) : null}
          inputProps={{
            "aria-labelledby": props.labelId,
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
        <TextField defaultValue={row.name} disabled={!editing} />
      </TableCell>
      <TableCell align="right">{row._id}</TableCell>
      <TableCell align="right">
        {editing ? (
          <Stack>
            <IconButton
              onClick={() => {
                saveChanges();
              }}
            >
              <CheckIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                leaveEditMode();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        ) : (
          <IconButton
            onClick={() => {
              enterEditMode();
            }}
          >
            <EditIcon />
          </IconButton>
        )}
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

export default function AdminFilterstab({ data, label, apiDestination }) {
  const headCells = [
    {
      id: "name",
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
  ];

  const components = {
    RowComponent: RowItem,
  };
  const args = {
    apiDestionation: apiDestination,
    label: label,
    defaultRows: data,
    headCells: headCells,
  };

  return <AdminTab components={components} args={args} />;
}
