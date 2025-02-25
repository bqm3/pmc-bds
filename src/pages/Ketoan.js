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
import { validateToken } from "../utils/api";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await validateToken();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.pmcweb.vn/api/v1/ketoan/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Vui lòng chọn tệp để tải lên.");
      return;
    }

    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("files", file);
    try {
      const response = await axios.post("https://api.pmcweb.vn/api/v1/ketoan/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setOpen(false);
      setFile(null);
      fetchData(); // Làm mới dữ liệu sau khi upload
      alert("Tải tệp lên thành công");
    } catch (error) {
      // Kiểm tra lỗi từ phản hồi server
      if (error.response) {
        // Lỗi từ server (như 400, 500)
        const errorMessage = error.response.data.message || "Lỗi không xác định từ server";
        alert(`Lỗi khi tải tệp lên: ${errorMessage}`);
      } else if (error.request) {
        // Lỗi không nhận được phản hồi (network error)
        alert("Lỗi khi tải tệp lên: Không thể kết nối đến server");
      } else {
        // Lỗi khác (cấu hình axios, v.v.)
        alert(`Lỗi khi tải tệp lên: ${error.message}`);
      }
    } finally {
      setIsUploadLoading(false);
    }
  };

  const columns = [
    { field: "ID", headerName: "ID", width: 80 }, // Giả sử có trường id
    { field: "Ten_du_an", headerName: "Tên dự án", width: 150 },
    { field: "vitri", headerName: "Vị trí", width: 150 },
    { field: "canho", headerName: "Căn hộ", width: 120 },
    { field: "ngaybangiao", headerName: "Ngày bàn giao", width: 150 },
    { field: "chuho", headerName: "Chủ hộ", width: 150 },
    { field: "dientich", headerName: "Diện tích", width: 100 },
    { field: "phidvphainop", headerName: "Phí DV phải nộp", width: 150 },
    { field: "phidvdathu", headerName: "Phí DV đã thu", width: 150 },
    { field: "phidvphaithu", headerName: "Phí DV còn phải thu", width: 150 },
    { field: "SLoto", headerName: "Số lượng ô tô", width: 120 },
    { field: "phioto", headerName: "Phí ô tô", width: 120 },
    { field: "phiotodathu", headerName: "Phí ô tô đã thu", width: 150 },
    { field: "phiotophaithu", headerName: "Phí ô tô còn phải thu", width: 150 },
    { field: "SLxemay", headerName: "Số lượng xe máy", width: 120 },
    { field: "phixemay", headerName: "Phí xe máy", width: 120 },
    { field: "phixmdathu", headerName: "Phí xe máy đã thu", width: 150 },
    { field: "phixmphaithu", headerName: "Phí xe máy còn phải thu", width: 150 },
    { field: "SLxedien", headerName: "Số lượng xe điện", width: 120 },
    { field: "phixedien", headerName: "Phí xe điện", width: 120 },
    { field: "phixddathu", headerName: "Phí xe điện đã thu", width: 150 },
    { field: "phixdphaithu", headerName: "Phí xe điện còn phải thu", width: 150 },
    { field: "SLxedap", headerName: "Số lượng xe đạp", width: 120 },
    { field: "phixedap", headerName: "Phí xe đạp", width: 120 },
    { field: "phixedapdathu", headerName: "Phí xe đạp đã thu", width: 150 },
    { field: "phixedapphaithu", headerName: "Phí xe đạp còn phải thu", width: 150 },
    { field: "tongphaithu_thang", headerName: "Tổng phải thu tháng", width: 150 },
    { field: "nocu", headerName: "Nợ cũ", width: 120 },
    { field: "tongdathu_thang", headerName: "Tổng đã thu tháng", width: 150 },
    { field: "tongconphaithu_thang", headerName: "Tổng còn phải thu tháng", width: 150 },
    { field: "thoigian_no", headerName: "Thời gian nợ", width: 150 },
    { field: "lydo_no", headerName: "Lý do nợ", width: 150 },
    { field: "dieuchinh_nocu", headerName: "Điều chỉnh nợ cũ", width: 150 },
    { field: "lydo_dieuchinh", headerName: "Lý do điều chỉnh", width: 150 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "thang", headerName: "Tháng", width: 100 },
    { field: "nam", headerName: "Năm", width: 100 },
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
          PMC Phí dịch vụ
        </Typography>

        <Box sx={{ mb: 2 }}>
          {user?.isAction === 1 && (
            <>
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
            </>
          )}
          <Button variant="contained" color="error" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: 700, width: "100%", mt: 1 }}>
        <DataGrid rows={data} columns={columns} pagination={false} getRowId={(row) => row.ID} />
      </Box>

      {/* Upload File Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
          {file && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Tệp đang chọn: {file.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpload} color="primary" disabled={!file || isUploadLoading}>
            {isUploadLoading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
