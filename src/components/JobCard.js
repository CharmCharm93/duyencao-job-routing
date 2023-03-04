import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
import { Stack } from "@mui/system";
import { Chip } from "@mui/material";

function JobCard({ job }) {
  let auth = useAuth();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.title}
        </Typography>
        <Stack spacing={1}>
          <Stack spacing={1} direction="row" flexWrap={"wrap"} rowGap={1}>
            {job.skills.slice(0, 4).map((item, index) => (
              <Chip style={{ color: "orange" }} key={index} label={item}></Chip>
            ))}
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        {auth.user && (
          <Button
            style={{ color: "orange" }}
            size="small"
            component={Link}
            to={`/jobs/${job.id}`}
          >
            Learn More
          </Button>
        )}

        {!auth.user && (
          <Button
            style={{ color: "orange" }}
            size="small"
            component={Link}
            to={`/login`}
          >
            Learn More
          </Button>
        )}

        {/* {console.log(auth.user)} */}
      </CardActions>
    </Card>
  );
}

export default JobCard;
