import React from 'react';
import { Steps as PrimeSteps } from 'primereact/steps';
import { Button as PrimeButton } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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

  // PrimeReact에서는 model 배열이 필요 (각 항목에 label 프로퍼티 설정)
  const primeStepsModel = steps.map((label) => ({ label }));

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
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '670px' }}>
      {/* PrimeReact Steps 인디케이터 */}
      <div style={{ marginBottom: '16px' }}>
        <PrimeSteps model={primeStepsModel} activeIndex={activeStep} />
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
        <PrimeButton style={{color:'white'}} onClick={handleBack} disabled={activeStep === 0} label="이전" />
        <PrimeButton style={{color:'white'}} onClick={handleNext} label={activeStep === steps.length - 1 ? '완료' : '다음'} />
      </div>
    </div>
  );
}
