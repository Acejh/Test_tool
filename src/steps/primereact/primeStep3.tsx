import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

// 평가 기준(도구) 데이터 타입 정의
interface ToolsCriteria {
  key: string;
  grade: string;
  criteriaEn: string;
  criteriaKo: string;
  example: string;
  score: number;
}

// 평가 대상(도구 수행 항목) 데이터 타입 정의
interface EvaluationToolItem {
  key: string;
  item: string;
  weight: number;
  result: number;
}

// 드롭다운 옵션 타입 정의
interface DropdownOption {
  label: string;
  value: string;
}

// 드롭다운 선택 상태 타입 정의
interface Selections {
  [key: string]: string;
}

const PrimeStep3: React.FC = () => {
  // Tools 평가 기준 데이터
  const criteriaData: ToolsCriteria[] = [
    {
      key: '1',
      grade: 'A',
      criteriaEn: 'No tools',
      criteriaKo: '도구 없이 분해 수행',
      example: '-',
      score: 5,
    },
    {
      key: '2',
      grade: 'B',
      criteriaEn: 'Basic tools',
      criteriaKo: '기본 장비로 분해 수행',
      example: '-',
      score: 4,
    },
    {
      key: '3',
      grade: 'C',
      criteriaEn: 'Tools that is supplied with the spare',
      criteriaKo: '부품에 포함된 도구로 분해 수행',
      example: '-',
      score: 3,
    },
    {
      key: '4',
      grade: 'D',
      criteriaEn: 'Tools that is supplied with the product',
      criteriaKo: '제품 구성품에 포함된 도구로 분해 수행',
      example: '-',
      score: 2,
    },
    {
      key: '5',
      grade: 'E',
      criteriaEn: 'Commercially available tools',
      criteriaKo: '시중에서 구할 수 있는 도구로 분해 수행',
      example: '-',
      score: 1,
    },
  ];

  // 평가 대상(도구 수행 항목) 데이터
  const evaluationData: EvaluationToolItem[] = [
    { key: '1', item: 'battery (BAT)', weight: 0.4, result: 0 },
    { key: '2', item: 'hose (HOS)', weight: 0.1, result: 0 },
    { key: '3', item: 'nozzles (NO)', weight: 0.3, result: 0 },
    { key: '4', item: 'filters (FI)', weight: 0.3, result: 0 },
    { key: '5', item: 'tube extension (TE)', weight: 0.3, result: 0 },
  ];

  // 드롭다운 옵션 선언
  const dropdownOptions: DropdownOption[] = [
    { label: '선택하세요', value: '' },
    { label: 'No tools (5)', value: 'A' },
    { label: 'Basic tools (4)', value: 'B' },
    { label: 'Supplied with the spare (3)', value: 'C' },
    { label: 'Supplied with the product (2)', value: 'D' },
    { label: 'Commercially available tools (1)', value: 'E' },
  ];

  // 평가 수행 선택 상태
  const [selections, setSelections] = useState<Selections>({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
  });

  // 드롭다운 값 변경 핸들러
  const handleSelectChange = (e: { value: string }, key: string): void => {
    setSelections((prev) => ({ ...prev, [key]: e.value }));
  };

  // 평가 수행 칼럼의 드롭다운 템플릿
  const evaluationTemplate = (rowData: EvaluationToolItem) => {
    return (
      <Dropdown
        value={selections[rowData.key]}
        options={dropdownOptions}
        onChange={(e) => handleSelectChange(e, rowData.key)}
        optionLabel="label"
        placeholder="선택하세요"
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* 상단 영역: 제목 및 평가 결과 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h6>3. Tools 작업도구</h6>
        <span>평가 결과(점) 0/5</span>
      </div>

      {/* 평가 기준(도구) DataTable */}
      <DataTable value={criteriaData} responsiveLayout="scroll" style={{ marginBottom: '2rem' }}>
        <Column field="grade" header="평가 등급" style={{ textAlign: 'center' }} />
        <Column field="criteriaEn" header="평가 등급 기준(영문)" style={{ textAlign: 'center' }} />
        <Column field="criteriaKo" header="평가 등급 기준(한글)" style={{ textAlign: 'center' }} />
        <Column field="example" header="예시" style={{ textAlign: 'center' }} />
        <Column field="score" header="점수" style={{ textAlign: 'center' }} />
      </DataTable>

      {/* 평가 대상 DataTable */}
      <DataTable value={evaluationData} responsiveLayout="scroll">
        <Column field="item" header="평가 대상(품목)" style={{ textAlign: 'center' }} />
        <Column header="평가 수행" body={evaluationTemplate} style={{ textAlign: 'center' }} />
        <Column field="weight" header="가중치" style={{ textAlign: 'center' }} />
        <Column header="평가 결과*(S i.pp)" body={() => <span>0</span>} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default PrimeStep3;
