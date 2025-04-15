import React from 'react';
import { Steps as RsuiteSteps } from 'rsuite';
import { Button as RsuiteButton } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

// 스텝 컨텐츠 컴포넌트들
import Step1 from '@/steps/resuite/resuiteStep1';
import Step2 from '@/steps/resuite/resuiteStep2';
import Step3 from '@/steps/resuite/resuiteStep3';
import Step4 from '@/steps/resuite/resuiteStep4';
import Step5 from '@/steps/resuite/resuiteStep5';

export default function RsuiteRepairT() {
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

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '670px' }}>
      {/* RSuite Steps 인디케이터 */}
      <div style={{ marginBottom: '16px' }}>
        <RsuiteSteps current={activeStep}>
          {steps.map((label, index) => (
            <RsuiteSteps.Item style={{textAlign:'left'}} key={index} title={label} />
          ))}
        </RsuiteSteps>
      </div>

      {/* 스텝 컨텐츠 영역 */}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
          border: '1px solid #e0e0e0',
        }}
      >
        {getStepContent(activeStep)}
      </div>

      {/* 내비게이션 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <RsuiteButton onClick={handleBack} disabled={activeStep === 0}>
          이전
        </RsuiteButton>
        <RsuiteButton onClick={handleNext}>
          {activeStep === steps.length - 1 ? '완료' : '다음'}
        </RsuiteButton>
      </div>
    </div>
  );
}
