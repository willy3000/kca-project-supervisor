import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Skeleton, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import ProjectCard from "./projectCard";
import { useToasts } from "react-toast-notifications";
import { StyledTableCell } from "../constants";
import { StyledTableRow } from "../constants";
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import storage from "../firebase/firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from "react-hot-toast";
import NoItems from "./noItems";
import {io} from 'socket.io-client'




export default function Project() {
  const user = useSelector((state) => state.user.user);
  const [addProjectOpen, setAddProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState(null)

  const {addToast} = useToasts()



  useEffect(() => {
    const socket = io('http://localhost:5001')
    socket.emit("id", user.id)
    socket.on('projects', (projects) => {
      setProjects([...projects])
    })
  }, [])




  const getProjects = () => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/projects/getProjectsBySupervisor/${user.id}`, {timeout: 2000})
      .then((res) => {
        setProjects([...res.data.projects]);
        console.log("project", projects);
      }).catch((err) => {
        if(err.code === 'ECONNABORTED'){
          addToast(err.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      setLoading(false)
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>

      {!loading ? (
        projects.length > 0 ?

        <Box sx={{maxWidth: '1800px', margin: 'auto'}}>
        <Box>
          {projects.map((project) => (
            <Box key={project.id} sx={{marginTop: '35px'}}>
              <ProjectCard {...{project, getProjects}}/>
            </Box>
          ))}
        </Box>
        </Box>

        :
        <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <NoItems></NoItems>
        </Box>
      ) : (
        <Box>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ padding: "50px", margin: "15px" }}
          />
        </Box>
      )}
    </>
  );
}
