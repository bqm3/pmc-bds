import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleRowClick = (params) => {
    const id = params.row.ID_VatTu;
    navigate(`/detail-vattu/${id}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(searchTerm);
    }, 300); // 500ms là thời gian debounce

    return () => clearTimeout(timeoutId); // Xóa timeout nếu searchTerm thay đổi trước khi hết thời gian debounce
  }, [searchTerm]);

  const openDeleteDialog = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const fetchData = async (search = "") => {
    try {
      const response = await axios.get(
        `https://api.pmcweb.vn/api/v1/vattu/search`,
        {
          params: { search },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("files", file);
    try {
      const response = await axios.post(
        "https://api.pmcweb.vn/api/v1/vattu/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      setOpen(false);
      setFile(null);
      fetchData(); // Refresh data after upload
      alert(`Upload file thành công`);
    } catch (error) {
      alert(`Error uploading file:", ${error}`);
    } finally {
      setIsUploadLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleteLoading(true);
    try {
      await axios.put(`https://api.pmcweb.vn/api/v1/vattu/delete/${id}`, [], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(data.filter((item) => item.ID_VatTu !== id));
      closeDeleteDialog();
      alert(`Xóa thành công`);
    } catch (error) {
      alert(`Error deleting item:", ${error}`);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const columns = [
    { field: "ID_VatTu", headerName: "ID", width: 80 },
    { field: "DM_VatTu", headerName: "Danh mục vật tư", width: 200 },
    {
      field: "Anh",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <img
            src={`https://api.pmcweb.vn/upload/${params.value}`}
            alt="Ảnh"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100px",
              objectFit: "cover",
            }}
          />
        ) : (
          <span>Không có ảnh</span>
        ),
    },
    { field: "MaVT", headerName: "Mã vật tư", width: 150 },
    { field: "ChungLoai", headerName: "Chủng loại", width: 150 },
    { field: "ControlType", headerName: "Control Type", width: 100 },
    { field: "TuoiThoTB", headerName: "Tuổi thọ trung bình", width: 150 },
    { field: "GhiChu", headerName: "Ghi chú", width: 250 },
    { field: "Loai", headerName: "Loại", width: 150 },
    {
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            openDeleteDialog(params.row.ID_VatTu);
          }}
          color="error"
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          PMC Vật tư
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "120px", height: "100%" }}
            onClick={() => navigate(`/newVattu`)}
            sx={{ mr: 2 }}
          >
            Thêm mới
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "150px", height: "100%" }}
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
            disabled={isUploadLoading}
          >
            {isUploadLoading ? <CircularProgress size={24} /> : "Upload File"}
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <TextField
          label="Tìm kiếm theo Danh mục, Mã vật tư, Chủng loại, Control Type, Tuổi thọ trung bình hoặc Loại"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ height: 700, width: "100%", mt: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination={false}
          onRowClick={handleRowClick}
          getRowId={(row) => row.ID_VatTu}
        />
      </Box>

      {/* Upload File Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
          {file && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              File đang chọn: {file.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpload}
            color="primary"
            disabled={!file || isUploadLoading}
          >
            {isUploadLoading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa mục này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDelete(itemToDelete)}
            color="primary"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? <CircularProgress size={24} /> : "Xóa"}
          </Button>
          <Button onClick={() => closeDeleteDialog()} color="secondary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
