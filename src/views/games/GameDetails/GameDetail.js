import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Column = [
    {

        field: "id",
        headerName: "Id",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "userName",
        headerName: "User Name",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "playerName",
        headerName: "Player Name",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "userId",
        headerName: "User Id",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "cashoutMultiplier",
        headerName: "Cash Multiplier",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "winAmount",
        headerName: "Win Amount",
        width: 200,
        headerClassName: "column-header",
    },
    {
        field: "isWinner",
        headerName: "is Winner",
        width: 200,
        headerClassName: "column-header",
    },

    {
        field: "lossAmount",
        headerName: "Loss Amount",
        width: 200,
        headerClassName: "column-header",
    }

]



function GameDetailPlayer () {
    const { pullsData } = useSelector((state) => state?.gameDetail);
    const rows = pullsData?.pulls?.players?.map((log, index) => ({
        id: index,
        userName: log.players?.user?.userName,
        playerName: log.players?.playerName,
        userId:log.players?.userId,
        amount:log.players?.amount,
        cashoutMultiplier: log.players?.cashoutMultiplier,
        winAmount: log.players?.winAmount,
        isWinner: log.players?.isWinner,
        lossAmount: log.players?.lossAmount
    }));
    return (
        <div className=" -mt-8 p-9 justify-center w-[465px] px-8">
                    <DataGrid
                        rows ={rows}
                        columns={Column}
                        hideFooter
                        getRowClassName={(params) =>  params.indexRelativeToCurrentPage % 2 === 0
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
          

    
    )
    
}
export default GameDetailPlayer