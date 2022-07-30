import React from "react";
import styled from "styled-components";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router";

const UpdateButton = styled(Button)`
  background-color: green;
  color: white;
  margin-bottom: 20px;
  &:hover {
    background-color: red;
  }
`;

const EditProfile = () => {
  const history = useHistory();
  return (
    <Container>
      <Dialog
        onClose={() => {
          history.push("/profile");
        }}
        open={true}
      >
        <DialogTitle id="simple-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              margin="normal"
            />
            <TextField
              label="Mobile"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <UpdateButton size="large" fullWidth>
              Update
            </UpdateButton>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default EditProfile;
