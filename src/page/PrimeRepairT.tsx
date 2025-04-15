import React from 'react';
import { Steps as PrimeSteps } from 'primereact/steps';
import { Button as PrimeButton } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './custom-dark.css'; // 커스텀 CSS import

// 스텝 컨텐츠 컴포넌트들
import Step1 from '@/steps/primereact/primeStep1';
import Step2 from '@/steps/primereact/primeStep2';
import Step3 from '@/steps/primereact/primeStep3';
import Step4 from '@/steps/primereact/primeStep4';
import Step5 from '@/steps/primereact/primeStep5';

export default function PrimeRepairT() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    'Disassembly Depth 분해수준',
    'Fasteners and Connectors 체결부품',
    'Tools 작업도구',
    'Spare parts 예비부품',
    'Repair Infomation',
  ];

  const primeStepsModel = steps.map((label) => ({ label }));

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
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    // 다크 모드가 적용된 최상위 컨테이너에 .dark-theme 클래스 추가
    <div className="dark-theme" style={{ display: 'flex', flexDirection: 'column', height: '670px' }}>
      <div style={{ marginBottom: '16px' }}>
        <PrimeSteps model={primeStepsModel} activeIndex={activeStep} />
      </div>

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

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <PrimeButton onClick={handleBack} disabled={activeStep === 0} label="이전" />
        <PrimeButton onClick={handleNext} label={activeStep === steps.length - 1 ? '완료' : '다음'} />
      </div>
    </div>
  );
}
