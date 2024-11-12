// import { useSelector } from "react-redux";
// import { DataGrid } from "@mui/x-data-grid";
// import React from "react";

// const columns = [
//     {
//         field: "medalLevel",
//         headerName: "MedalLevel",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         field: "medalType",
//         headerName: "MedalType",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         field: "winAmount",
//         headerName: "WinAmount",
//         width: 200,
//         headerClassName: "column-header",
//     },
//     {
//         headerName: "Action",
//         width: 200,
//         headerClassName: "column-header",
//     },
// ];

// function MedalsInfo() {
//     const { medalData } = useSelector((state) => state?.medal || {});

//     const rows = medalData?.map((log) => ({
//         id: log.id,
//         medalLevel: log.medalLevel || "",
//         medalType: log.medalType || "",
//         winAmount: log.winAmount || "0.00",
//     }))

//     console.log("medal data :::::::::::", medalData);
//     return (
//         <div className="justify-center pt-4">
//         <div style={{ height: 400, width: '100%' }}>
//             <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
//                 Medal Info
//             </p>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 hideFooter
//                 getRowClassName={(params) =>
//                     params.indexRelativeToCurrentPage % 2 === 0
//                         ? "row-dark"
//                         : "row-light"
//                 }
//                 sx={{
//                     border: "none",
//                     color: "#b1bad3",
//                     "& .MuiDataGrid-cell": {
//                         border: "none",
//                     },
//                     "& .MuiDataGrid-columnHeader": {
//                         borderBottom: "none",
//                         borderTop: "none",
//                     },
//                     "& .MuiDataGrid-footerContainer": {
//                         borderTop: "none",
//                         borderBottom: "none",
//                         color: "white",
//                     },
//                     "& .MuiTablePagination-root": {
//                         color: "white",
//                     },
//                     "& .MuiTablePagination-selectIcon": {
//                         color: "white",
//                     },
//                     height: 220,
//                     overflowY: 'auto',
//                 }}
//             />
//         </div>
//         </div>
//     );
// }

// export default MedalsInfo;


import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";  // For managing modal state or form
import { useSelector } from "react-redux";
import { EditModel } from "../../services/medalsService";

const columns = [
    {
        field: "medalLevel",
        headerName: "MedalLevel",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "medalType",
        headerName: "MedalType",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "winAmount",
        headerName: "WinAmount",
        width: 200,
        headerClassName: "column-header",
    },
    {
        headerName: "Action",
        width: 200,
        headerClassName: "column-header",
        renderCell: (params) => {
            const handleEdit = () => {
                
                const medalId = params.row.id;
                const body = {
                    medalLevel: "Updated Level", 
                    medalType: "Updated Type",
                    winAmount: "Updated Amount",
                };

                EditModel({ body, id: medalId })
                    .then((data) => {
                        console.log("Edit success", data);
                    })
                    .catch((error) => {
                        console.error("Edit failed", error);
                    });
            };

            return (
                <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Edit
                </button>
            );
        },
    },
];

function MedalsInfo() {
    const { medalData } = useSelector((state) => state?.medal || {});

    const rows = medalData?.map((log) => ({
        id: log.id,
        medalLevel: log.medalLevel || "",
        medalType: log.medalType || "",
        winAmount: log.winAmount || "0.00",
    }));

    return (
        <div className="justify-center pt-4">
            <div style={{ height: 400, width: '100%' }}>
                <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
                    Medal Info
                </p>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
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
                        height: 220,
                        overflowY: 'auto',
                    }}
                />
            </div>
        </div>
    );
}

export default MedalsInfo;
