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
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import EventIcon from '@mui/icons-material/Event';
import { useSelector } from "react-redux";
import CodeIcon from "@mui/icons-material/Code";
import AdbIcon from "@mui/icons-material/Adb";
import AppleIcon from "@mui/icons-material/Apple";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';



const eventTypes = ["Two Semester", "One Semester"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function AddEvent(props) {
  const { addEventOpen, setAddEvent, getEvents } = props;

  const user = useSelector((state) => state.user.user);
  const [supervisors, setSupervisors] = useState([])

  const [alignment, setAlignment] = React.useState("web");


  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [timeValue, setTimeValue] = React.useState(dayjs(new Date()));




  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Event Name is required"),
    }),
    onSubmit: (values) => {
      axios.post('http://localhost:5000/api/projects/addEvent', {...values, supervisorId: user.id, supervisorName: user.firstName+" "+user.lastName, date: dateValue.$d.getDate()+"/"+dateValue.$d.getMonth()+"/"+dateValue.$d.getFullYear()+','+days[dateValue.$d.getDay()], time: timeValue.$d.getHours()+":"+(Number(timeValue.$d.getMinutes()) > 9 ? timeValue.$d.getMinutes() : '0'+timeValue.$d.getMinutes())}).then((res) => {
        toast.success('event created')
        setAddEvent(false)
        getEvents()
      }).catch((err) => {
        toast.error(err.message)
      })
    },
  });
  

  const handleAddEventClose = () => {
    setAddEvent(false);
  };


  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };


  const handleTimeChange = (newValue) => {
    setTimeValue(newValue);
  };


  return (
    <Dialog open={addEventOpen} onClose={handleAddEventClose}>
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
        <EventIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Add Event
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ marginTop: 1, width: "100%" }}
        >


<LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
      <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={Boolean(formik.touched.title && formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={dateValue}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params}
                />}
              />

              <TimePicker
                label="Time"
                value={timeValue}
                onChange={handleTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
      </Stack>
    </LocalizationProvider>



          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
