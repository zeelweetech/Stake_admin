import React, { useEffect, useState } from "react";
import "../../App.css";
import Loader from "../component/Loader";
import { AddGame, getAllGame } from "../../services/GameServices";
// import CrashGame from "./CrashGame";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function GamesDashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [addGameValue, setAddGameValue] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GameAllData();
  }, []);

  const GameAllData = async () => {
    await getAllGame()
      .then((response) => {
        console.log("response getAllGame", response);
        setGameData(response.games);
      })
      .catch((err) => {
        console.log("GameAllData error : ", err);
      });
  };

  const handleGameData = (name, id, isPull) => {
    console.log("&&&&&");
    const data = isPull === true ? "t" : "f"
    navigate(`/games/${name}/${id}/${data}`);
  };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "gameImg") {
  //     setAddGameValue({ ...addGameValue, [name]: files[0] });
  //     setErrors({ ...errors, [name]: "" });
  //   } else {
  //     setAddGameValue({ ...addGameValue, [name]: value });
  //     setErrors({ ...errors, [name]: "" });
  //   }
  //   // setErrors((prev) => ({ ...prev, [name]: "" }));
  // };

  const handleAddGame = async (e) => {
    const { gameName, gameImg, gameType } = addGameValue;
    let error = {};

    if (!gameImg) {
      error.gameImg = "please enter your Game Image";
    }
    if (!gameName) {
      error.gameName = "please enter your Game Name";
    }
    if (!gameType) {
      error.gameType = "Please select a Game Type";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    e.preventDefault();
    const formData = new FormData();
    formData.append("image", gameImg);
    formData.append("gameName", gameName);
    formData.append("gameType", gameType);

    await AddGame({ body: formData })
      .then((response) => {
        console.log("response add game", response);
        setOpen(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="bg-[#1a2c38] flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center pt-10">
            <div className="flex justify-end">
              <button
                className="text-white bg-[#213743] border border-[#2f4553] font-medium px-4 py-2 rounded-sm flex items-center space-x-1"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <AddIcon />
                <p>Add Game</p>
              </button>
            </div>
            <div className="grid grid-cols-6 gap-x-4 gap-y-7 py-10">
              {gameData.map((data) => (
                <div>
                  {console.log("data", data)
                  }
                  <img
                    src={data.gameImage}
                    className="xl:w-44 lg:w-36 lg:h-48 xl:h-56 rounded-md hover:cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
                    alt="Not Found"
                    onClick={() => handleGameData(data?.gameName, data?.id, data?.isPull )}
                  />
                  <p className="text-white text-center text-xl font-medium mt-2">
                    {data.gameName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="sm"
            fullWidth
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "6px",
                backgroundColor: "#1a2c38",
                color: "#b1bad3",
              },
            }}
          >
            <DialogTitle>
              <div className="flex justify-between items-center">
                <p>Add Game</p>
                <IconButton>
                  <CloseIcon
                    onClick={() => setOpen(false)}
                    className="text-[#b1bad3]"
                  />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              {/* <TextField
                autoFocus
                name="gameImg"
                type="file"
                value={addGameValue?.gameImg || ""}
                onChange={(e) => handleChange(e)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.gameImg}
                helperText={errors.gameImg}
                fullWidth
                sx={{
                  my: 1,
                  input: {
                    color: "#b1bad3",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#2f4553",
                    },
                    "&:hover fieldset": {
                      borderColor: "#2f4553",
                    },
                  },
                }}
              /> */}
              <input
                id="image"
                type="file"
                accept="image/*"
                name="gameImg"
                onChange={(e) => handleGameData(e)}
                className={`p-3 w-full border ${errors.gameImg ? 'border-[#d32f2f]' : 'border-[#2f4553]'} my-0.5`}
              />
              {errors.gameImg && (
                <p className="text-[#d32f2f] w-56 text-sm pb-3">{errors.gameImg}</p>
              )}
              <TextField
                autoFocus
                placeholder="Enter Game Name"
                name="gameName"
                type="text"
                value={addGameValue?.gameName || ""}
                onChange={(e) => handleGameData(e)}
                fullWidth
                sx={{
                  my: 0.5,
                  input: {
                    color: "#b1bad3",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors?.gameName ? '#d32f2f' : '#2f4553',
                    },
                    "&:hover fieldset": {
                      borderColor: errors?.gameName ? '#d32f2f' : '#2f4553',
                    },
                  },
                }}
              />
              {errors.gameName && (
                <p className="text-[#d32f2f] w-56 text-sm pb-3">{errors.gameName}</p>
              )}
              <FormControl sx={{ width: 140, my: 1 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "#b1bad3" }}
                >
                  Game Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Game Type"
                  name="gameType"
                  value={addGameValue?.gameType || ""}
                  onChange={(e) => handleGameData(e)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    my: 0.5,
                    color: "#b1bad3",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? '#d32f2f' : '#2f4553',
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? '#d32f2f' : '#2f4553',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? '#d32f2f' : '#2f4553',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#0f212e",
                        color: "#b1bad3",
                      },
                    },
                  }}
                >
                  <MenuItem value="Casino">Casino</MenuItem>
                  <MenuItem value="Sport">Sport</MenuItem>
                </Select>
                {errors.gameType && (
                  <p className="text-[#d32f2f] text-sm w-48">{errors.gameType}</p>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  backgroundColor: "#ff638433",
                  px: "1rem",
                  py: "0.5rem",
                  color: "#b1bad3",
                  border: "1px solid #ff6384",
                }}
              >
                Close
              </Button>
              <Button
                sx={{
                  backgroundColor: "#4bc0c033",
                  px: "1rem",
                  py: "0.5rem",
                  color: "#b1bad3",
                  border: "1px solid #4bc0c0",
                }}
                onClick={handleAddGame}
              >
                Add Game
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
      }
    </div >
  );
}
