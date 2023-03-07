import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link, useLocation } from "react-router-dom";
import { Stack } from "@mui/system";
import { Chip } from "@mui/material";
import { useAuth } from "./Auth";

function JobCard({ job }) {
  const location = useLocation();
  const auth = useAuth();

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
            state={{ background: location }}
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
            state={{ background: location, jobId: job.id }}
          >
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default JobCard;
