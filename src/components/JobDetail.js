import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "500px",
  maxHeight: "500px",
};

function CircularColor() {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      alignItems={"center"}
      justifyContent={"center"}
      height="60vh"
    >
      <CircularProgress color="success" />
    </Stack>
  );
}
function JobDetail() {
  let params = useParams();
  let jobId = params.jobId;
  const [loading, setLoading] = useState(false);

  const [dataBase, setDataBase] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/jobs/${jobId}`);
        const data = res.data;
        // console.log(data);
        setDataBase(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [jobId]);

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <>
      <Modal open={true} onClose={handleClose}>
        <Box style={style}>
          {loading ? (
            <Card>
              <CardContent>
                <CircularColor />
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {dataBase?.title}
                  </Typography>
                  <hr />

                  <Stack spacing={1} flexWrap={"wrap"}>
                    <Stack spacing={1} direction="row">
                      {dataBase?.skills.slice(0, 4).map((item, index) => (
                        <Chip
                          style={{ color: "orange" }}
                          key={index}
                          label={item}
                        ></Chip>
                      ))}
                    </Stack>
                  </Stack>
                  <hr />
                  <Typography>
                    <span style={{ color: "orange" }}>Job description</span>
                    <br />
                    {dataBase?.description}
                  </Typography>
                  <hr />
                  <Typography variant="h6" component="div">
                    City: {dataBase?.city}
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default JobDetail;
