
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { GetAdmin } from '../../services/AdminService';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from '../../features/Admin/AdminSlice';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import AddAdmin from './AddAdmin';
import AddIcon from "@mui/icons-material/Add";


function GetAdmins() {
    const [loading, setloading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalCount, setTotalCount] = useState(0);
    const [isAdminData, setIsAdminData] = useState([]);

    const [adminValue, setAdminValue] = useState();
    const [editing, setIsEditing] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState();
    const [open, setOpen] = useState(false)


    const dispatch = useDispatch();
    const { admins, pagination: serverPagination } = useSelector((state) => state.admin.adminData);

    useEffect(() => {
        admin();
    }, [pagination.page, pagination.pageSize]);

    const admin = async () => {
        setloading(true);
        try {
            const response = await GetAdmin({
                page: pagination.page + 1,
                pageSize: pagination.pageSize,
            });
            dispatch(setAdminData(response.data));
            setTotalCount(response.data.pagination.totalItems);
            console.log("Admin Data:", response.data);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setloading(false);
        }
    };
    const rows = admins?.map((admin) => ({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 200, headerClassName: "column-header", cellClassName: "column-cell" },
        { field: 'username', headerName: 'Username', width: 200, headerClassName: "column-header", cellClassName: "column-cell" },
        { field: 'email', headerName: 'Email', width: 200, headerClassName: "column-header", cellClassName: "column-cell" },
        { field: 'role', headerName: 'Role', width: 200, headerClassName: "column-header", cellClassName: "column-cell" },
        { field: 'createdAt', headerName: 'Created At', width: 200, headerClassName: "column-header", cellClassName: "column-cell" },
    ];

    return (
        <div>
            <div className="bg-[#1a2c38] flex flex-col">
                <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mx-auto">
                    <AdminPanelSettingsIcon size={25} className="text-white text-3xl" />
                    <p className="text-2xl pr-10 py-3">Admin</p>
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
                                setAdminValue({});
                            }}
                        >
                            <AddIcon />
                            <p>Add Admin</p>
                        </button>
                    </div>

                </div>
                <div className="justify-center pt-4 p-10px xl:h-[300px] xl:w-[1000px]">
                    <div style={{ height: 600, width: '100%' }}>
                        <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">Admin Detail</p>
                        <DataGrid
                            autoHeight
                            rows={rows || []}
                            columns={columns}
                            loading={loading}
                            rowCount={totalCount}
                            paginationModel={pagination}
                            paginationMode="server"
                            onPaginationModelChange={(newPagination) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    page: newPagination.page,
                                    pageSize: newPagination.pageSize,
                                }))
                            }
                            pageSizeOptions={[10, 20]}
                            sx={{
                                border: 'none',
                                color: '#b1bad3',
                                '& .MuiDataGrid-cell': { border: 'none' },
                                '& .MuiDataGrid-columnHeader': { borderBottom: 'none' },
                                '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
                                height: 600,
                                overflowY: 'auto',
                            }}
                        />
                    </div>

                </div>
                <AddAdmin
                    adminValue={adminValue}
                    open={open}
                    setOpen={setOpen}
                    isEditing={editing}
                    setAdminData={setAdminData}
                    setAdminValue={setAdminValue}
                    setIsEditing={setIsEditing}
                    selectedMedalId={selectedAdminId}
                    adminData={setAdminData}
                />
            </div>
        </div>
    );
}

export default GetAdmins;
