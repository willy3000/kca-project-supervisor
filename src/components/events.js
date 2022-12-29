import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Skeleton } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddEvent from "./addEvent";
import { useSelector } from "react-redux";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import EventsTable from "./eventsTable";
import NoItems from "./noItems";





export default function Events() {
  const user = useSelector((state) => state.user.user);
  const [addEventOpen, setAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)

  const {addToast} = useToasts()

  const getEvents = () => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/projects/getSupervisorEvents/${user.id}`, {timeout: 2000})
      .then((res) => {
        setEvents([...res.data.events]);
        console.log("event", events);
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
    getEvents()
  }, []);

  return (
    <>
      <Box
        sx={{ padding: "25px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => setAddEvent(true)}
        >
          Add Event
        </Button>
      </Box>

      {!loading ? (
        events.length > 0 ?

        <Box sx={{maxWidth: '1800px', margin: 'auto'}}>
        <Box>
            <Box>
              <EventsTable {...{events}}/>
            </Box>
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

      <AddEvent
        {...{ addEventOpen, setAddEvent, getEvents }}
      ></AddEvent>

    </>
  );
}