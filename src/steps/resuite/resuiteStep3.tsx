import { useState, FC } from 'react';
import { Panel, FlexboxGrid, Table, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

interface ToolsCriteria {
  key: string;
  grade: string;
  criteriaEn: string;
  criteriaKo: string;
  example: string;
  score: number;
}

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

interface EvaluationItem {
  key: string;
  item: string;
  weight: number;
  result: number;
}

const evaluationItems: EvaluationItem[] = [
  { key: '1', item: 'battery (BAT)', weight: 0.4, result: 0 },
  { key: '2', item: 'hose (HOS)', weight: 0.1, result: 0 },
  { key: '3', item: 'nozzles (NO)', weight: 0.3, result: 0 },
  { key: '4', item: 'filters (FI)', weight: 0.3, result: 0 },
  { key: '5', item: 'tube extension (TE)', weight: 0.3, result: 0 },
];

interface OptionData {
  label: string;
  value: string;
}

const toolsOptions: OptionData[] = [
  { label: '선택하세요', value: '' },
  { label: 'No tools (5)', value: 'A' },
  { label: 'Basic tools (4)', value: 'B' },
  { label: 'Supplied with the spare (3)', value: 'C' },
  { label: 'Supplied with the product (2)', value: 'D' },
  { label: 'Commercially available tools (1)', value: 'E' },
];

const ResuiteStep3: FC = () => {
  // state의 key는 평가 기준의 key ('1' ~ '5')로 구성됨
  const [selections, setSelections] = useState<Record<string, string>>({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
  });

  const handleSelectChange = (key: string) => (value: string | null) => {
    setSelections((prev) => ({ ...prev, [key]: value || '' }));
  };

  return (
    <Panel style={{ padding: 16 }}>
      {/* 상단 헤더 섹션 */}
      <FlexboxGrid style={{ marginBottom: 16 }} align="middle">
        <FlexboxGrid.Item colspan={12}>
          <h6>3. Tools 작업도구</h6>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} style={{ textAlign: 'right' }}>
          <h6>평가 결과(점) 0/5</h6>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* 평가 기준 테이블 */}
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
          <Cell dataKey="item" />
        </Column>
        <Column flexGrow={2} align="center">
          <HeaderCell>평가 수행</HeaderCell>
          <Cell>
            {(rowData: EvaluationItem) => (
              <SelectPicker
                data={toolsOptions}
                value={selections[rowData.key]}
                onChange={handleSelectChange(rowData.key)}
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

export default ResuiteStep3;
