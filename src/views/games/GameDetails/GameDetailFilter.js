// import React, { useState } from "react";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Slider,
//   TextField,
// } from "@mui/material";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// function Filter({ setSearchTerm }) {
//   const [selectedColumn, setSelectedColumn] = useState();
//   // const [selectedOperator, setSelectedOperator] = useState("=");
//   const [searchValue, setSearchValue] = useState();
//   const [rangeValue, setRangeValue] = useState([0, 500]);
//   const [sortOrder, setSortOrder] = useState("DESC");

//   // const handleColumnChange = (e) => {
//   //   setSelectedColumn(e.target.value);
//   //   setSearchValue("");
//   //   setRangeValue([0, 100]);
//   //   setSearchTerm((prevFilters) => ({
//   //     ...prevFilters,
//   //     pullId: '',
//   //     crashPoint: '',
//   //     playerCount: '',
//   //     totalAmount: '',
//   //     pullIdOperator: '',
//   //     crashPointOperator: '',
//   //     playerCountOperator: '',
//   //     totalAmountOperator: '',
//   //     pullIdMin: '',
//   //     pullIdMax: '',
//   //     crashPointMin: '',
//   //     crashPointMax: '',
//   //     playerCountMin: '',
//   //     playerCountMax: '',
//   //     totalAmountMin: '',
//   //     totalAmountMax: '',
//   //     startDate: '',
//   //     endDate: '',
//   //   }));
//   // };
//   // const handleOperatorChange = (e) => {
//   //   const operator = e.target.value;
//   //   setSelectedOperator(operator);
//   //   setSearchTerm((prevFilters) => ({
//   //     ...prevFilters,
//   //     [`${selectedColumn}Operator`]: operator,
//   //   }));
//   // };

//   const handleColumnChange = (e) => {
//     const newColumn = e.target.value;
//     setSelectedColumn(newColumn);
//     setRangeValue([0, 500]);
//     setSortOrder("DESC");
//     setSearchTerm((prevFilters) => {
//       // console.log("Previous Filters:", prevFilters);
//       return {
//         ...prevFilters,
//         pullId: '',
//         crashPoint: '',
//         playerCount: '',
//         totalAmount: '',
//         pullIdMin: '',
//         pullIdMax: '',
//         pullIdOperator: "",
//         crashPointOperator: "",
//         playerCountOperator: "",
//         totalAmountOperator: "",
//         crashPointMin: '',
//         crashPointMax: '',
//         playerCountMin: '',
//         playerCountMax: '',
//         totalAmountMin: '',
//         totalAmountMax: '',
//         startDate: '',
//         endDate: '',
//         sortBy: newColumn,
//         sortOrder: "DESC",
//       };
//     });
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchValue((prev) => ({
//       ...prev,
//       searchValue: value,
//     }));
//     setSearchTerm((prevFilters) => ({
//       ...prevFilters,
//       [selectedColumn]: value,
//     }));
//   };

//   const handleRangeChange = (e, newValue) => {
//     setRangeValue(newValue);
//     setSearchTerm((prevFilters) => ({
//       ...prevFilters,
//       [`${selectedColumn}Min`]: newValue[0],
//       [`${selectedColumn}Max`]: newValue[1],
//     }));
//   };

//   // const handleMinChange = (e) => {
//   //   const value = e.target.value;
//   //   setMinValue(value);
//   //   setSearchTerm((prevFilters) => ({
//   //     ...prevFilters,
//   //     [`${selectedColumn}Min`]: value,
//   //   }));
//   // };

//   // const handleMaxChange = (e) => {
//   //   const value = e.target.value;
//   //   setMaxValue(value);
//   //   setSearchTerm((prevFilters) => ({
//   //     ...prevFilters,
//   //     [`${selectedColumn}Max`]: value,
//   //   }));
//   // };

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setSearchValue((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setSearchTerm((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleSortOrderToggle = () => {
//     const newOrder = sortOrder === "DESC" ? "ASC" : "DESC";
//     setSortOrder(newOrder);
//     setSearchTerm((prevFilters) => ({
//       ...prevFilters,
//       sortOrder: newOrder,
//     }));
//   };

//   return (
//     <div>
//       <div className="flex items-center space-x-5 border-b border-[#2f4553]">
//         <FormControl
//           variant="standard"
//           sx={{
//             m: 1,
//             minWidth: 140,
//           }}
//         >
//           <InputLabel id="column-select-label" sx={{ color: "#6D7C86" }}>
//             Columns
//           </InputLabel>
//           <Select
//             labelId="column-select-label"
//             label="Columns"
//             value={selectedColumn}
//             onChange={handleColumnChange}
//             sx={{
//               color: "#b1bad3",
//               "&:before": { borderBottom: `1px solid #b1bad3` },
//               "&:after": { borderBottom: `1px solid #b1bad3` },
//             }}
//             MenuProps={{
//               PaperProps: {
//                 sx: {
//                   bgcolor: "#0f212e",
//                   color: "#b1bad3",
//                 },
//               },
//             }}
//           >
//             <MenuItem value="pullId">Pool Id</MenuItem>
//             <MenuItem value="crashPoint">Crash Point</MenuItem>
//             <MenuItem value="playerCount">Player Count</MenuItem>
//             <MenuItem value="totalAmount">Total Amount</MenuItem>
//           </Select>
//         </FormControl>

//         {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="operator-select-label" sx={{ color: "#6D7C86" }}>
//             Operator
//           </InputLabel>
//           <Select
//             labelId="operator-select-label"
//             value={selectedOperator}
//             onChange={handleOperatorChange}
//             sx={{ color: "#b1bad3" }}
//           >
//             <MenuItem value="=">Equals</MenuItem>
//             <MenuItem value=">">Greater than</MenuItem>
//             <MenuItem value="<">Less than</MenuItem>
//           </Select>
//         </FormControl> */}

//         <TextField
//           id="standard-basic"
//           label="Search"
//           variant="standard"
//           value={searchValue?.Search}
//           onChange={handleSearchChange}
//           InputLabelProps={{
//             sx: {
//               color: "#b1bad3",
//             },
//           }}
//           InputProps={{
//             sx: {
//               "&:before": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//               "&:after": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//             },
//           }}
//           sx={{
//             input: {
//               color: "#b1bad3",
//             },
//           }}
//         />
//         {/* <TextField
//           id="min-value"
//           label={`Min ${selectedColumn}`}
//           variant="standard"
//           value={minValue}
//           onChange={handleMinChange}
//           sx={{ mx: 1 }}
//         />
//         <TextField
//           id="max-value"
//           label={`Max ${selectedColumn}`}
//           variant="standard"
//           value={maxValue}
//           onChange={handleMaxChange}
//         /> */}
//         <div className="w-52 mt-7 ml-5 mr-1">
//           <p className="text-[#b1bad3]">Min-Max</p>
//           <Slider
//             value={rangeValue}
//             size="small"
//             onChange={handleRangeChange}
//             valueLabelDisplay="auto"
//             min={0}
//             max={1000}
//             sx={{
//               color: "#b1bad3",
//               "& .MuiSlider-thumb": {
//                 backgroundColor: "#b1bad3",
//               },
//               "& .MuiSlider-track": {
//                 backgroundColor: "#b1bad3",
//               },
//               "& .MuiSlider-rail": {
//                 backgroundColor: "#b1bad3",
//               },
//             }}
//           />
//         </div>
//         <TextField
//           name="startDate"
//           variant="standard"
//           sx={{
//             mx: 1,
//             mt: 2,
//             input: {
//               color: "#b1bad3",
//             },
//             width: 160,
//           }}
//           InputProps={{
//             sx: {
//               "&:before": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//               "&:after": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//             },
//           }}
//           type="date"
//           value={searchValue?.startDate}
//           onChange={handleDateChange}
//         />
//         <TextField
//           name="endDate"
//           variant="standard"
//           type="date"
//           sx={{
//             mt: 2,
//             input: {
//               color: "#b1bad3",
//             },
//             width: 160,
//           }}
//           InputProps={{
//             sx: {
//               "&:before": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//               "&:after": {
//                 borderBottom: `1px solid #b1bad3`,
//               },
//             },
//           }}
//           value={searchValue?.endDate}
//           onChange={handleDateChange}
//         />
//         <button
//           className="flex items-center text-[#b1bad3] mt-5 py-2"
//           onClick={handleSortOrderToggle}
//         >
//           {sortOrder === "DESC" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
//           <p>{sortOrder}</p>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Filter;

import { Slider, TextField } from "@mui/material";
import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IoFilterSharp } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setDate,
//   setIsOpenFilter,
//   setSearchTerm,
//   setSearchValue,
//   setSelected,
// } from "../../../features/games/gameDataFilterSlice";
import GameDataFilter from "../../component/GameDataFilter";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenFilter } from "../../../features/games/gameDataFilterSlice";

const textFieldStyles = {
  input: {
    color: "#b1bad3",
    // cursor:
    //   selected?.pullId === "range"
    //     ? "not-allowed"
    //     : selected?.crashPoint === "range"
    //     ? "not-allowed"
    //     : selected?.playerCount === "range"
    //     ? "not-allowed"
    //     : selected?.totalAmount === "range"
    //     ? "not-allowed"
    //     : "auto",
  },
  "& .MuiInputLabel-root": {
    color: "#b1bad3",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#b1bad3",
  },
  "& .MuiInputLabel-input.Mui-disabled": {
    color: "#b1bad3",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    color: "#b1bad3",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#b1bad3",
    },
    "&:hover fieldset": {
      borderColor: "#b1bad3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b1bad3",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#b1bad3",
    },
  },
};

const sliderFieldStyles = {
  color: "#b1bad3",
  "& .MuiSlider-thumb": {
    backgroundColor: "#b1bad3",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#b1bad3",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#b1bad3",
  },
};

function GameDetailFilter({ getAllUserdata }) {
  const dispatch = useDispatch()

  const { isOpenFilter, date, selected, searchValue } = useSelector(
    (state) => state?.gameDataFilter
  );

  const {
    // handleApplyFilter,
    handleFilterType,
    handleDateChange,
    handleInputChange,
    handleRangeChange,
    handleSortOrderToggle,
  } = GameDataFilter();

  const toggleFilterBox = () => {
    dispatch(setIsOpenFilter(!isOpenFilter));
  };

  const handleApplyFilter = () => {
    const filterData = {
      pullId: selected?.pullId === "fixed" ? searchValue?.pullId : undefined,
      pullIdMin: selected?.pullId === "range" ? searchValue?.pullIdRange : undefined,
      pullIdMax: selected?.pullId === "range" ? searchValue?.pullIdRange : undefined,
      crashPoint: selected?.crashPoint === "fixed" ? searchValue?.crashPoint : undefined,
      crashPointMin: selected?.crashPoint === "range" ? searchValue?.crashPointRange : undefined,
      crashPointMax: selected?.crashPoint === "range" ? searchValue?.crashPointRange : undefined,
      playerCount: selected?.playerCount === "fixed" ? searchValue?.playerCount : undefined,
      playerCountMin: selected?.playerCount === "range" ? searchValue?.playerCountRange : undefined,
      playerCountMax: selected?.playerCount === "range" ? searchValue?.playerCountRange : undefined,
      totalAmount: selected?.totalAmount === "fixed" ? searchValue?.totalAmount : undefined,
      totalAmountMin: selected?.totalAmount === "range" ? searchValue?.totalAmountRange : undefined,
      totalAmountMax: selected?.totalAmount === "range" ? searchValue?.totalAmountRange : undefined,
    };
    getAllUserdata(filterData);
  };

  // const dispatch = useDispatch();
  // const { isOpenFilter, date, selected, searchValue, searchTerm } = useSelector(
  //   (state) => state?.gameDataFilter
  // );

  // const handleApplyFilter = () => {
  //   const filterData = {
  //     pullId: selected?.pullId === "fixed" ? searchValue?.pullId : undefined,
  //     pullIdMin: selected?.pullId === "range" ? searchValue?.pullIdRange : undefined,
  //     pullIdMax: selected?.pullId === "range" ? searchValue?.pullIdRange : undefined,
  //     crashPoint: selected?.crashPoint === "fixed" ? searchValue?.crashPoint : undefined,
  //     crashPointMin: selected?.crashPoint === "range" ? searchValue?.crashPointRange : undefined,
  //     crashPointMax: selected?.crashPoint === "range" ? searchValue?.crashPointRange : undefined,
  //     playerCount: selected?.playerCount === "fixed" ? searchValue?.playerCount : undefined,
  //     playerCountMin: selected?.playerCount === "range" ? searchValue?.playerCountRange : undefined,
  //     playerCountMax: selected?.playerCount === "range" ? searchValue?.playerCountRange : undefined,
  //     totalAmount: selected?.totalAmount === "fixed" ? searchValue?.totalAmount : undefined,
  //     totalAmountMin: selected?.totalAmount === "range" ? searchValue?.totalAmountRange : undefined,
  //     totalAmountMax: selected?.totalAmount === "range" ? searchValue?.totalAmountRange : undefined,
  //   };
  //   getAllUserdata(filterData);
  // };

  // const toggleFilterBox = () => {
  //   dispatch(setIsOpenFilter(!isOpenFilter));
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(setSearchValue({ ...searchValue, [name]: value }));
  //   dispatch(setSearchTerm({ ...searchTerm, [name]: value }));
  // };

  // const handleSortOrderToggle = () => {
  //   const newOrder = searchValue?.sortOrder === "DESC" ? "ASC" : "DESC";
  //   dispatch(setSearchValue({ ...searchValue, sortOrder: newOrder }));
  //   dispatch(setSearchTerm({ ...searchTerm, sortOrder: newOrder }));
  // };

  // const handleRangeChange = (name, newValue) => {
  //   dispatch(setSearchValue({ ...searchValue, [name]: newValue }));
  //   dispatch(
  //     setSearchTerm({
  //       ...searchTerm,
  //       [`${name}Min`]: newValue[0],
  //       [`${name}Max`]: newValue[1],
  //     })
  //   );
  // };

  // const handleDateChange = (e) => {
  //   const { name, value } = e?.target;
  //   dispatch(setDate({ ...date, [name]: value }));

  //   if (name === "startDate" && value > date?.endDate) {
  //     dispatch(setDate({ ...setDate, endDate: "" }));
  //   }
  //   dispatch(setSearchTerm({ ...searchTerm, [name]: value }));
  // };

  // const handleFilterType = (e, fieldName) => {
  //   dispatch(setSelected({ ...selected, [fieldName]: e.target.value }));
  // };

  return (
    <div>
      <div>
        <button
          onClick={toggleFilterBox}
          className="text-white flex items-center bg-[#213743] border border-[#2f4553] px-16 py-2 text-xl"
        >
          <IoFilterSharp className="mr-3" />
          Filter
        </button>
      </div>

      {isOpenFilter && (
        <div className="mt-2 p-4 bg-[#213743] border text-[#b1bad3] border-[#2f4553]">
          <div className="flex justify-center">
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 xl:gap-x-12 lg:gap-x-[9rem] lg:gap-y-8 xl:gap-y-0">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <p>Pool Id :</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="fixed"
                      name="pull Id"
                      checked={selected?.pullId === "fixed"}
                      onChange={(e) => handleFilterType(e, "pullId")}
                      className="mr-1.5"
                    />
                    <span>Fixed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="range"
                      name="pull Id"
                      checked={selected?.pullId === "range"}
                      onChange={(e) => handleFilterType(e, "pullId")}
                      className="mr-1.5"
                    />
                    <span>Range</span>
                  </label>
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Pool Id"
                    name="pullId"
                    size="small"
                    value={searchValue?.pullId}
                    disabled={selected?.pullId === "range"}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                  <div
                    className={`w-44 mt-5 ${
                      selected?.pullId === "fixed"
                        ? "cursor-not-allowed"
                        : "cursor-auto"
                    }`}
                  >
                    <p className="text-[#b1bad3]">
                      Min : {searchValue?.pullIdRange[0]} - Max :{" "}
                      {searchValue?.pullIdRange[1]}
                    </p>
                    <Slider
                      size="small"
                      value={searchValue?.pullIdRange}
                      onChange={(e, newValue) =>
                        handleRangeChange("pullIdRange", newValue)
                      }
                      valueLabelDisplay="auto"
                      disabled={selected?.pullId === "fixed"}
                      min={0}
                      max={3000}
                      sx={sliderFieldStyles}
                    />
                  </div>
                  {/* <button
                  className="flex items-center text-[#b1bad3] py-2"
                  onClick={handleSortOrderToggle}
                >
                  {searchValue?.sortOrder === "DESC" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                  <p>{searchValue?.sortOrder}</p>
                </button> */}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <p>Crash Point :</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="fixed"
                      name="Crash Point"
                      checked={selected?.crashPoint === "fixed"}
                      onChange={(e) => handleFilterType(e, "crashPoint")}
                      className="mr-1.5"
                    />
                    <span>Fixed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      name="Crash Point"
                      value="range"
                      type="radio"
                      checked={selected?.crashPoint === "range"}
                      onChange={(e) => handleFilterType(e, "crashPoint")}
                      className="mr-1.5"
                    />
                    <span>Range</span>
                  </label>
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Crash Point"
                    size="small"
                    name="crashPoint"
                    value={searchValue?.crashPoint}
                    disabled={selected?.crashPoint === "range"}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                  <div
                    className={`w-48 mt-5 ${
                      selected?.crashPoint === "fixed"
                        ? "cursor-not-allowed"
                        : "cursor-auto"
                    }`}
                  >
                    <p className="text-[#b1bad3]">
                      Min : {searchValue?.crashPointRange[0]} - Max :{" "}
                      {searchValue?.crashPointRange[1]}
                    </p>
                    <Slider
                      size="small"
                      value={searchValue?.crashPointRange}
                      onChange={(e, newValue) =>
                        handleRangeChange("crashPointRange", newValue)
                      }
                      valueLabelDisplay="auto"
                      disabled={selected?.crashPoint === "fixed"}
                      min={0}
                      max={50}
                      sx={sliderFieldStyles}
                    />
                  </div>
                  {/* <button
                  className="flex items-center text-[#b1bad3] py-2"
                  onClick={handleSortOrderToggle}
                >
                  {searchValue?.sortOrder === "DESC" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                  <p>{searchValue?.sortOrder}</p>
                </button> */}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <p>Player Count :</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="fixed"
                      name="Player Count"
                      checked={selected?.playerCount === "fixed"}
                      onChange={(e) => handleFilterType(e, "playerCount")}
                      className="mr-1.5"
                    />
                    <span>Fixed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      name="Player Count"
                      type="radio"
                      value="range"
                      checked={selected?.playerCount === "range"}
                      onChange={(e) => handleFilterType(e, "playerCount")}
                      className="mr-1.5"
                    />
                    <span>Range</span>
                  </label>
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    name="playerCount"
                    label="Player Count"
                    size="small"
                    value={searchValue?.playerCount}
                    disabled={selected?.playerCount === "range"}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                  <div
                    className={`w-52 mt-5 ${
                      selected?.playerCount === "fixed"
                        ? "cursor-not-allowed"
                        : "cursor-auto"
                    }`}
                  >
                    <p className="text-[#b1bad3]">
                      Min : {searchValue?.playerCountRange[0]} - Max :{" "}
                      {searchValue?.playerCountRange[1]}
                    </p>
                    <Slider
                      size="small"
                      value={searchValue?.playerCountRange}
                      onChange={(e, newValue) =>
                        handleRangeChange("playerCountRange", newValue)
                      }
                      valueLabelDisplay="auto"
                      disabled={selected?.playerCount === "fixed"}
                      min={0}
                      max={20}
                      sx={sliderFieldStyles}
                    />
                  </div>
                  {/* <button
                  className="flex items-center text-[#b1bad3] py-2"
                  onClick={handleSortOrderToggle}
                >
                  {searchValue?.sortOrder === "DESC" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                  <p>{searchValue?.sortOrder}</p>
                </button> */}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <p>Total Amount :</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="fixed"
                      name="Total Amount"
                      checked={selected?.totalAmount === "fixed"}
                      onChange={(e) => handleFilterType(e, "totalAmount")}
                      className="mr-1.5"
                    />
                    <span>Fixed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      name="Total Amount"
                      type="radio"
                      value="range"
                      checked={selected?.totalAmount === "range"}
                      onChange={(e) => handleFilterType(e, "totalAmount")}
                      className="mr-1.5"
                    />
                    <span>Range</span>
                  </label>
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Total Amount"
                    name="totalAmount"
                    size="small"
                    value={searchValue?.totalAmount}
                    disabled={selected?.totalAmount === "range"}
                    onChange={handleInputChange}
                    sx={textFieldStyles}
                  />
                  <div
                    className={`w-48 mt-5 ${
                      selected?.totalAmount === "fixed"
                        ? "cursor-not-allowed"
                        : "cursor-auto"
                    }`}
                  >
                    <p className="text-[#b1bad3]">
                      Min : {searchValue?.totalAmountRange[0]} - Max :{" "}
                      {searchValue?.totalAmountRange[1]}
                    </p>
                    <Slider
                      size="small"
                      value={searchValue?.totalAmountRange}
                      onChange={(e, newValue) =>
                        handleRangeChange("totalAmountRange", newValue)
                      }
                      valueLabelDisplay="auto"
                      disabled={selected?.totalAmount === "fixed"}
                      min={0}
                      max={5000}
                      sx={sliderFieldStyles}
                    />
                  </div>
                  {/* <button
                  className="flex items-center text-[#b1bad3] py-2"
                  onClick={handleSortOrderToggle}
                >
                  {searchValue?.sortOrder === "DESC" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                  <p>{searchValue?.sortOrder}</p>
                </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="mt-5">
              {/* <p>Pool Time</p> */}
              <div className="flex xl:space-x-6 lg:space-x-6">
                <div className="flex items-center">
                  <p className="text-sm pr-2">Start Date :</p>
                  <TextField
                    name="startDate"
                    value={date?.startDate}
                    size="small"
                    onChange={handleDateChange}
                    sx={textFieldStyles}
                    type="date"
                    className="xl:w-40 lg:w-32"
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-sm pr-2">End Date :</p>
                  <TextField
                    name="endDate"
                    size="small"
                    value={date?.endDate}
                    onChange={handleDateChange}
                    sx={textFieldStyles}
                    type="date"
                    className="xl:w-40 lg:w-32"
                    inputProps={{
                      min: date?.startDate,
                    }}
                  />
                </div>
                <div>
                  <button
                    className="flex items-center text-[#b1bad3] py-2"
                    onClick={handleSortOrderToggle}
                  >
                    {searchValue?.sortOrder === "DESC" ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                    <p>{searchValue?.sortOrder}</p>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                className="xl:px-5 lg:px-3 py-2 bg-[#0f212e] hover:bg-[#132938] rounded-md"
                onClick={handleApplyFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetailFilter;
