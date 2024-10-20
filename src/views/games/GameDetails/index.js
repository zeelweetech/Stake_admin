import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { getGameHistory } from "../../../services/GameServices";
import Column from "./Column";
import GameDetailPlayers from "./GameDetailPlayer";
import { useDispatch, useSelector } from "react-redux";
import GameDetailFilter from "./GameDetailFilter";
import { setPullsData } from "../../../features/games/gameDetails";

function GameDetails() {
  const { gameId } = useParams();
  const dispatch = useDispatch()
  // const [pullsData, setPullsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const { searchTerm } = useSelector((state) => state?.gameDataFilter);
  const {pullsData} = useSelector((state) => state?.gameDetail)
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  console.log("searchTerm -*-*-*-*-*", searchTerm);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getGameHistory({
        id: gameId,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        pullId: searchTerm?.pullId,
        crashPoint: searchTerm?.crashPoint,
        playerCount: searchTerm?.playerCount,
        totalAmount: searchTerm?.totalAmount,
        pullIdOperator: searchTerm?.pullId && "=",
        crashPointOperator: searchTerm?.crashPoint && "=",
        playerCountOperator: searchTerm?.playerCount && "=",
        totalAmountOperator: searchTerm?.totalAmount && "=",
        pullIdMin: searchTerm?.pullIdRangeMin,
        pullIdMax: searchTerm?.pullIdRangeMax,
        crashPointMin: searchTerm?.crashPointRangeMin,
        crashPointMax: searchTerm?.crashPointRangeMax,
        playerCountMin: searchTerm?.playerCountRangeMin,
        playerCountMax: searchTerm?.playerCountRangeMax,
        totalAmountMin: searchTerm?.totalAmountRangeMin,
        totalAmountMax: searchTerm?.totalAmountRangeMax,
        startDate: searchTerm?.startDate,
        endDate: searchTerm?.endDate,
        sortBy: searchTerm?.sortBy,
        sortOrder: searchTerm?.sortOrder,
      });
      // setPullsData(response?.pulls)
      dispatch(setPullsData(response?.pulls))
      const allPlayers = response?.pulls?.flatMap((pull) => pull.players || []);
      setUserData(allPlayers);
      setTotalCount(response?.totalPulls);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return `${formattedDate} ${formattedTime}`;
  };

  const rows = pullsData?.map((pulls) => {
    return {
      pullId: pulls?.pullId ? pulls?.pullId : "-",
      CrashPoint: pulls?.crashPoint ? pulls?.crashPoint : "-",
      PlayerCount: pulls?.playerCount ? pulls?.playerCount : "-",
      TotalPullAmount: pulls?.totalPullAmount ? pulls?.totalPullAmount : "-",
      PullTime: formatDateTime(pulls?.pullTime)
        ? formatDateTime(pulls?.pullTime)
        : "-",
      expanded: expandedRow === pulls?.pullId,
    };
  });

  const rowsWithDetails = rows
    .flatMap((row) => [
      row, // Parent row
      expandedRow === row.pullId // Add child row if expanded
        ? {
            id: `details-${row.pullId}`,
            isDetailsRow: true,
            pullId: row.pullId,
          }
        : null,
    ])
    .filter(Boolean);

  const columnsWithDetails = [
    ...Column(),
    {
      renderCell: (params) =>
        params.row.expanded && (
          <Box sx={{ padding: 2, width: "100%" }}>
            <GameDetailPlayers
              pullId={params.row.pullId}
              userData={userData.filter(
                (player) => player.pullId === params.row.pullId
              )}
            />
          </Box>
        ),
    },
  ];

  const handleRowClick = (params) => {
    const clickedRowId = params.row.pullId;
    setExpandedRow((prev) => (prev === clickedRowId ? null : clickedRowId));
  };

  return (
    <div className="flex-1 mt-10">
      <div>
        <GameDetailFilter getAllUserdata={getAllUserdata} />
      </div>
      <DataGrid
        autoHeight
        rows={rows}
        columns={Column()}
        // rows={rowsWithDetails}
        // columns={columnsWithDetails}
        getRowId={(row) => row.pullId}
        loading={loading}
        rowCount={totalCount}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20]}
        onRowClick={handleRowClick}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "row-dark" : "row-light"
        }
        className="select-none mt-6"
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
      {pullsData.map((row) => (
        <div key={row?.pullId}>
          {expandedRow === row?.pullId && (
            <Accordion expanded={true} sx={{ background: "#1a2c38" }}>
              <AccordionSummary>
                Game Details for {row?.pullId}
              </AccordionSummary>
              <AccordionDetails>
                {/* <GamePlayersColumn pullId={row.pullId} /> */}
                <GameDetailPlayers
                  pullId={row?.pullId}
                  userData={userData.filter(
                    (player) => player.pullId === row.pullId
                  )}
                />
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
}

export default GameDetails;
