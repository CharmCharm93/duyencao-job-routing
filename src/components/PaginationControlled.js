import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";

export default function PaginationControlled({ totalpost, setCurrentpage }) {
  let totalPages = Math.ceil(totalpost / 5);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    setCurrentpage(value);
  };

  return (
    <Box spacing={2} display="flex" flexDirection="column" alignItems="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
      ></Pagination>
      <Typography>Page: {page}</Typography>
    </Box>
  );
}
