import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import PaginationControlled from "../components/PaginationControlled";
import apiService from "../app/apiService";
import * as React from "react";

import JobCard from "../components/JobCard";
import Grid from "@mui/system/Unstable_Grid/Grid";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import SearchAppBar from "../components/SearchAppBar";

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

function HomePage() {
  const [dataBase, setDataBase] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let postperpage = 5;

  const lastPostIndex = currentpage * postperpage;
  const firstPostIndex = lastPostIndex - postperpage;
  const currentPosts = dataBase.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/jobs");
        setDataBase(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SearchAppBar setSearchValue={setSearchValue} />

      <Stack>
        {loading ? (
          <CircularColor />
        ) : (
          <>
            {searchValue && (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "60vw",
                    alignSelf: "center",
                  }}
                >
                  <Grid container rowSpacing={3} columnSpacing={1}>
                    {dataBase
                      .filter((job) =>
                        job.title.toLowerCase().includes(searchValue)
                      )
                      .map((job) => (
                        <Grid xs={12} md={6} lg={4} key={job.id}>
                          <JobCard job={job}></JobCard>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </>
            )}

            {!searchValue && (
              <Box
                sx={{
                  flexGrow: 1,
                  width: "60vw",
                  alignSelf: "center",
                }}
              >
                <Grid container rowSpacing={3} columnSpacing={1}>
                  {currentPosts.map((job) => (
                    <Grid xs={12} md={6} lg={4} key={job.id}>
                      <JobCard job={job}></JobCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
        <Stack m={1}></Stack>
        <Box sx={{ alignSelf: "center" }}>
          <PaginationControlled
            totalpost={dataBase.length}
            setCurrentpage={setCurrentpage}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default HomePage;
