function Columns() {
    const columns = [
        {
            field: "betType",
            headerName: "Bet Type",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "totalBets",
            headerName: "Total Bets",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "totalBetAmount",
            headerName: "Total Amount ",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            
            field: "totalProfit",
            headerName: "Total Profit ",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        }
    ]
    return columns
}
export default Columns
