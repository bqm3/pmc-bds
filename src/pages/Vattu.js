import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const fetchData = async (search = "") => {
    try {
      const response = await axios.get(
        `https://api.pmcweb.vn/api/v1/vattu/search`,
        {
          params: {
            search,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setData(response.data.data); // Dữ liệu từ API
      setTotalRows(response.data.totalCount); // Hoặc tương tự từ phản hồi API nếu có
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleRowClick = async (params) => {
    const id = params.row.ID_VatTu; // Lấy ID của hàng đã nhấn
    navigate(`/detail-vattu/${id}`);
  };

  useEffect(() => {
    fetchData(searchTerm); // Gọi API với searchTerm
  }, [searchTerm]); // Gọi lại khi page hoặc pageSize thay đổi

  const handleSearch = () => {
    setPage(0); // Reset trang khi tìm kiếm
    fetchData(searchTerm);
  };

  const columns = [
    { field: "ID_VatTu", headerName: "ID", width: 80 },
    { field: "DM_VatTu", headerName: "Danh mục vật tư", width: 200 },
    {
      field: "Anh",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <img
            src={`https://api.pmcweb.vn/upload/${params.value}`} // Đường dẫn đầy đủ đến ảnh
            alt="Ảnh"
            style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
          />
        ) : (
          <span>Không có ảnh</span> // Hiển thị khi không có ảnh
        )
      ),
    },
    { field: "MaVT", headerName: "Mã vật tư", width: 150 },
    { field: "ChungLoai", headerName: "Chủng loại", width: 150 },
    { field: "ControlType", headerName: "Control Type", width: 100 },
    { field: "TuoiThoTB", headerName: "Tuổi thọ trung bình", width: 150 },
    { field: "GhiChu", headerName: "Ghi chú", width: 250 },
    { field: "Loai", headerName: "Loại", width: 150 },
  ];

  return (
    <Container maxWidth="lg">
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
            onClick={()=>navigate(`/newVattu`)} // Chuyển đến trang chi tiết}
            sx={{ mr: 2 }} // Thêm margin trái để cách xa TextField
          >
            Thêm mới
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
        <Button
          variant="contained"
          color="primary"
          style={{ width: "120px", height: "100%" }}
          onClick={handleSearch}
          sx={{ ml: 2 }} // Thêm margin trái để cách xa TextField
        >
          Tìm kiếm
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%", mt: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination={false} // Tắt phân trang
          onRowClick={handleRowClick} // Gọi hàm khi nhấn vào hàng
          getRowId={(row) => row.ID_VatTu}
        />
      </Box>
    </Container>
  );
};

export default Home;
