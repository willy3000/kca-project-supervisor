import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CircularProgressWithLabel } from "../constants";
import storage from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import Remarks from "./remarks";



export default function ProjectOverview() {
  const [project, setProject] = useState();
  const [remarksOpen, setRemarksOpen] = useState(false)
  const [docType, setDocType] = useState()


  const [proposalFile, setProposalFile] = useState(null);
  const [srsFile, setSrsFile] = useState(null);
  const [sdsFile, setSdsFile] = useState(null);
  const [finalFile, setFinalFile] = useState(null);

  const [elevation, setElevation] = useState(24);

  const params = useParams();

  const user = useSelector((state) => state.user.user);

  const projectId = params.projectId;

  console.log(project?.documents.proposal.documentUrl);

  const getProject = () => {
    axios
      .get(`http://localhost:5000/api/projects/getProject/${projectId}`)
      .then((res) => {
        setProject(res.data.project[0]);
        console.log(res.data.project[0]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  const handleApproveDocument = (project, fileType) => {
    axios
      .post(
        `http://localhost:5000/api/projects/approveDocument/${project.id}`,
        { fileType }
      )
      .then((res) => {
        getProject();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDenyDocument = (project, fileType) => {
    axios
      .post(`http://localhost:5000/api/projects/denyDocument/${project.id}`, {
        fileType,
      })
      .then((res) => {
        getProject();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  const handleOpenRemarksDialog = (type) => {
    setDocType(type)
    setRemarksOpen(true)
  }

  return (
    <>
      <Box
        sx={{
          padding: "25px",
          width: "97%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h4" color="primary">
          {project?.name}
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography variant="h8" color="primary">
          {project?.studentName}
        </Typography>
        <Typography variant="h9" color="primary">
          {project?.email}
        </Typography>
        <Typography variant="h10" color="primary">
          {project?.projectType}
        </Typography>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            padding: "55px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "2ch",
            gap: "15px",
          }}
        >
          <Typography variant="h5">Project Documents</Typography>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Project Proposal
            </Typography>
            <a target="_blank" href={project?.documents.proposal.documentUrl}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!project?.documents.proposal.documentUrl ? (
                  <img src="/assets/addfile.png" alt="" width={100} />
                ) : (
                  <img src="/assets/pdfimage.png" alt="" width={200} />
                )}

                <Typography>
                  {project?.documents.proposal.documentName
                    ? project?.documents.proposal.documentName
                    : "No File Uploaded"}
                </Typography>
              </Box>
            </a>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.proposal.status === "pending submission" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.proposal.status === "denied" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.proposal.status === "pending approval" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="info"
                ></Chip>
              )}
              {project?.documents.proposal.status === "approved" && (
                <Chip
                  label={project?.documents.proposal.status}
                  color="success"
                ></Chip>
              )}
              <Box>
                <Tooltip title="approve">
                  <IconButton
                    onClick={() => handleApproveDocument(project, "proposal")}
                  >
                    <CheckCircleIcon color="success"></CheckCircleIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="deny">
                  <IconButton
                    onClick={() => handleDenyDocument(project, "proposal")}
                  >
                    <CancelIcon color="error"></CancelIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="leave remarks">
                  <IconButton
                    onClick={() => handleOpenRemarksDialog('proposal')}
                  >
                    <EmailIcon color="info"></EmailIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              System Requirements Specification
            </Typography>
            <a target="_blank" href={project?.documents.srs.documentUrl}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!project?.documents.srs.documentUrl ? (
                  <img src="/assets/addfile.png" alt="" width={100} />
                ) : (
                  <img src="/assets/pdfimage.png" alt="" width={200} />
                )}

                <Typography>
                  {project?.documents.srs.documentName
                    ? project?.documents.srs.documentName
                    : "No File Uploaded"}
                </Typography>
              </Box>
            </a>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.srs.status === "pending submission" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.srs.status === "denied" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.srs.status === "pending approval" && (
                <Chip label={project?.documents.srs.status} color="info"></Chip>
              )}
              {project?.documents.srs.status === "approved" && (
                <Chip
                  label={project?.documents.srs.status}
                  color="success"
                ></Chip>
              )}
              <Box>
                <Tooltip title="approve">
                  <IconButton
                    onClick={() => handleApproveDocument(project, "srs")}
                  >
                    <CheckCircleIcon color="success"></CheckCircleIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="deny">
                  <IconButton
                    onClick={() => handleDenyDocument(project, "srs")}
                  >
                    <CancelIcon color="error"></CancelIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="leave remarks">
                  <IconButton
                    onClick={() => handleOpenRemarksDialog('srs')}
                  >
                    <EmailIcon color="info"></EmailIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              System Design Specification
            </Typography>
            <a target="_blank" href={project?.documents.sds.documentUrl}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!project?.documents.sds.documentUrl ? (
                  <img src="/assets/addfile.png" alt="" width={100} />
                ) : (
                  <img src="/assets/pdfimage.png" alt="" width={200} />
                )}

                <Typography>
                  {project?.documents.sds.documentName
                    ? project?.documents.sds.documentName
                    : "No File Uploaded"}
                </Typography>
              </Box>
            </a>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.sds.status === "pending submission" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.sds.status === "denied" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.sds.status === "pending approval" && (
                <Chip label={project?.documents.sds.status} color="info"></Chip>
              )}
              {project?.documents.sds.status === "approved" && (
                <Chip
                  label={project?.documents.sds.status}
                  color="success"
                ></Chip>
              )}
              <Box>
                <Tooltip title="approve">
                  <IconButton
                    onClick={() => handleApproveDocument(project, "sds")}
                  >
                    <CheckCircleIcon color="success"></CheckCircleIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="deny">
                  <IconButton
                    onClick={() => handleDenyDocument(project, "sds")}
                  >
                    <CancelIcon color="error"></CancelIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="leave remarks">
                  <IconButton
                    onClick={() => handleOpenRemarksDialog('sds')}                  >
                    <EmailIcon color="info"></EmailIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
          <Paper
            elevation={elevation}
            sx={{
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "2ch",
              gap: "8px",
              width: "85%",
            }}

            // onMouseOver={() => setElevation(24)}
            // onMouseOut={() => setElevation(4)}
          >
            <Typography sx={{ fontWeight: "bold" }}>Final Document</Typography>
            <a target="_blank" href={project?.documents.final.documentUrl}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {!project?.documents.final.documentUrl ? (
                  <img src="/assets/addfile.png" alt="" width={100} />
                ) : (
                  <img src="/assets/pdfimage.png" alt="" width={200} />
                )}

                <Typography>
                  {project?.documents.final.documentName
                    ? project?.documents.final.documentName
                    : "No File Uploaded"}
                </Typography>
              </Box>
            </a>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {project?.documents.final.status === "pending submission" && (
                <Chip
                  label={project?.documents.final.status}
                  color="warning"
                ></Chip>
              )}
              {project?.documents.final.status === "denied" && (
                <Chip
                  label={project?.documents.final.status}
                  color="error"
                ></Chip>
              )}
              {project?.documents.final.status === "pending approval" && (
                <Chip
                  label={project?.documents.final.status}
                  color="info"
                ></Chip>
              )}
              {project?.documents.final.status === "approved" && (
                <Chip
                  label={project?.documents.final.status}
                  color="success"
                ></Chip>
              )}
              <Box>
                <Tooltip title="approve">
                  <IconButton
                    onClick={() => handleApproveDocument(project, "final")}
                  >
                    <CheckCircleIcon color="success"></CheckCircleIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="deny">
                  <IconButton
                    onClick={() => handleDenyDocument(project, "final")}
                  >
                    <CancelIcon color="error"></CancelIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="leave remarks">
                  <IconButton
                        onClick={() => handleOpenRemarksDialog('final')}                  >
                    <EmailIcon color="info"></EmailIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Remarks {...{remarksOpen, setRemarksOpen, docType, project}}></Remarks>
    </>
  );
}
