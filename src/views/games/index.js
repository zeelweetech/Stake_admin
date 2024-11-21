
import React, { useEffect, useState } from "react";
import "../../App.css";
import Loader from "../component/Loader";
import { AddGame, getAllGame, OtpGenerate, UpdateGame } from "../../services/GameServices";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
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
  const [editGameValue, setEditGameValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
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
    const data = isPull === true ? "t" : "f";
    navigate(`/games/${name}/${id}/${data}`);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    
    if (isEdit) {
      setEditGameValue((prev) => ({
        ...prev,
        [name]: name === "gameImg" ? files[0] : value,
      }));
    } else {
      setAddGameValue((prev) => ({
        ...prev,
        [name]: name === "gameImg" ? files[0] : value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddGame = async (e) => {
    e.preventDefault();

    const { gameName, gameImg, gameType } = addGameValue;
    let error = {};

    if (!gameImg) {
      error.gameImg = "Please enter your Game Image";
      
    }
    if (!gameName) {
      error.gameName = "Please enter your Game Name";
    }
    if (!gameType) {
      error.gameType = "Please select a Game Type";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    const formData = new FormData();
    formData.append("image", gameImg);
    formData.append("gameName", gameName);
    formData.append("gameType", gameType);

    try {
      const response = await AddGame({ body: formData });
      console.log("response add game", response);
      setOpen(false);
      GameAllData(); 
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  // const handleEditGame = (game) => {
  //   setIsEdit(true);
  //   setEditGameValue({
  //     gameName: game.gameName,
  //     gameType: game.gameType,
  //     gameImg: game.gameImage,
  //     id: game.id, 
  //   });
  //   setOpen(true);
  // };
 
  
  
  const handleEditGame = async (game, email) => {
    let body = {
      email: email,
    };
  
    try {
      const response = await OtpGenerate({ body, email });
  
      if (response?.email) {
        
        setIsEdit(true);
        setEditGameValue({
          gameName: game.gameName,
          gameType: game.gameType,
          gameImg: game.gameImage,
          id: game.id,
        });
        setOpen(true);
        
        alert("OTP sent successfully! You can now edit the game.");
      } else {
        
        console.error("Email not found in API response");
        
        alert("Failed to send OTP. Email not found.");
      }
    } catch (error) {
      
      console.error("Error in handleEditGame:", error.message);
      
      alert("Error occurred while sending OTP. Please try again.");
    }
  };
  
  
  
  const handleUpdateGame = async (e) => {
    e.preventDefault();

    const { gameName, gameImg, gameType, id } = editGameValue;
    let error = {};

    if (!gameName) {
      error.gameName = "Please enter your Game Name";
    }
    if (!gameType) {
      error.gameType = "Please select a Game Type";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    const formData = new FormData();
    formData.append("image", gameImg);
    formData.append("gameName", gameName);
    formData.append("gameType", gameType);

    try {
      const response = await UpdateGame({ id, body: formData });
      console.log("Game updated successfully", response);
      setOpen(false);
      GameAllData(); // Refresh game data
    } catch (error) {
      console.error("Error updating game:", error);
    }
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
                  setIsEdit(false); 
                  setAddGameValue({}); 
                  setOpen(true);
                }}
              >
                <AddIcon />
                <p>Add Game</p>
              </button>
            </div>
            <div className="grid grid-cols-6 gap-x-4 gap-y-7 py-10">
              {gameData.map((data) => (
                <div key={data.id} className="relative group">
                  <img
                    src={data.gameImage}
                    className="xl:w-44 lg:w-36 lg:h-48 xl:h-56 rounded-md hover:cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
                    alt="Not Found"
                    onClick={() =>
                      handleGameData(data?.gameName, data?.id, data?.isPull)
                    }
                  />
                  <EditIcon
                    onClick={() => handleEditGame(data)}
                    className="absolute top-2 right-8 text-[#b1bad3] bg-[#213743] rounded-full p-1 hover:cursor-pointer hover:bg-[#2f4553] transition-transform duration-200 transform group-hover:scale-110"
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
                <p>{isEdit ? "Edit Game" : "Add Game"}</p>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon className="text-[#b1bad3]" />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <input
                id="image"
                type="file"
                accept="image/*"
                name="gameImg"
                onChange={handleChange}
                className={`p-3 w-full border ${
                  errors.gameImg ? "border-[#d32f2f]" : "border-[#2f4553]"
                } my-0.5`}
              />
              {errors.gameImg && (
                <p className="text-[#d32f2f] w-56 text-sm pb-3">{errors.gameImg}</p>
              )}
              <TextField
                autoFocus
                placeholder="Enter Game Name"
                name="gameName"
                type="text"
                value={isEdit ? editGameValue.gameName : addGameValue.gameName || ""}
                onChange={handleChange}
                fullWidth
                sx={{
                  my: 0.5,
                  input: {
                    color: "#b1bad3",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors?.gameName ? "#d32f2f" : "#2f4553",
                    },
                    "&:hover fieldset": {
                      borderColor: errors?.gameName ? "#d32f2f" : "#2f4553",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors?.gameName ? "#d32f2f" : "#2f4553",
                    },
                  },
                }}
              />
              {errors.gameName && (
                <p className="text-[#d32f2f] w-56 text-sm pb-3">{errors.gameName}</p>
              )}
              <FormControl
                sx={{ width: 140, my: 1 }}
                error={!!errors?.gameType} 
              >
                <InputLabel
                  id="game-type-label"
                  sx={{ color: errors?.gameType ? "#d32f2f" : "#b1bad3" }} 
                >
                  Game Type
                </InputLabel>
                <Select
                  labelId="game-type-label"
                  id="game-type-select"
                  name="gameType"
                  value={isEdit ? editGameValue.gameType : addGameValue.gameType || ""}
                  onChange={handleChange}
                  sx={{
                    my: 0.5,
                    color: "#b1bad3",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? "#d32f2f" : "#2f4553",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? "#d32f2f" : "#2f4553",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: errors?.gameType ? "#d32f2f" : "#2f4553",
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

               
                {errors?.gameType && (
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
                onClick={isEdit ? handleUpdateGame : handleAddGame}
                className="bg-[#3c4b61] hover:bg-[#475c73] text-white"
              >
                {isEdit ? "Update" : "Add "}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
