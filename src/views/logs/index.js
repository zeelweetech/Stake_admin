import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";
import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { getAllLogs } from "../../services/LoginServices";
import Columns from "./columns";
import { PiUserSquareDuotone } from "react-icons/pi";

function Logs() {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [logsData, setLogsData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getAllUserdata = async () => {
    try {
      const response = await getAllLogs({
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("getAllUser response", response);
      setLogsData(response?.logs);
      setTotalCount(response?.totalPulls);

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

  // const logDateTimeFormatted = formatDateTime("2024-08-23T10:13:04.000Z");
  // console.log(logDateTimeFormatted);

  const rows = logsData?.map((logs) => {
    return {
      userName: logs.User?.username ? logs.User?.username : "-",
      userId: logs.userId ? logs.userId : "-",
      action: logs.action ? logs.action : "-",
      logTime: formatDateTime(logs.logTime) ? formatDateTime(logs.logTime) : "-",
    };
  });

  return (
    <div className="bg-[#1a2c38] py-2 h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5">
            <PiUserSquareDuotone size={25} />
            <p className=" text-2xl py-3">Logs</p>
          </div>
          <div className="flex justify-center item-center py-8">
            <div style={{ width: "75.25%" }}>
              <DataGrid
                rows={rows}
                columns={Columns()}
                getRowId={(row) => row.userId || row.id || Math.random()}
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
