import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";


const Columns = [
    {
        field: "country",
        headerName: "Country",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "userCount",
        headerName: "User Count",
        width: 200,
        headerClassName: "column-header",
    }
];

function CountsByCountry() {
    const { dashboardData } = useSelector((state) => state?.dashBoard);
    const rows = dashboardData?.playerCountsByCountry?.map((log, index) => ({
        id: index,
        country: log.country || "",
        userCount: log.userCount || "0",
    }));

    return (
        <div className="pb-3">
            <div >
                <p className="text-xl font-bold text-center py-3 text-[#b1bad3]">
                    Counts By Country
                </p>
                <div className="xl:w-[410px] lg:w-[340px] lg:h-[280px] h-[300px] lg:p-1">
                    <DataGrid
                        rows={rows}
                        columns={Columns}
                        hideFooter
                        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0
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
                            overflowY: 'hidden',
                        }}
                    />
                </div>
            </div>

        </div>
    )

}
export default CountsByCountry;