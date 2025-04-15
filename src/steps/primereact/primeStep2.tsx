import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

// 평가 등급(기준) 데이터 타입 정의
interface RatingCriteria {
  grade: string;
  criteriaEn: string;
  criteriaKo: string;
  example: string;
  score: number;
}

// 평가 대상(수행 항목) 데이터 타입 정의
interface EvaluationItem {
  key: string;
  label: string;
  weight: number;
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

const PrimeStep2: React.FC = () => {
  // 평가 등급 테이블 데이터
  const criteriaData: RatingCriteria[] = [
    {
      grade: 'A',
      criteriaEn: 'Reusable Fasteners',
      criteriaKo: '재사용 가능 체결품',
      example: '래칫, 나사, 볼트 등',
      score: 5,
    },
    {
      grade: 'B',
      criteriaEn: 'Semi-Permanent Fasteners',
      criteriaKo: '준영구 체결품',
      example: '리벳, 용접, 접착제 등',
      score: 3,
    },
    {
      grade: 'C',
      criteriaEn: 'Removable Fasteners',
      criteriaKo: '분리가능 체결품',
      example: '너트만 제거하면 분리 가능 등',
      score: 1,
    },
  ];

  // 평가 대상(수행 항목) 데이터
  const evaluationItems: EvaluationItem[] = [
    { key: 'battery', label: 'battery (BAT)', weight: 0.1 },
    { key: 'hose', label: 'hose (HOS)', weight: 0.4 },
    { key: 'nozzles', label: 'nozzles (NO)', weight: 0.3 },
    { key: 'filters', label: 'filters (FI)', weight: 0.3 },
    { key: 'tubeExtension', label: 'tube extension (TE)', weight: 0.3 },
  ];

  // 드롭다운 옵션 선언
  const dropdownOptions: DropdownOption[] = [
    { label: '선택하세요', value: '' },
    { label: 'Reusable Fasteners (5)', value: 'A' },
    { label: 'Semi-Permanent Fasteners (3)', value: 'B' },
    { label: 'Removable Fasteners (1)', value: 'C' },
  ];

  // 평가 수행 선택 상태
  const [selections, setSelections] = useState<Selections>({
    battery: '',
    hose: '',
    nozzles: '',
    filters: '',
    tubeExtension: '',
  });

  // 드롭다운 값 변경 핸들러
  const handleChange = (e: { value: string }, key: string): void => {
    setSelections((prev) => ({ ...prev, [key]: e.value }));
  };

  // 평가 수행 칼럼의 드롭다운 템플릿
  const evaluationTemplate = (rowData: EvaluationItem) => {
    return (
      <Dropdown
        value={selections[rowData.key]}
        options={dropdownOptions}
        onChange={(e) => handleChange(e, rowData.key)}
        optionLabel="label"
        placeholder="선택하세요"
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* 헤더 섹션 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h6>2. Fasteners and Connectors 체결부품</h6>
        <span>평가 결과(점) 0/5</span>
      </div>

      {/* 평가 등급(기준) DataTable */}
      <DataTable value={criteriaData} responsiveLayout="scroll" style={{ marginBottom: '2rem' }}>
        <Column field="grade" header="평가 등급" style={{ textAlign: 'center' }} />
        <Column field="criteriaEn" header="평가 등급 기준(영문)" style={{ textAlign: 'center' }} />
        <Column field="criteriaKo" header="평가 등급 기준(한글)" style={{ textAlign: 'center' }} />
        <Column field="example" header="예시" style={{ textAlign: 'center' }} />
        <Column field="score" header="점수" style={{ textAlign: 'center' }} />
      </DataTable>

      {/* 평가 대상 DataTable */}
      <DataTable value={evaluationItems} responsiveLayout="scroll">
        <Column field="label" header="평가 대상(품목)" style={{ textAlign: 'center' }} />
        <Column header="평가 수행" body={evaluationTemplate} style={{ textAlign: 'center' }} />
        <Column field="weight" header="가중치" style={{ textAlign: 'center' }} />
        <Column header="평가 결과*(S i.pp)" body={() => <span>0</span>} style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default PrimeStep2;
