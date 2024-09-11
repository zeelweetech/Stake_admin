// import { DataGrid } from "@mui/x-data-grid";
// import React, { useEffect, useState } from "react";
// import { MdEdit } from "react-icons/md";
// import { getCommissionList, getGameHistory } from "../../services/GameServices";

// export default function Details({ commissionData }) {
//   const [pullsData, setPullsData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [rowCount, setRowCount] = useState(0);

//   console.log("pageSize +++++++++", pageSize);
//   console.log("page $$$$$$$$$$", page);

//   useEffect(() => {
//     getAllUserdata();
//   }, [page, pageSize]);

//   const getAllUserdata = async () => {
//     try {
//       const response = await getGameHistory(page + 1, pageSize);
//       console.log("response : ", response);
//       setPullsData(response.pulls);
//       setRowCount(response.totalPulls);
//       // setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch users: ", error);
//     }
//   };
//   console.log("pullsData *****", pullsData);
//   //   console.log("pageSize &&&&&&&&& ", pageSize);
//   const columns = [
//     {
//       field: "pullId",
//       headerName: "pullId",
//       width: 250,
//       headerClassName: "column-header",
//       cellClassName: "column-cell",
//     },
//     {
//       field: "crashPoint",
//       headerName: "crashPoint",
//       width: 250,
//       headerClassName: "column-header",
//       cellClassName: "column-cell",
//     },
//     {
//       field: "playerCount",
//       headerName: "playerCount",
//       width: 220,
//       headerClassName: "column-header",
//       cellClassName: "column-cell",
//     },
//     {
//       field: "totalPullAmount",
//       headerName: "totalPullAmount",
//       width: 220,
//       headerClassName: "column-header",
//       cellClassName: "column-cell",
//     },
//     {
//       field: "pullTime",
//       headerName: "pullTime",
//       width: 210,
//       headerClassName: "column-header",
//       cellClassName: "column-cell",
//     },
//     // {
//     //   field: "Edit",
//     //   headerName: "Edit",
//     //   width: 180,
//     //   headerClassName: "column-header",
//     //   cellClassName: "column-cell",
//     //   renderCell: () => (
//     //     <button>
//     //       <MdEdit />
//     //     </button>
//     //   ),
//     // },
//   ];

//   const rows = pullsData?.map((pullsData) => {
//     // console.log(pullsData);
//     return {
//       pullId: pullsData.pullId,
//       crashPoint: pullsData.crashPoint,
//       playerCount: pullsData.playerCount,
//       totalPullAmount: pullsData.totalPullAmount,
//       pullTime: pullsData.pullTime,
//       //   Edit: pullsData.game.gameName,
//     };
//   });

//   return (
//     <div className="flex-1 mt-10">
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         getRowId={(row) => row.pullId}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 1, pageSize: 10 },
//           },
//         }}
//         pagination
//         page={page - 1}
//         pageSize={pageSize}
//         onPageChange={(newPage) => setPage(newPage + 1)}
//         onPageSizeChange={(newPageSize) => {
//           setPageSize(newPageSize);
//           setPage(1);
//         }}
//         rowCount={rowCount}
//         paginationMode="server"
//         pageSizeOptions={[10, 20]}
//         getRowClassName={(params) =>
//           params.indexRelativeToCurrentPage % 2 === 0 ? "row-dark" : "row-light"
//         }
//         className="select-none"
//         sx={{
//           border: "none",
//           color: "#b1bad3",
//           "& .MuiDataGrid-cell": {
//             border: "none",
//           },
//           "& .MuiDataGrid-columnHeader": {
//             borderBottom: "none",
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             borderBottom: "none",
//             color: "white",
//           },
//           "& .MuiTablePagination-root": {
//             color: "white",
//           },
//           "& .MuiTablePagination-selectIcon": {
//             color: "white",
//           },
//         }}
//       />
//     </div>
//   );
// }

import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { getGameHistory } from "../../../services/GameServices";
import { useParams } from "react-router-dom";

export default function Details() {
  const { gameId } = useParams();
  const [pullsData, setPullsData] = useState([]);
  const [pageState, setPageState] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  // console.log("pageSize +++++++++", pageSize);
  // console.log("page $$$$$$$$$$", page);

  useEffect(() => {
    getAllUserdata();
  }, [pageState.page, pageState.pageSize, gameId]);
  
  console.log("gameId ((((((((((((((", gameId);

  const getAllUserdata = async () => {
    try {
      const response = await getGameHistory(gameId, pageState.page, pageState.pageSize);
      console.log("response : ", response);
      setPullsData(response.pulls);
      setPageState(old => ({...old, total: response.totalPulls}))
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  };
  console.log("pullsData *****", pullsData);

  const columns = [
    {
      field: "pullId",
      headerName: "pullId",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "crashPoint",
      headerName: "crashPoint",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "playerCount",
      headerName: "playerCount",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "totalPullAmount",
      headerName: "totalPullAmount",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "pullTime",
      headerName: "pullTime",
      width: 210,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    // {
    //   field: "Edit",
    //   headerName: "Edit",
    //   width: 180,
    //   headerClassName: "column-header",
    //   cellClassName: "column-cell",
    //   renderCell: () => (
    //     <button>
    //       <MdEdit />
    //     </button>
    //   ),
    // },
  ];

  const rows = pullsData?.map((pullsData) => {
    // console.log(pullsData);
    return {
      pullId: pullsData.pullId,
      crashPoint: pullsData.crashPoint,
      playerCount: pullsData.playerCount,
      totalPullAmount: pullsData.totalPullAmount,
      pullTime: pullsData.pullTime,
      //   Edit: pullsData.game.gameName,
    };
  });

  return (
    <div className="flex-1 mt-10">
      <DataGrid
        // autoHeight
        rows={rows}
        columns={columns}
        getRowId={(row) => row.pullId}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        onPageChange={(newPage) =>
          setPageState((old) => ({ ...old, page: newPage + 1 }))
        }
        onPageSizeChange={(newPageSize) =>
          setPageState((old) => ({ ...old, pageSize: newPageSize, page: 1 }))
        }
        rowCount={pageState.total}
        paginationMode="server"
        pageSizeOptions={[10, 20, 30, 40]}
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
