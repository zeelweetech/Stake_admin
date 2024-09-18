import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { getAllLogs } from "../../services/LoginServices";
import Columns from "./columns";
import { TbLogs } from "react-icons/tb";

function Logs() {
  const [logsData, setLogsData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUserLogs();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getAllUserLogs = async () => {
    setLoading(true);
    try {
      const response = await getAllLogs({
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("response", response);

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

  const rows = logsData?.map((logsData) => {
    return {
      userName: logsData.userName ? logsData.userName : "-",
      userId: logsData.userId ? logsData.userId : "-",
      performOn: logsData.performOn ? logsData.performOn : "-",
      actionType: logsData.actionType ? logsData.actionType : " -",
      actionDescription: logsData.actionDescription
        ? logsData.actionDescription
        : "-",
      logTime: formatDateTime(logsData.logTime)
        ? formatDateTime(logsData.logTime)
        : "-",
    };
  });

  return (
    <div className="bg-[#1a2c38] py-2 h-full ">
      {loading ? (
        <div className="m-auto justify-center item-center">
          <Loader />
        </div>
      ) : (
        <div className=" h-full">
          <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5">
            <TbLogs size={25} />
            <p className=" text-2xl py-3">Logs</p>
          </div>
          <div className="flex justify-center item-center py-8">
            <div style={{ width: "75.25%" }}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={Columns()}
                getRowId={(row) => row.userId}
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
      )}
    </div>
  );
}

export default Logs;
