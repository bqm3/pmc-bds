import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const fetchData = async (search = "") => {
    try {
      const response = await axios.get(
        `https://api.pmcweb.vn/api/v1/bds/search`,
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
    const id = params.row.ID_Bds; // Lấy ID của hàng đã nhấn
    try {
      const response = await axios.get(
        `https://api.pmcweb.vn/api/v1/bds/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ); // Gọi API để lấy dữ liệu chi tiết
      const detailData = response.data; // Lưu trữ dữ liệu chi tiết
      // Chuyển đến một trang chi tiết hoặc mở modal để hiển thị dữ liệu
      navigate(`/detail/${id}`); // Chuyển đến trang chi tiết
    } catch (error) {
      console.error("Failed to fetch detail data:", error);
    }
  };

  useEffect(() => {
    fetchData(searchTerm); // Gọi API với searchTerm
  }, [searchTerm]); // Gọi lại khi page hoặc pageSize thay đổi

  const handleSearch = () => {
    setPage(0); // Reset trang khi tìm kiếm
    fetchData(searchTerm);
  };

  const columns = [
    { field: "ID_Bds", headerName: "ID", width: 30 },
    { field: "Project", headerName: "Tên dự án", width: 300 },
    { field: "Developer", headerName: "Chủ đầu tư", width: 300 },
    { field: "Type", headerName: "Loại hình", width: 150 },
    { field: "Address", headerName: "Địa chỉ", width: 250 },
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
          PMC Bất động sản
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "120px", height: "100%" }}
            onClick={()=>navigate(`/new`)} // Chuyển đến trang chi tiết}
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
          label="Tìm kiếm theo Tên dự án, Chủ đầu tư hoặc Địa chỉ"
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
          getRowId={(row) => row.ID_Bds}
        />
      </Box>
    </Container>
  );
};

export default Home;
