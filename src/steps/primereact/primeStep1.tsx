import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

// 평가 기준 데이터 타입 정의
interface Criteria {
  tier: string;
  rangeEn: string;
  rangeKr: string;
  score: string;
}

// 평가 수행 항목 데이터 타입 정의
interface Evaluation {
  id: number;
  partCode: string;
  partName: string;
  evaluation: string;
  weight: number;
  result: number;
}

// 드롭다운 옵션 타입 정의
interface Option {
  label: string;
  value: string;
}

const PrimeStep1: React.FC = () => {
  // 평가 기준 데이터 
  const criteriaData: Criteria[] = [
    { tier: 'A', rangeEn: 'Disassembly Depth ≤ 2 steps', rangeKr: '5', score: '5' },
    { tier: 'B', rangeEn: '2 steps < Disassembly Depth ≤ 5', rangeKr: '4', score: '4' },
    { tier: 'C', rangeEn: '5 steps < Disassembly Depth ≤ 10', rangeKr: '3', score: '3' },
    { tier: 'D', rangeEn: '10 steps < Disassembly Depth ≤ 15', rangeKr: '2', score: '2' },
    { tier: 'E', rangeEn: '15 steps < Disassembly Depth', rangeKr: '1', score: '1' }
  ];

  // 평가 수행 데이터
  const [evaluationData, setEvaluationData] = useState<Evaluation[]>([
    { id: 1, partCode: 'battery (BAT)', partName: '배터리', evaluation: '', weight: 0.1, result: 0 }
  ]);

  // Dropdown 옵션
  const evaluationOptions: Option[] = [
    { label: '단계(step) 적용 범위 선택', value: '' },
    { label: 'Disassembly Depth ≤ 2 steps', value: 'level5' },
    { label: '2 steps < Disassembly Depth ≤ 5', value: 'level4' },
    { label: '5 steps < Disassembly Depth ≤ 10', value: 'level3' },
    { label: '10 steps < Disassembly Depth ≤ 15', value: 'level2' },
    { label: '15 steps < Disassembly Depth', value: 'level1' }
  ];

  // Dropdown 값 변경 핸들러
  const onEvaluationChange = (e: any, rowData: Evaluation) => {
    const updatedData = evaluationData.map((item) =>
      item.id === rowData.id ? { ...item, evaluation: e.value } : item
    );
    setEvaluationData(updatedData);
  };

  // 평가 수행 칼럼의 드롭다운 템플릿
  const evaluationTemplate = (rowData: Evaluation) => {
    return (
      <Dropdown
        value={rowData.evaluation}
        options={evaluationOptions}
        onChange={(e) => onEvaluationChange(e, rowData)}
        optionLabel="label"
        placeholder="단계(step) 적용 범위 선택"
        style={{ width: '100%' }}
      />
    );
  };

  // 평가 수행 DataTable 헤더 (첫 행: "평가 대상 예비 부품" 2열 병합)
  const evaluationHeaderGroup = (
    <ColumnGroup>
      <Row>
        <Column header="평가 대상 예비 부품" colSpan={2} style={{ textAlign: 'center' }} />
        <Column header="평가 수행" style={{ textAlign: 'center' }} />
        <Column header="가중치" style={{ textAlign: 'center' }} />
        <Column header="평가 결과(S i.pp)" style={{ textAlign: 'center' }} />
      </Row>
    </ColumnGroup>
  );

  return (
    <div style={{ padding: '1rem' }}>
      {/* 헤더 섹션 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h6>Disassembly Depth 분해수준</h6>
        <span>평가 결과(점) 0</span>
      </div>

      {/* 평가 기준 DataTable */}
      <DataTable value={criteriaData} responsiveLayout="scroll" style={{ marginBottom: '2rem' }}>
        <Column field="tier" header="평가 등급" style={{ textAlign: 'center' }} />
        <Column field="rangeEn" header="분해 단계(step)수 등급 적용 범위(영문)" style={{ textAlign: 'center' }} />
        <Column field="rangeKr" header="분해 단계(step)수 등급 적용 범위(한글)" style={{ textAlign: 'center' }} />
        <Column field="score" header="등급 점수" style={{ textAlign: 'center' }} />
      </DataTable>

      {/* 평가 수행 DataTable */}
      <DataTable value={evaluationData} headerColumnGroup={evaluationHeaderGroup} responsiveLayout="scroll">
        <Column field="partCode" header="Part Code" style={{ textAlign: 'center' }} />
        <Column field="partName" header="Part Name" style={{ textAlign: 'center' }} />
        <Column body={evaluationTemplate} style={{ textAlign: 'center' }} />
        <Column field="weight" header="가중치" style={{ textAlign: 'center' }} />
        <Column field="result" header="평가 결과(S i.pp)" style={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default PrimeStep1;
