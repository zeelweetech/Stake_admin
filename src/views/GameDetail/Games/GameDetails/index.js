import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameHistory } from "../../../../services/GameServices";
import Columns from "./columns";

function GameDetails() {
  const { gameId } = useParams();
  const [pullsData, setPullsData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log("paginationModel", paginationModel);

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getGameHistory({
        id: gameId,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("response : ", response);
      setPullsData(response?.pulls);
      setTotalCount(response?.totalPulls);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const rows = pullsData?.map((pullsData) => {
    return {
      pullId: pullsData.pullId,
      crashPoint: pullsData.crashPoint,
      playerCount: pullsData.playerCount,
      totalPullAmount: pullsData.totalPullAmount,
      pullTime: pullsData.pullTime,
    };
  });

  return (
    <div className="flex-1 mt-10">
      <DataGrid
        rows={rows}
        columns={Columns()}
        getRowId={(row) => row.pullId}
        loading={loading}
        rowCount={totalCount}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "row-dark" : "row-light"
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
  );
}

export default GameDetails;
