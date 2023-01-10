import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  dialogText,
  dialogTitle,
  leftOptionText,
  handleLeftoption,
  rightOptionText,
  handleRightOption,
  openState,
  handleClose,
}) {
  return (
    <div>
      <Dialog
        open={openState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLeftOption}>{leftOptionText}</Button>
          <Button onClick={handleRightOption}>{rightOptionText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
