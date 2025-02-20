import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Grid, Card, CardContent, Alert, CircularProgress, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { validateToken } from "../utils/api";

const DetailVattu = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    DM_VatTu: "",
    MaVT: "",
    ChungLoai: "",
    ControlType: "",
    TuoiThoTB: "",
    GhiChu: "",
    Loai: "",
    Anh: "", // Thêm trường Anh vào formData
    TenHang: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await validateToken();
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.pmcweb.vn/api/v1/vattu/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Cập nhật formData với dữ liệu từ API
      setFormData({
        DM_VatTu: response.data.data.DM_VatTu || "",
        MaVT: response.data.data.MaVT || "",
        ChungLoai: response.data.data.ChungLoai || "",
        ControlType: response.data.data.ControlType || "",
        TuoiThoTB: response.data.data.TuoiThoTB || "",
        GhiChu: response.data.data.GhiChu || "",
        Loai: response.data.data.Loai || "",
        Anh: response.data.data.Anh || "", // Cập nhật trường Anh
        TenHang: response.data.data.TenHang || "",
      });

      // Nếu có ảnh, hiển thị ảnh
      if (response.data.data.Anh) {
        setImagePreview(`https://api.pmcweb.vn/upload/${response.data.data.Anh}`);
      }
      setLoading(false);
    } catch (error) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    // Xóa ảnh khỏi state và formData
    setImageFile(null);
    setImagePreview(null);

    // Đặt lại giá trị của input file
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.value = "";
    }

    // Cập nhật lại formData để không có ảnh nữa
    setFormData((prev) => ({
      ...prev,
      Anh: "", // Xóa trường ảnh trong formData
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (imageFile) {
      submitData.append("Anh", imageFile);
    }

    try {
      await axios.put(`https://api.pmcweb.vn/api/v1/vattu/update/${id}`, submitData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/vattu");
    } catch (err) {
      setError("Không thể cập nhật vật tư. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.DM_VatTu) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Chi Tiết Vật Tư
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleUpdate} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Danh mục vật tư"
                  value={formData.DM_VatTu}
                  onChange={handleInputChange("DM_VatTu")}
                  variant="outlined"
                  placeholder="Nhập danh mục vật tư"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mã vật tư"
                  value={formData.MaVT}
                  onChange={handleInputChange("MaVT")}
                  variant="outlined"
                  placeholder="Nhập mã vật tư"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Chủng loại"
                  value={formData.ChungLoai}
                  onChange={handleInputChange("ChungLoai")}
                  variant="outlined"
                  placeholder="Nhập chủng loại"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ControlType"
                  value={formData.ControlType}
                  onChange={handleInputChange("ControlType")}
                  variant="outlined"
                  placeholder="Nhập ControlType"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tuổi thọ trung bình"
                  value={formData.TuoiThoTB}
                  onChange={handleInputChange("TuoiThoTB")}
                  variant="outlined"
                  placeholder="Nhập tuổi thọ trung bình"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Loại"
                  value={formData.Loai}
                  onChange={handleInputChange("Loai")}
                  variant="outlined"
                  placeholder="Nhập loại"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hãng"
                  value={formData.TenHang}
                  onChange={handleInputChange("TenHang")}
                  variant="outlined"
                  placeholder="Nhập tên hãng"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ghi chú"
                  value={formData.GhiChu}
                  onChange={handleInputChange("GhiChu")}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Nhập ghi chú"
                />
              </Grid>

              <Grid item xs={12}>
                {user?.isAction == 1 && (
                  <>
                    <input accept="image/*" type="file" onChange={handleImageChange} style={{ display: "none" }} id="image-upload" />
                    <label htmlFor="image-upload">
                      <Button variant="outlined" component="span" fullWidth sx={{ height: 56 }}>
                        {imagePreview ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
                      </Button>
                    </label>
                  </>
                )}

                {imagePreview && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: 200, borderRadius: 8 }} />
                    {user?.isAction == 1 && (
                      <IconButton
                        onClick={handleDeleteImage}
                        sx={{
                          position: "absolute",
                          top: -12,
                          right: -12,
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                        }}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
              </Grid>

              {user?.isAction == 1 && (
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} sx={{ height: 56 }}>
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Đang xử lý...
                      </Box>
                    ) : (
                      "Cập nhật vật tư"
                    )}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailVattu;
