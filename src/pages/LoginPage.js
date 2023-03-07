import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider } from "../components/form";
import { FTextField } from "../components/form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import { Alert, Button, Typography } from "@mui/material";
import { useAuth } from "../components/Auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: "auto",
  border: "1px solid white",
  borderRadius: 4,
  padding: 10,
  backgroundColor: "black",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

const defaultValues = {
  username: "DuyenCao",
  password: "123456",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();

  const auth = useAuth();

  const handleClose = () => {
    navigate(-1);
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    // console.log(data);

    auth.login(data.username);

    if (!location.state.jobId) {
      navigate("/");
    } else {
      navigate(`/jobs/${location.state.jobId}`, {
        state: { background: location.state },
      });
      console.log(location);
    }
  };
  return (
    <div>
      <Modal open={true} onClose={handleClose}>
        <Box style={style}>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            mb={2}
            color={"orange"}
          >
            Login form
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField name="username" label="Username" />
            <Stack m={1}></Stack>
            <FTextField name="password" label="Password" type="password" />

            <Stack sx={{ width: "100%" }} spacing={2} mt={1} mb={1}>
              <Alert severity="info">Need login to proceed request</Alert>
            </Stack>
            <Stack sx={{ width: "100%" }} spacing={2} mt={1} mb={2}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPage;
