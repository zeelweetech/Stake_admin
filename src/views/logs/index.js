import React from "react";
import "../../App.css";
import { useEffect } from "react";
import { useState } from "react";
import { getAllLogs } from "../../services/LoginServices";
import Columns from "./columns";
import { DataGrid } from "@mui/x-data-grid";
import { TbLogs } from "react-icons/tb";
import SearchIcon from "@mui/icons-material/Search";

const Logs = () => {
  const [logsData, setLogsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUserLogs();
  }, [paginationModel?.page, paginationModel?.pageSize, searchQuery]);

  const getAllUserLogs = async () => {
    setLoading(true);
    try {
      const response = await getAllLogs({
        search: searchQuery,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      
      setLogsData(response?.logs);
      setTotalCount(response?.totalItems);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };


  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");

    const options = {
      hour: "numeric",

      minute: "numeric",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return `${formattedDate} ${formattedTime}`;
  };
  

  const rows = logsData?.map((log, index) => {
    return {
      id: log.id || `log- ${index}`,
      userName: log.userName ? log.userName : "-",
      userId: log.userId ? log.userId : "-",
      performOn: log.performOn ? log.performOn : "-",
      actionType: log.actionType ? log.actionType : " -",
      actionDescription: log?.actionDescription,
      logTime: formatDateTime(log.logTime) ? formatDateTime(log.logTime) : "-",
    };
  });

  console.log("rows:::::::",rows);
  
  return (
    <>
      <div className="bg-[#1a2c38] py-2 h-full ">
        <div className=" h-full">
          <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5">
            <TbLogs size={25} />
            <p className=" text-2xl py-3">Logs</p>
          </div>
          <div className="bg-[#0f212e] border-[#2f4553] flex items-center justify-center w-72 mt-5 ml-auto mr-40 p-2 space-x-2">
            <SearchIcon size={25} className="text-white" />
            <input
              className="text-lg text-white bg-[#0f212e] w-full outline-none"
              type="text"
              name="search"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center item-center py-8">
            <div style={{ width: "75.25%" }}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={Columns()}
                loading={loading}
                rowCount={totalCount}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 20]}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "row-dark"
                    : "row-light"
                }
                className="select-none"
                sx={{
                  border: "none",
                  color: "#b1bad3",
                  "& .MuiDataGrid-cell": {
                    border: "none",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    borderTop: "none",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    borderBottom: "none",
                    color: "white",
                  },
                  "& .MuiTablePagination-root": {
                    color: "white",
                  },
                  "& .MuiTablePagination-selectIcon": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logs;
