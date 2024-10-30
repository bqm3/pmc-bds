import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";
import axios from "axios";

const Detail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Trạng thái các trường để chỉnh sửa
  const [project, setProject] = useState("");
  const [developer, setDeveloper] = useState("");
  const [type, setType] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [address, setAddress] = useState("");
  const [commune, setCommune] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [price, setPrice] = useState("");
  const [landArea, setLandArea] = useState("");
  const [noOfArea, setNoOfArea] = useState("");
  const [noOfTowers, setNoOfTowers] = useState("");
  const [grade, setGrade] = useState("");
  const [noOfStories, setNoOfStories] = useState("");
  const [noOfBasements, setNoOfBasements] = useState("");
  const [constructionArea, setConstructionArea] = useState("");
  const [gfa, setGFA] = useState("");
  const [totalBasementArea, setTotalBasementArea] = useState("");
  const [nfa, setNFA] = useState("");
  const [officeArea, setOfficeArea] = useState("");
  const [retailArea, setRetailArea] = useState("");
  const [aptArea, setAptArea] = useState("");
  const [chudautu, setChudautu] = useState("");
  const [banquantri, setBanquantri] = useState("");
  const [thongtinlienhe, setThongtinlienhe] = useState("");
  const [tiendotiepcankhachhang, setTiendotiepcankhachhang] = useState("");
  const [constructionCompany, setConstructionCompany] = useState("");
  const [architectureFirm, setArchitectureFirm] = useState("");
  const [managementCompany, setManagementCompany] = useState("");
  const [buildingComitee, setBuildingComitee] = useState("");
  const [ghichu, setGhichu] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.pmcweb.vn/api/v1/bds/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data.data);

      // Đặt các giá trị cho các trường
      setProject(response.data.data.Project);
      setDeveloper(response.data.data.Developer);
      setType(response.data.data.Type);
      setCurrentStatus(response.data.data.CurrentStatus);
      setAddress(response.data.data.Address);
      setCommune(response.data.data.Commune);
      setDistrict(response.data.data.District);
      setProvince(response.data.data.Province);
      setPrice(response.data.data.Price);
      setLandArea(response.data.data.LandArea);
      setNoOfArea(response.data.data.NoOfArea);
      setNoOfTowers(response.data.data.NoOfTowers);
      setGrade(response.data.data.Grade);
      setNoOfStories(response.data.data.NoOfStories);
      setNoOfBasements(response.data.data.NoOfBasements);
      setConstructionArea(response.data.data.ConstructionArea);
      setGFA(response.data.data.GFA);
      setTotalBasementArea(response.data.data.TotalBasementArea);
      setNFA(response.data.data.NFA);
      setOfficeArea(response.data.data.OfficeArea);
      setRetailArea(response.data.data.RetailArea);
      setAptArea(response.data.data.AptArea);
      setChudautu(response.data.data.Chudautu);
      setBanquantri(response.data.data.Banquantri);
      setThongtinlienhe(response.data.data.Thongtinlienhe);
      setTiendotiepcankhachhang(response.data.data.Tiendotiepcankhachhang);
      setConstructionCompany(response.data.data.ConstructionCompany);
      setArchitectureFirm(response.data.data.ArchitectureFirm);
      setManagementCompany(response.data.data.ManagementCompany);
      setBuildingComitee(response.data.data.BuildingComitee);
      setGhichu(response.data.data.Ghichu);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://api.pmcweb.vn/api/v1/bds/update/${id}`, {
        Project: project,
        Developer: developer,
        Type: type,
        CurrentStatus: currentStatus,
        Address: address,
        Commune: commune,
        District: district,
        Province: province,
        Price: price,
        LandArea: landArea,
        NoOfArea: noOfArea,
        NoOfTowers: noOfTowers,
        Grade: grade,
        NoOfStories: noOfStories,
        NoOfBasements: noOfBasements,
        ConstructionArea: constructionArea,
        GFA: gfa,
        TotalBasementArea: totalBasementArea,
        NFA: nfa,
        OfficeArea: officeArea,
        RetailArea: retailArea,
        AptArea: aptArea,
        Chudautu: chudautu,
        Banquantri: banquantri,
        Thongtinlienhe: thongtinlienhe,
        Tiendotiepcankhachhang: tiendotiepcankhachhang,
        ConstructionCompany: constructionCompany,
        ArchitectureFirm: architectureFirm,
        ManagementCompany: managementCompany,
        BuildingComitee: buildingComitee,
        Ghichu: ghichu,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/home"); // Quay lại trang chính sau khi cập nhật
    } catch (error) {
      setError("Failed to update data");
    }
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Chi tiết Dự án
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tên dự án"
              variant="outlined"
              fullWidth
              margin="normal"
              value={project}
              onChange={handleChange(setProject)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Chủ đầu tư"
              variant="outlined"
              fullWidth
              margin="normal"
              value={developer}
              onChange={handleChange(setDeveloper)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Loại hình"
              variant="outlined"
              fullWidth
              margin="normal"
              value={type}
              onChange={handleChange(setType)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Trạng thái hiện tại"
              variant="outlined"
              fullWidth
              margin="normal"
              value={currentStatus}
              onChange={handleChange(setCurrentStatus)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={handleChange(setAddress)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Xã"
              variant="outlined"
              fullWidth
              margin="normal"
              value={commune}
              onChange={handleChange(setCommune)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quận/Huyện"
              variant="outlined"
              fullWidth
              margin="normal"
              value={district}
              onChange={handleChange(setDistrict)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tỉnh/Thành phố"
              variant="outlined"
              fullWidth
              margin="normal"
              value={province}
              onChange={handleChange(setProvince)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Giá"
              variant="outlined"
              fullWidth
              margin="normal"
              value={price}
              onChange={handleChange(setPrice)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích đất"
              variant="outlined"
              fullWidth
              margin="normal"
              value={landArea}
              onChange={handleChange(setLandArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số lượng khu vực"
              variant="outlined"
              fullWidth
              margin="normal"
              value={noOfArea}
              onChange={handleChange(setNoOfArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số tháp"
              variant="outlined"
              fullWidth
              margin="normal"
              value={noOfTowers}
              onChange={handleChange(setNoOfTowers)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hạng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={grade}
              onChange={handleChange(setGrade)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số tầng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={noOfStories}
              onChange={handleChange(setNoOfStories)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số tầng hầm"
              variant="outlined"
              fullWidth
              margin="normal"
              value={noOfBasements}
              onChange={handleChange(setNoOfBasements)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích xây dựng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={constructionArea}
              onChange={handleChange(setConstructionArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích GFA"
              variant="outlined"
              fullWidth
              margin="normal"
              value={gfa}
              onChange={handleChange(setGFA)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích tầng hầm tổng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={totalBasementArea}
              onChange={handleChange(setTotalBasementArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích NFA"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nfa}
              onChange={handleChange(setNFA)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích văn phòng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={officeArea}
              onChange={handleChange(setOfficeArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích bán lẻ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={retailArea}
              onChange={handleChange(setRetailArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Diện tích căn hộ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={aptArea}
              onChange={handleChange(setAptArea)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Chủ đầu tư"
              variant="outlined"
              fullWidth
              margin="normal"
              value={chudautu}
              onChange={handleChange(setChudautu)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ban quản trị"
              variant="outlined"
              fullWidth
              margin="normal"
              value={banquantri}
              onChange={handleChange(setBanquantri)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Thông tin liên hệ"
              variant="outlined"
              fullWidth
              margin="normal"
              value={thongtinlienhe}
              onChange={handleChange(setThongtinlienhe)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tiến độ tiếp cận khách hàng"
              variant="outlined"
              fullWidth
              margin="normal"
              value={tiendotiepcankhachhang}
              onChange={handleChange(setTiendotiepcankhachhang)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Công ty thi công"
              variant="outlined"
              fullWidth
              margin="normal"
              value={constructionCompany}
              onChange={handleChange(setConstructionCompany)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Công ty thiết kế"
              variant="outlined"
              fullWidth
              margin="normal"
              value={architectureFirm}
              onChange={handleChange(setArchitectureFirm)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Công ty quản lý"
              variant="outlined"
              fullWidth
              margin="normal"
              value={managementCompany}
              onChange={handleChange(setManagementCompany)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ban quản lý"
              variant="outlined"
              fullWidth
              margin="normal"
              value={buildingComitee}
              onChange={handleChange(setBuildingComitee)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ghi chú"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={ghichu}
              onChange={handleChange(setGhichu)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Detail;
