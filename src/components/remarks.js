import React, {useState, useEffect} from "react";
import {
  Dialog,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import CodeIcon from "@mui/icons-material/Code";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


const projectTypes = ["Two Semester", "One Semester"];
const technologies = ["Android", "Web", "Internet of Things"];
const supervisors = ['Mark Mwirigi', 'Nicholas Kamau', 'Peter Kyalo']

export default function Remarks(props) {
  const { remarksOpen, setRemarksOpen, docType, project } = props;


  const formik = useFormik({
    initialValues: {
      remark: "",

    },
    validationSchema: Yup.object({
      remark: Yup.string().required("Content is required"),

    }),
    onSubmit: (values) => {
        axios.post(`http://localhost:5000/api/projects/addRemark/${project.id}`, {...values, docType}).then((res) => {
          console.log(res.data.project)
          toast.success('Remark posted')
        }).catch((err) => {
          console.log(err.message)
        })
        formik.resetForm()
        setRemarksOpen(false)
    },
  });
  

  const handleRemarksClose = () => {
    setRemarksOpen(false);
  };


  return (
    <Dialog open={remarksOpen} onClose={handleRemarksClose}>
      <Box
        sx={{
          margin: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          width: "450px",
        }}
      >
        <HistoryEduIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Add Remark
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ marginTop: 1, width: "100%" }}
        >


          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="remark"
            label="Remark"
            name="remark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.remark}
            error={Boolean(
              formik.touched.remark && formik.errors.remark
            )}
            helperText={formik.touched.remark && formik.errors.remark}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Post Remark
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
