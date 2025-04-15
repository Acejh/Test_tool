import React from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';

// 스텝 컨텐츠 컴포넌트들
import Step1 from '@/steps/mui/muiStep1';
import Step2 from '@/steps/mui/muiStep2';
import Step3 from '@/steps/mui/muiStep3';
import Step4 from '@/steps/mui/muiStep4';
import Step5 from '@/steps/mui/muiStep5';

export default function MuiRepairT() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    'Disassembly Depth 분해수준',
    'Fasteners and Connectors 체결부품',
    'Tools 작업도구',
    'Spare parts 예비부품',
    'Repair Infomation',
  ];

  // 스텝 컨텐츠를 반환하는 함수
  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      default:
        return '알 수 없는 단계입니다.';
    }
  };

  // "다음"과 "이전" 버튼 핸들러
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '670px' }}>
      {/* MUI Stepper 스텝 인디케이터 */}
      <Box sx={{ flexShrink: 0, mb: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* 스텝 컨텐츠 영역 */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        {getStepContent(activeStep)}
      </Box>

      {/* 내비게이션 버튼 영역 (이전, 다음) */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
          이전
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? '완료' : '다음'}
        </Button>
      </Box>
    </Box>
  );
}
