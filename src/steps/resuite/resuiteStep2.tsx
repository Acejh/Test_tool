import { useState, FC } from 'react';
import { Panel, FlexboxGrid, Table, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

interface FastenerCriteria {
  grade: string;
  criteriaEn: string;
  criteriaKo: string;
  example: string;
  score: number;
}

const criteriaData: FastenerCriteria[] = [
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

interface EvaluationItem {
  key: string;
  label: string;
  weight: number;
  result: number;
}

const evaluationItems: EvaluationItem[] = [
  { key: 'battery', label: 'battery (BAT)', weight: 0.1, result: 0 },
  { key: 'hose', label: 'hose (HOS)', weight: 0.4, result: 0 },
  { key: 'nozzles', label: 'nozzles (NO)', weight: 0.3, result: 0 },
  { key: 'filters', label: 'filters (FI)', weight: 0.3, result: 0 },
  { key: 'tubeExtension', label: 'tube extension (TE)', weight: 0.3, result: 0 },
];

interface OptionData {
  label: string;
  value: string;
}

const fastenerOptions: OptionData[] = [
  { label: '선택하세요', value: '' },
  { label: 'Reusable Fasteners (5)', value: 'A' },
  { label: 'Semi-Permanent Fasteners (3)', value: 'B' },
  { label: 'Removable Fasteners (1)', value: 'C' },
];

const ResuiteStep2: FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({
    battery: '',
    hose: '',
    nozzles: '',
    filters: '',
    tubeExtension: '',
  });

  const handleChange = (name: string) => (value: string | null) => {
    setSelections((prev) => ({ ...prev, [name]: value || '' }));
  };

  return (
    <Panel style={{ padding: 16 }}>
      {/* 헤더 섹션 */}
      <FlexboxGrid style={{ marginBottom: 16 }} align="middle">
        <FlexboxGrid.Item colspan={12}>
          <h6>2. Fasteners and Connectors 체결부품</h6>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} style={{ textAlign: 'right' }}>
          <h6>평가 결과(점) 0/5</h6>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* 평가 등급 기준 테이블 */}
      <Table
        data={criteriaData}
        autoHeight
        bordered
        headerHeight={40}
        rowHeight={40}
        style={{ marginBottom: 16, width: '100%' }}
      >
        <Column flexGrow={1} align="center">
          <HeaderCell>평가 등급</HeaderCell>
          <Cell dataKey="grade" />
        </Column>
        <Column flexGrow={2} align="center">
          <HeaderCell>평가 등급 기준(영문)</HeaderCell>
          <Cell dataKey="criteriaEn" />
        </Column>
        <Column flexGrow={2} align="center">
          <HeaderCell>평가 등급 기준(한글)</HeaderCell>
          <Cell dataKey="criteriaKo" />
        </Column>
        <Column flexGrow={2} align="center">
          <HeaderCell>예시</HeaderCell>
          <Cell dataKey="example" />
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>점수</HeaderCell>
          <Cell dataKey="score" />
        </Column>
      </Table>

      {/* 평가 대상 테이블 */}
      <Table
        data={evaluationItems}
        autoHeight
        bordered
        headerHeight={40}
        rowHeight={50}
        style={{ width: '100%' }}
      >
        <Column flexGrow={2} align="center">
          <HeaderCell>평가 대상(품목)</HeaderCell>
          <Cell dataKey="label" />
        </Column>
        <Column flexGrow={2} align="center">
          <HeaderCell>평가 수행</HeaderCell>
          <Cell>
            {(rowData: EvaluationItem) => (
              <SelectPicker
                data={fastenerOptions}
                value={selections[rowData.key]}
                onChange={handleChange(rowData.key)}
                style={{ width: '100%' }}
                placeholder="선택하세요"
              />
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>가중치</HeaderCell>
          <Cell dataKey="weight" />
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>평가 결과*(S i.pp)</HeaderCell>
          <Cell dataKey="result" />
        </Column>
      </Table>
    </Panel>
  );
};

export default ResuiteStep2;
