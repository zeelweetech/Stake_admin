
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { EmojiEvents } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { GetMedals } from "../../services/medalsService";
import { setMedalData } from "../../features/medals/medalSlice";
import MedalsInfo from "./MedalsInfo";

function GetUserMedal() {
    const [loading, setLoading] = useState(false);
    const [userMedalData, setUserMedalData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [medalValue, setMedalValue] = useState();
    const [selectedMedalId, setSelectedMedalId] = useState();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalCount, setTotalCount] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        getMedal();
    }, [paginationModel?.page, paginationModel?.pageSize]);

    const getMedal = async () => {
        try {
            const response = await GetMedals({
                page: paginationModel?.page + 1,
                pageSize: paginationModel?.pageSize,
            });
            dispatch(setMedalData(response));
            setTotalCount(response.totalCount); 

            console.log('Medal Data:', response);
        } catch (error) {
            console.error("Failed to fetch medals: ", error);
            setLoading(false);
        }
    };

    const openEditDialog = (Medal) => {
        setMedalValue({
            medalLevel: Medal?.medalLevel,
            medalType: Medal?.medalType,
            winAmount: Medal?.winAmount,
        });
        setSelectedMedalId(Medal?.id);
        setIsEditing(true);
        setOpen(true);
    };

    const columns = [
        {
            field: "medalLevel",
            headerName: "Medal Level",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "medalType",
            headerName: "Medal Type",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "winAmount",
            headerName: "Win Amount",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            headerName: "Edit",
            width: 200,
            headerClassName: "column-header",
            cellClassName: "column-cell",
            renderCell: (params) => (
                <button
                    onClick={() => openEditDialog(params.row)}
                    className="px-2 py-1"
                >
                    <EditIcon />
                </button>
            ),
        },
    ];

    const { medalData } = useSelector((state) => state?.medal || {});

    const rows = medalData?.map((log) => ({
        id: log.id,
        medalLevel: log.medalLevel || "",
        medalType: log.medalType || "",
        winAmount: log.winAmount || "0.00",
    }));

    return (
        <div>
            <div className="bg-[#1a2c38] flex flex-col">
                <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mx-auto">
                    <EmojiEvents size={25} className="text-white text-3xl" />
                    <p className="text-2xl pr-10 py-3">Medals</p>
                </div>
            </div>
            <div className="flex justify-center py-16">
                <div>
                    <div className="flex justify-end">
                        <button
                            className="text-white bg-[#213743] font-medium px-4 py-2 rounded-sm flex items-center space-x-1"
                            onClick={() => {
                                setIsEditing(false);
                                setOpen(true);
                                setMedalValue({});
                            }}
                        >
                            <AddIcon />
                            <p>Add Medal</p>
                        </button>
                    </div>
                    <div className="justify-center pt-4 xl:h-[500px]">
                        <div style={{ height: 600, width: '100%' }}>
                            <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
                                Medal Detail
                            </p>
                            <DataGrid
                                autoHeight
                                rows={rows}
                                getRowId={(row) => row.id}
                                columns={columns}
                                loading={loading}
                                rowCount={totalCount}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={setPaginationModel}
                                pageSizeOptions={[10, 20]}
                                hideFooter={false} 
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
                                    height: 600,
                                    overflowY: 'auto',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <MedalsInfo
                    medalValue={medalValue}
                    open={open}
                    setOpen={setOpen}
                    isEditing={isEditing}
                    setUserMedalData={setUserMedalData}
                    setMedalValue={setMedalValue}
                    setIsEditing={setIsEditing}
                    selectedMedalId={selectedMedalId}
                    userMedalData={userMedalData}
                />
            </div>
        </div>
    );
}

export default GetUserMedal;
