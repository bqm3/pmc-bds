import React, { useState } from 'react';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    DM_VatTu: "",
    MaVT: "",
    ChungLoai: "",
    ControlType: "",
    TuoiThoTB: "",
    GhiChu: "",
    Loai: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
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
    setImageFile(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (imageFile) {
      submitData.append("Anh", imageFile);
    }

    try {
      const response = await axios.post("https://api.pmcweb.vn/api/v1/vattu/create", submitData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });

      console.log("response",response)
  
      if (response.status == 200) {
        navigate("/vattu");
      } else {
        alert(response.data.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      alert("Không thể tạo vật tư. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Tạo Mới Vật Tư
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
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
                  label="Loại điều khiển"
                  value={formData.ControlType}
                  onChange={handleInputChange("ControlType")}
                  variant="outlined"
                  placeholder="Nhập loại điều khiển"
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
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ height: 56 }}
                  >
                    Chọn hình ảnh
                  </Button>
                </label>
                {imagePreview && (
                  <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: 200, borderRadius: 8 }}
                    />
                    <IconButton
                      onClick={handleDeleteImage}
                      sx={{
                        position: 'absolute',
                        top: -12,
                        right: -12,
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        },
                        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                      }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ height: 56 }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Đang xử lý...
                    </Box>
                  ) : (
                    'Tạo mới vật tư'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Add;