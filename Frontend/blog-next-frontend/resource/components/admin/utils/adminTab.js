import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  Tooltip,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import AutoCompleteFetcher from "../../search/autoCompleteFetcher";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "unselect all",
            }}
            sx={{ display: numSelected > 0 ? "block" : "none" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableToolbar(props) {
  const { numSelected, label, openDeleteDialog, openFilterDialog } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {label}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={openDeleteDialog}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : openFilterDialog ? (
        <Tooltip title="Filter list">
          <IconButton onClick={openFilterDialog}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  openDeleteDialog: PropTypes.func.isRequired,
  openFilterDialog: PropTypes.func,
};

function DeleteDialog(props) {
  const { numItems, dialogState, closeDialog, action } = props;

  const deleteAllowed = numItems < 5;

  return (
    <>
      <Dialog
        open={dialogState}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {deleteAllowed
              ? "Do you really want to delete " +
                numItems +
                " items? This action cannot be undone."
              : "You cannot delete more than 5 items at a time."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={action}
            sx={{ display: deleteAllowed ? "block" : "none" }}
          >
            Yes
          </Button>
          <Button onClick={closeDialog}>{deleteAllowed ? "No" : "Ok"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteDialog.propTypes = {
  numItems: PropTypes.number.isRequired,
  dialogState: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
};

export default function AdminTab(props) {
  const { components, args } = props;
  const { RowComponent, OptionalFilterDialogComponent } = components;
  const { defaultRows, label, headCells, optionalFilterArgs } = args;

  const [rows, setRows] = React.useState(defaultRows);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetClick = () => {
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = async () => {
    if (selected.length === 0 || selected > 5) return;

    selected.forEach(async (target_id) => {
      //TODO: Replace with admin ID?
      const body = { user_id: target.user._id };
      // Remove item from db
      const res = await fetch(
        `http://localhost:3000/${apiDestination}/${target._id}`,
        {
          method: "DELETE",
          headers: {
            //TODO: Authorization
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        const newRows = rows.filter((row) => row._id !== target._id);
        setRows(newRows);
      } else {
        console.log("Error");
        console.log(data);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const openFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {OptionalFilterDialogComponent && (
        <OptionalFilterDialogComponent
          setResults={setRows}
          dialog={{ state: filterDialogOpen, close: closeFilterDialog }}
          {...optionalFilterArgs}
        />
      )}
      <DeleteDialog
        numItems={selected.length}
        dialogState={deleteDialogOpen}
        closeDialog={closeDeleteDialog}
        action={handleDelete}
      />
      <Paper sx={{ width: "100%", maxWidth: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          label={label}
          openDeleteDialog={openDeleteDialog}
          openFilterDialog={
            OptionalFilterDialogComponent ? openFilterDialog : null
          }
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleResetClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <RowComponent
                      key={row._id + "-row-item"}
                      row={row}
                      handleClick={handleClick}
                      isItemSelected={isItemSelected}
                      resetSelected={handleResetClick}
                      labelId={labelId}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
