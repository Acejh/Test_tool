import React from 'react';
import { Steps as AntSteps, Button as AntButton } from 'antd';
import 'antd/dist/reset.css';

// 스텝 컨텐츠 컴포넌트들
import Step1 from '@/steps/antd/antdStep1';
import Step2 from '@/steps/antd/antdStep2';
import Step3 from '@/steps/antd/antdStep3';
import Step4 from '@/steps/antd/antdStep4';
import Step5 from '@/steps/antd/antdStep5';

export default function AntdRepairT() {
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
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '670px' }}>
      {/* Ant Design Steps 인디케이터 */}
      <div style={{ marginBottom: '16px' }}>
        <AntSteps current={activeStep}>
          {steps.map((label, index) => (
            <AntSteps.Step key={index} title={label} />
          ))}
        </AntSteps>
      </div>

      {/* 스텝 컨텐츠 영역 */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px', border: '1px solid #e0e0e0' }}>
        {getStepContent(activeStep)}
      </div>

      {/* 내비게이션 버튼 영역 (이전, 다음) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <AntButton disabled={activeStep === 0} onClick={handleBack}>
          이전
        </AntButton>
        <AntButton onClick={handleNext}>
          {activeStep === steps.length - 1 ? '완료' : '다음'}
        </AntButton>
      </div>
    </div>
  );
}
