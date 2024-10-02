import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setSearchTerm, setSearchValue, setSelected } from '../../features/games/gameDataFilterSlice';

export default function GameDataFilter() {
    const dispatch = useDispatch();
    const { date, selected, searchValue, searchTerm } = useSelector(
      (state) => state?.gameDataFilter
    );
  
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
    //   // getAllUserdata(filterData);
    // };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      dispatch(setSearchValue({ ...searchValue, [name]: value }));
      dispatch(setSearchTerm({ ...searchTerm, [name]: value }));
    };
  
    const handleSortOrderToggle = () => {
      const newOrder = searchValue?.sortOrder === "DESC" ? "ASC" : "DESC";
      dispatch(setSearchValue({ ...searchValue, sortOrder: newOrder }));
      dispatch(setSearchTerm({ ...searchTerm, sortOrder: newOrder }));
    };
  
    const handleRangeChange = (name, newValue) => {
      dispatch(setSearchValue({ ...searchValue, [name]: newValue }));
      dispatch(
        setSearchTerm({
          ...searchTerm,
          [`${name}Min`]: newValue[0],
          [`${name}Max`]: newValue[1],
        })
      );
    };
  
    const handleDateChange = (e) => {
      const { name, value } = e?.target;
      dispatch(setDate({ ...date, [name]: value }));
  
      if (name === "startDate" && value > date?.endDate) {
        dispatch(setDate({ ...setDate, endDate: "" }));
      }
      dispatch(setSearchTerm({ ...searchTerm, [name]: value }));
    };
  
    const handleFilterType = (e, fieldName) => {
      dispatch(setSelected({ ...selected, [fieldName]: e.target.value }));
    };
    
  return {
    // handleApplyFilter,
    handleInputChange,
    handleSortOrderToggle,
    handleRangeChange,
    handleDateChange,
    handleFilterType
  }
}
