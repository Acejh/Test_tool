// src/page/Part.tsx
import React, { useState, useEffect } from 'react';
import EoL from "../data/part.json";
import MaterialG from "../data/material.json";
import Substance from "../data/substance.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Box,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

interface SavedData {
  part: {
    partName: string;
    partCode: string;
    managementCode: string;
    weight: string;
    isReusable: boolean;
    selectedScenario: string | null;
  };
  material: {
    materialGroup: string | null;
    materialName: string | null;
    materialWeight: string;
    isRecycled: boolean;
    recycledPercentage: string;
    recycledType: string;
  };
  substance: {
    substanceName: string | null;
    casNumber: string;
    substanceWeight: string;
  };
}

// 단계 배열 (부품 등록, 소재 등록, 물질 등록)
const steps = ['부품 등록', '소재 등록', '물질 등록'];

const Part: React.FC = () => {
  // 모달 및 Stepper 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // 부품 등록 폼 상태
  const [partName, setPartName] = useState("");
  const [partCode, setPartCode] = useState("");
  const [managementCode, setManagementCode] = useState("");
  const [weight, setWeight] = useState("");
  const [isReusable, setIsReusable] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // 소재 등록 폼 상태
  const [materialGroup, setMaterialGroup] = useState<string | null>(null);
  const [materialName, setMaterialName] = useState<string | null>(null);
  const [isRecycled, setIsRecycled] = useState(false);
  const [recycledPercentage, setRecycledPercentage] = useState("");
  const [recycledType, setRecycledType] = useState("");
  const [materialWeight, setMaterialWeight] = useState("");

  // 물질 등록 폼 상태
  const [substanceName, setSubstanceName] = useState<string | null>(null);
  const [substanceWeight, setSubstanceWeight] = useState("");

  // Alert/Snackbar 상태
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 테이블에 등록된 데이터를 저장할 상태 (여러 건)
  const [rows, setRows] = useState<SavedData[]>([]);

  // 상세보기 모달 상태
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SavedData | null>(null);

  // part.json의 "EoL Scenario" 옵션
  const eolScenarios: string[] = EoL["EoL Scenario"];

  const materialGroupData: Record<string, string[]> = MaterialG["Material Group"] || {};
  const materialGroups: string[] = Object.keys(materialGroupData);
  const materialNames: string[] = materialGroup && materialGroupData[materialGroup]
    ? materialGroupData[materialGroup]
    : [];

  const substanceData: Record<string, string[]> = Substance["Substance"] || {};
  const substanceNames: string[] = Object.keys(substanceData);

  // 컴포넌트가 마운트될 때 로컬스토리지에서 데이터를 읽어와 rows 상태에 설정
  useEffect(() => {
    const storedData = localStorage.getItem("PartInven");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed)) {
          setRows(parsed);
        }
      } catch (error) {
        console.error("로컬스토리지 데이터 파싱 오류", error);
      }
    }
  }, []);

  // 입력 폼 초기화 함수
  const resetForm = () => {
    setPartName("");
    setPartCode("");
    setManagementCode("");
    setWeight("");
    setIsReusable(false);
    setSelectedScenario(null);

    setMaterialGroup(null);
    setMaterialName(null);
    setIsRecycled(false);
    setRecycledPercentage("");
    setRecycledType("");
    setMaterialWeight("");

    setSubstanceName(null);
    setSubstanceWeight("");
  };

  // 모달 열기/닫기 및 단계 전환 핸들러
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setActiveStep(0);
    resetForm();
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // 각 단계의 필수 입력란 검증 (체크박스 제외)
  const isStepFailed = (step: number) => {
    if (step === 0) {
      return (
        partName.trim() === "" ||
        partCode.trim() === "" ||
        managementCode.trim() === "" ||
        weight.trim() === "" ||
        !selectedScenario
      );
    }
    if (step === 1) {
      const basicError =
        !materialGroup ||
        !materialName ||
        materialWeight.trim() === "";
      if (isRecycled) {
        return basicError ||
          recycledPercentage.trim() === "" ||
          recycledType.trim() === "";
      }
      return basicError;
    }
    if (step === 2) {
      return (
        !substanceName ||
        substanceWeight.trim() === ""
      );
    }
    return false;
  };

  // 각 단계가 완전히 입력되어 있으면 true 반환
  const isStepComplete = (step: number) => {
    if (step === 0) {
      return (
        partName.trim() !== "" &&
        partCode.trim() !== "" &&
        managementCode.trim() !== "" &&
        weight.trim() !== "" &&
        selectedScenario !== null
      );
    }
    if (step === 1) {
      const basicComplete =
        materialGroup !== null &&
        materialName !== null &&
        materialWeight.trim() !== "";
      if (isRecycled) {
        return basicComplete &&
          recycledPercentage.trim() !== "" &&
          recycledType.trim() !== "";
      }
      return basicComplete;
    }
    if (step === 2) {
      return substanceName !== null && substanceWeight.trim() !== "";
    }
    return false;
  };

  // 완료 버튼 클릭 시 전체 검증 후 로컬스토리지 저장 및 테이블 업데이트, 미입력 시 알림
  const handleFinish = () => {
    if (isStepFailed(0) || isStepFailed(1) || isStepFailed(2)) {
      setAlertMessage("미입력 데이터가 존재합니다.");
      setAlertOpen(true);
      return;
    }

    const partData = {
      partName,
      partCode,
      managementCode,
      weight,
      isReusable,
      selectedScenario
    };

    const materialDataCollected = {
      materialGroup,
      materialName,
      materialWeight,
      isRecycled,
      recycledPercentage,
      recycledType
    };

    const substanceDataCollected = {
      substanceName,
      // CAS 번호는 선택된 물질명의 배열 첫 번째 요소 사용
      casNumber: substanceName ? (substanceData[substanceName]?.[0] || "") : "",
      substanceWeight
    };

    const dataToSave = {
      part: partData,
      material: materialDataCollected,
      substance: substanceDataCollected
    };

    // 로컬스토리지에 저장 (기존 데이터가 있으면 배열에 추가)
    const prevData = localStorage.getItem("PartInven");
    let newDataArray = [];
    if (prevData) {
      try {
        newDataArray = JSON.parse(prevData);
        if (!Array.isArray(newDataArray)) {
          newDataArray = [];
        }
      } catch {
        newDataArray = [];
      }
    }
    newDataArray.push(dataToSave);
    localStorage.setItem("PartInven", JSON.stringify(newDataArray));

    // 테이블에 표시할 데이터 업데이트
    setRows(prev => [...prev, dataToSave]);

    handleModalClose();
  };

  return (
    <div>
      {/* 테이블 상단 우측에 데이터 등록 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <Button variant="contained" onClick={handleModalOpen}>
          데이터 등록
        </Button>
      </div>

      {/* 등록된 데이터를 보여주는 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#c4c4c4' }}>
            <TableRow>
              <TableCell>부품명</TableCell>
              <TableCell>포함 정보</TableCell>
              <TableCell>도구</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0
              ? rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.part.partName}</TableCell>
                    <TableCell>
                      <Button onClick={() => { setSelectedRecord(row); setDetailModalOpen(true); }}>
                        자세히보기
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button>
                        수정
                      </Button>
                      <Button>
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 등록 모달 (Stepper를 통한 데이터 입력) */}
      <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          데이터 등록
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              if (isStepComplete(index)) {
                stepProps.completed = true;
              }
              const labelProps: { optional?: React.ReactNode; error?: boolean } = {};
              if (isStepFailed(index)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    데이터 입력 필요
                  </Typography>
                );
                labelProps.error = true;
              } else if (isStepComplete(index)) {
                labelProps.optional = <CheckIcon />;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box sx={{ mt: 4, mb: 2 }}>
            {activeStep === 0 ? (
              // 부품 등록 단계
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <TextField
                      label="부품 명"
                      variant="outlined"
                      value={partName}
                      onChange={e => setPartName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="부품 코드"
                      variant="outlined"
                      value={partCode}
                      onChange={e => setPartCode(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="관리 코드"
                      variant="outlined"
                      value={managementCode}
                      onChange={e => setManagementCode(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="무게"
                      variant="outlined"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <Autocomplete
                      options={eolScenarios}
                      value={selectedScenario}
                      onChange={(_event, newValue) => setSelectedScenario(newValue)}
                      renderInput={params => <TextField {...params} label="EoL 시나리오" variant="outlined" />}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isReusable}
                          onChange={e => setIsReusable(e.target.checked)}
                        />
                      }
                      label="재사용 부품"
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : activeStep === 1 ? (
              // 소재 등록 단계
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Autocomplete
                      options={materialGroups}
                      value={materialGroup}
                      onChange={(_event, newValue) => { setMaterialGroup(newValue); setMaterialName(null); }}
                      renderInput={params => <TextField {...params} label="소재 그룹" variant="outlined" />}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <Autocomplete
                      options={materialNames}
                      value={materialName}
                      onChange={(_event, newValue) => setMaterialName(newValue)}
                      renderInput={params => <TextField {...params} label="소재 이름" variant="outlined" />}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="소재 중량"
                      variant="outlined"
                      value={materialWeight}
                      onChange={e => setMaterialWeight(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isRecycled}
                          onChange={e => setIsRecycled(e.target.checked)}
                        />
                      }
                      label="재활용재질함량 여부"
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="재활용재질함량 비율"
                      variant="outlined"
                      value={recycledPercentage}
                      onChange={e => setRecycledPercentage(e.target.value)}
                      fullWidth
                      disabled={!isRecycled}
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="재활용 타입"
                      variant="outlined"
                      select
                      value={recycledType}
                      onChange={e => setRecycledType(e.target.value)}
                      fullWidth
                      disabled={!isRecycled}
                      SelectProps={{ native: true }}
                    >
                      <option value=""></option>
                      <option value="Pre Consumer">Pre Consumer</option>
                      <option value="Post Consumer">Post Consumer</option>
                      <option value="Unspecified">Unspecified</option>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            ) : activeStep === 2 ? (
              // 물질 등록 단계
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Autocomplete
                      options={substanceNames}
                      value={substanceName}
                      onChange={(_event, newValue) => setSubstanceName(newValue)}
                      renderInput={params => <TextField {...params} label="물질 명" variant="outlined" />}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="CAS 번호"
                      variant="outlined"
                      value={substanceName ? (substanceData[substanceName]?.[0] || "") : ""}
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      label="물질 중량"
                      variant="outlined"
                      value={substanceWeight}
                      onChange={e => setSubstanceWeight(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          {activeStep > 0 && <Button onClick={handleBack}>이전</Button>}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext}>다음</Button>
          ) : (
            <Button onClick={handleFinish}>완료</Button>
          )}
        </DialogActions>
      </Dialog>

      {/* 상세보기 모달 */}
      <Dialog open={detailModalOpen} onClose={() => setDetailModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>등록 데이터 상세보기</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">부품 등록 정보</Typography>
          <Typography>부품 명: {selectedRecord?.part?.partName}</Typography>
          <Typography>부품 코드: {selectedRecord?.part?.partCode}</Typography>
          <Typography>관리 코드: {selectedRecord?.part?.managementCode}</Typography>
          <Typography>무게: {selectedRecord?.part?.weight}</Typography>
          <Typography>재사용 가능 여부: {selectedRecord?.part?.isReusable ? "Yes" : "No"}</Typography>
          <Typography>EoL 시나리오: {selectedRecord?.part?.selectedScenario}</Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>소재 등록 정보</Typography>
          <Typography>소재 그룹: {selectedRecord?.material?.materialGroup}</Typography>
          <Typography>소재 이름: {selectedRecord?.material?.materialName}</Typography>
          <Typography>소재 중량: {selectedRecord?.material?.materialWeight}</Typography>
          <Typography>재활용재질 포함 여부: {selectedRecord?.material?.isRecycled ? "Yes" : "No"}</Typography>
          {selectedRecord?.material?.isRecycled && (
            <>
              <Typography>재활용재질 함량 비율: {selectedRecord?.material?.recycledPercentage}</Typography>
              <Typography>재활용 타입: {selectedRecord?.material?.recycledType}</Typography>
            </>
          )}

          <Typography variant="subtitle1" sx={{ mt: 2 }}>물질 등록 정보</Typography>
          <Typography>물질 명: {selectedRecord?.substance?.substanceName}</Typography>
          <Typography>CAS 번호: {selectedRecord?.substance?.casNumber}</Typography>
          <Typography>물질 중량: {selectedRecord?.substance?.substanceWeight}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailModalOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar/Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Part;
