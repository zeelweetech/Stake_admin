// import { DataGrid } from "@mui/x-data-grid";
// import { useSelector } from "react-redux";

// const Columns = [
//     {
//         field: "betType",
//         headerName: "Bet Type",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         field: "totalBets",
//         headerName: "Total Bets",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         field: "totalBetAmount",
//         headerName: "Total Amount",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         field: "totalProfit",
//         headerName: "Total Profit",
//         width: 200,
//         headerClassName: "column-header",
//     },
// ];

// function BetStatus() {
//     const { dashboardData } = useSelector((state) => state?.dashBoard);
//     const rows = dashboardData?.betStats?.map((log, index) => ({
//         id: index,
//         betType: log.betType || "N/A",
//         totalBets: log.totalBets || "0",
//         totalBetAmount: log.totalBetAmount || "0.00",
//         totalProfit: log.totalProfit || "0.00",
//     }));

//     return (
//         <div className="pb-3 ">
//             <div className="w-1/2">

//                 <p className="text-xl font-bold text-center -mt-2 pr-20 py-4 text-[#b1bad3]">
//                     Bet Status
//                 </p>
//                 <div className="flex items-center -mt-8 py-7 justify-center w-[580px] px-8">

//                     {/* <div className="w-1/2"> */}
//                     <DataGrid
//                         rows={rows}
//                         columns={Columns}
//                         hideFooter
//                         getRowClassName={(params) =>
//                             params.indexRelativeToCurrentPage % 2 === 0
//                                 ? "row-dark"
//                                 : "row-light"
//                         }
//                         sx={{
//                             border: "none",
//                             color: "#b1bad3",
//                             "& .MuiDataGrid-cell": {
//                                 border: "none",
//                             },
//                             "& .MuiDataGrid-columnHeader": {
//                                 borderBottom: "none",
//                                 borderTop: "none",
//                             },
//                             "& .MuiDataGrid-footerContainer": {
//                                 borderTop: "none",
//                                 borderBottom: "none",
//                                 color: "white",
//                             },
//                             "& .MuiTablePagination-root": {
//                                 color: "white",
//                             },
//                             "& .MuiTablePagination-selectIcon": {
//                                 color: "white",
//                             },
//                             overflowY: 'hidden',
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//         // </div>
//     );
// }

// export default BetStatus;


