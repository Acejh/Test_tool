import { useState, FC } from 'react';
import { Panel, FlexboxGrid, Table, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

// 기준 테이블 데이터 타입 및 데이터
interface CriteriaData {
  grade: string;
  englishRange: string;
  koreanRange: string;
  score: string;
}

const criteriaData: CriteriaData[] = [
  {
    grade: 'A',
    englishRange: 'Disassembly Depth ≤ 2 steps',
    koreanRange: '5',
    score: '5'
  },
  {
    grade: 'B',
    englishRange: '2 steps < Disassembly Depth ≤ 5',
    koreanRange: '4',
    score: '4'
  },
  {
    grade: 'C',
    englishRange: '5 steps < Disassembly Depth ≤ 10',
    koreanRange: '3',
    score: '3'
  },
  {
    grade: 'D',
    englishRange: '10 steps < Disassembly Depth ≤ 15',
    koreanRange: '2',
    score: '2'
  },
  {
    grade: 'E',
    englishRange: '15 steps < Disassembly Depth',
    koreanRange: '1',
    score: '1'
  }
];

// 평가 수행 테이블 데이터 타입 및 데이터
interface EvaluationData {
  code: string;
  name: string;
  weight: number;
  score: number;
}

const evaluationData: EvaluationData[] = [
  {
    code: 'battery (BAT)',
    name: '배터리',
    weight: 0.1,
    score: 0
  }
];

// 평가 수행 select 옵션 데이터 타입 및 데이터
interface OptionData {
  label: string;
  value: string;
}

const selectOptions: OptionData[] = [
  { label: '단계(step) 적용 범위 선택', value: '' },
  { label: 'Disassembly Depth ≤ 2 steps', value: 'level5' },
  { label: '2 steps < Disassembly Depth ≤ 5', value: 'level4' },
  { label: '5 steps < Disassembly Depth ≤ 10', value: 'level3' },
  { label: '10 steps < Disassembly Depth ≤ 15', value: 'level2' },
  { label: '15 steps < Disassembly Depth', value: 'level1' }
];

// 공통 스타일: 각 셀 내 텍스트가 지정된 영역 내에서 ellipsis 처리되도록 함
const cellTextStyle = {
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
  width: '100%'
};

const ResuiteStep1: FC = () => {
  // 상태 타입을 string | null 로 선언하여 null 값도 허용 (SelectPicker onChange 타입과 일치)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <Panel style={{ padding: 16 }}>
      {/* 헤더 섹션 */}
      <FlexboxGrid style={{ marginBottom: 16 }} align="middle">
        <FlexboxGrid.Item colspan={12}>
          <h6>Disassembly Depth 분해수준</h6>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} style={{ textAlign: 'right' }}>
          <h6>평가 결과(점) 0</h6>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* 기준 테이블 (전체 가로폭 채움) */}
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
          <Cell>
            {(rowData: CriteriaData) => (
              <div style={cellTextStyle}>{rowData.grade}</div>
            )}
          </Cell>
        </Column>
        {/* 영어 범위는 조금 더 넓게 */}
        <Column flexGrow={2} align="center">
          <HeaderCell>분해 단계(step)수 등급 적용 범위(영문)</HeaderCell>
          <Cell>
            {(rowData: CriteriaData) => (
              <div style={cellTextStyle}>{rowData.englishRange}</div>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>분해 단계(step)수 등급 적용 범위(한글)</HeaderCell>
          <Cell>
            {(rowData: CriteriaData) => (
              <div style={cellTextStyle}>{rowData.koreanRange}</div>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>등급 점수</HeaderCell>
          <Cell>
            {(rowData: CriteriaData) => (
              <div style={cellTextStyle}>{rowData.score}</div>
            )}
          </Cell>
        </Column>
      </Table>

      {/* 평가 수행 테이블의 머지 헤더 (flex 사용) */}
      <div
        style={{
          backgroundColor: '#c7c7c7',
          display: 'flex',
          textAlign: 'center',
          fontWeight: 'bold',
          padding: 8
        }}
      >
        {/* 평가 대상 예비 부품: 두 칼럼에 해당하므로 flex: 2 */}
        <div style={{ flex: 2 }}>평가 대상 예비 부품</div>
        <div style={{ flex: 1 }}>평가 수행</div>
        <div style={{ flex: 1 }}>가중치</div>
        <div style={{ flex: 1 }}>평가 결과(S i.pp)</div>
      </div>

      {/* 평가 수행 테이블 (전체 가로폭 채움) */}
      <Table
        data={evaluationData}
        autoHeight
        bordered
        headerHeight={40}
        rowHeight={50}
        style={{ width: '100%' }}
      >
        <Column flexGrow={1} align="center">
          <HeaderCell>영문</HeaderCell>
          <Cell>
            {(rowData: EvaluationData) => (
              <div style={cellTextStyle}>{rowData.code}</div>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>한글</HeaderCell>
          <Cell>
            {(rowData: EvaluationData) => (
              <div style={cellTextStyle}>{rowData.name}</div>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>평가 수행</HeaderCell>
          <Cell>
            {() => (
              <SelectPicker
                data={selectOptions}
                value={selectedLevel}
                onChange={(value: string | null) => setSelectedLevel(value)}
                style={{ width: '100%' }}
                placeholder="단계(step) 적용 범위 선택"
              />
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>가중치</HeaderCell>
          <Cell>
            {(rowData: EvaluationData) => (
              <div style={cellTextStyle}>{rowData.weight}</div>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="center">
          <HeaderCell>평가 결과(S i.pp)</HeaderCell>
          <Cell>
            {(rowData: EvaluationData) => (
              <div style={cellTextStyle}>{rowData.score}</div>
            )}
          </Cell>
        </Column>
      </Table>
    </Panel>
  );
};

export default ResuiteStep1;
