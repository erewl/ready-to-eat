import './App.css';

import addDays from 'date-fns/addDays';
import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [start, setStart] = React.useState(new Date());

  let initialEndTime = new Date()
  initialEndTime.setMinutes(25)
  initialEndTime.setHours(5)
  const [end, setEnd] = React.useState(initialEndTime);

  let initialTime = new Date()
  initialTime.setMinutes(18)
  initialTime.setHours(0)
  const [value, setValue] = React.useState(initialTime);

  function createDurationTimer() {
    let newEnd = end;
    if (end.getHours() < start.getHours()) {
      newEnd = addDays(end, 1)
    }
    var ms = newEnd - start - value.getHours() * 60 * 60 * 1000 - value.getMinutes() * 60 * 1000;
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms - hours * 1000 * 60 * 60) / 60000);
    return hours + ':' + minutes;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ready To Eat
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          m: 1, 
        }}>


          <TimePicker
            ampm={false}
            label="Startzeit"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />


          <TimePicker
            ampm={false}
            label="Endzeit"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <TimePicker
            ampm={false}
            views={['hours', 'minutes']}
            inputFormat="HH:mm"
            mask="__:__"
            label="Backdauer"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <h1>Setze den Timer auf: {createDurationTimer()}</h1>

        </Box>

      </div>
    </LocalizationProvider >
  );
}

export default App;
