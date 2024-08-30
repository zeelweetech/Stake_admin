import * as React from "react";
import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { BsIncognito, BsFire } from "react-icons/bs";
import { RiMoneyRupeeCircleFill, RiMoneyPoundCircleFill } from "react-icons/ri";

const columns = [
  {
    field: "Game",
    headerName: "Game",
    width: 250,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    renderCell: (params) => (
      <div className="flex items-center">
        <p className="mr-1.5">{params.value.icon}</p> {params.value.text}
      </div>
    ),
  },
  {
    field: "User",
    headerName: "User",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    renderCell: (params) => (
      <div className="flex items-center">
        <p className="mr-1.5">{params.value.icon}</p> {params.value.text}
      </div>
    ),
  },
  {
    field: "Time",
    headerName: "Time",
    width: 220,
    headerClassName: "column-header",
    cellClassName: "column-cell",
  },
  {
    field: "BetAmount",
    headerName: "Bet Amount",
    width: 220,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    renderCell: (params) => (
      <div className="flex items-center">
        <p className="mr-1.5">{params.value.text}</p> {params.value.icon}
      </div>
    ),
  },
  {
    field: "Multiplier",
    headerName: "Multiplier",
    width: 120,
    headerClassName: "column-header",
    cellClassName: "column-cell",
  },
  {
    field: "Payout",
    headerName: "Payout",
    width: 130,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    renderCell: (params) => (
      <div className="flex items-center">
        <p className="mr-1.5">{params.value.text}</p> {params.value.icon}
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Crash" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 2,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Mines" },
    Time: "12:33 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 3,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 4,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Crash" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 5,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Wheel" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 6,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Dragon Tower" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 7,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Limbo" },
    Time: "12:33 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 8,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 9,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Mines" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 10,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Wheel" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 11,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Dragon Tower" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 12,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:33 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 13,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Dragon Tower" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 14,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 15,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 16,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:33 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 17,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:32 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
  {
    id: 18,
    User: { icon: <BsIncognito />, text: "Hidden" },
    Game: { icon: <BsFire />, text: "Plinko" },
    Time: "12:33 AM",
    BetAmount: {
      text: "₹12,57,947.92",
      icon: <RiMoneyRupeeCircleFill color="yellow" />,
    },
    Multiplier: "1.49×",
    Payout: {
      text: "₹99,469.89",
      icon: <RiMoneyPoundCircleFill color="green" />,
    },
  },
];

export default function Users() {
  return (
    <div className="bg-[#1a2c38] flex justify-center item-center py-[1.8rem]">
      <div style={{ height: 640, width: "70%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
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
            },
          }}
        />
      </div>
    </div>
  );
}
