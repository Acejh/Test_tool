import React from 'react';
import { Row, Col, Typography, Table, Select, TableColumnType, TableColumnGroupType } from 'antd';

const { Title, Text } = Typography;

interface CriteriaData {
  key: string;
  grade: string;
  englishRange: string;
  koreanRange: string;
  score: string;
}

interface EvaluationData {
  key: string;
  partEng: string;
  partKor: string;
  evaluation: React.ReactElement;
  weight: string;
  result: string;
}

const criteriaColumns: TableColumnType<CriteriaData>[] = [
  {
    title: '평가 등급',
    dataIndex: 'grade',
    key: 'grade',
    align: 'center',
    // 필요시 헤더 셀 스타일을 지정할 수 있음
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '분해 단계(step)수 등급 적용 범위(영문)',
    dataIndex: 'englishRange',
    key: 'englishRange',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '분해 단계(step)수 등급 적용 범위(한글)',
    dataIndex: 'koreanRange',
    key: 'koreanRange',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '등급 점수',
    dataIndex: 'score',
    key: 'score',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
];

const criteriaData = [
  {
    key: 'A',
    grade: 'A',
    englishRange: 'Disassembly Depth ≤ 2 steps',
    koreanRange: '5',
    score: '5',
  },
  {
    key: 'B',
    grade: 'B',
    englishRange: '2 steps < Disassembly Depth ≤ 5',
    koreanRange: '4',
    score: '4',
  },
  {
    key: 'C',
    grade: 'C',
    englishRange: '5 steps < Disassembly Depth ≤ 10',
    koreanRange: '3',
    score: '3',
  },
  {
    key: 'D',
    grade: 'D',
    englishRange: '10 steps < Disassembly Depth ≤ 15',
    koreanRange: '2',
    score: '2',
  },
  {
    key: 'E',
    grade: 'E',
    englishRange: '15 steps < Disassembly Depth',
    koreanRange: '1',
    score: '1',
  },
];

const evaluationColumns: (TableColumnType<EvaluationData> | TableColumnGroupType<EvaluationData>)[] = [
  {
    title: '평가 대상 예비 부품',
    children: [
      {
        title: '영문',
        dataIndex: 'partEng',
        key: 'partEng',
        align: 'center',
      },
      {
        title: '한글',
        dataIndex: 'partKor',
        key: 'partKor',
        align: 'center',
      },
    ],
  },
  {
    title: '평가 수행',
    dataIndex: 'evaluation',
    key: 'evaluation',
    align: 'center',
  },
  {
    title: '가중치',
    dataIndex: 'weight',
    key: 'weight',
    align: 'center',
  },
  {
    title: '평가 결과(S i.pp)',
    dataIndex: 'result',
    key: 'result',
    align: 'center',
  },
];

const evaluationData: EvaluationData[] = [
  {
    key: '1',
    partEng: 'battery (BAT)',
    partKor: '배터리',
    evaluation: (
      <Select defaultValue="" style={{ width: '100%' }}>
        <Select.Option value="">단계(step) 적용 범위 선택</Select.Option>
        <Select.Option value="level5">
          Disassembly Depth ≤ 2 steps
        </Select.Option>
        <Select.Option value="level4">
          2 steps &lt; Disassembly Depth ≤ 5
        </Select.Option>
        <Select.Option value="level3">
          5 steps &lt; Disassembly Depth ≤ 10
        </Select.Option>
        <Select.Option value="level2">
          10 steps &lt; Disassembly Depth ≤ 15
        </Select.Option>
        <Select.Option value="level1">
          15 steps &lt; Disassembly Depth
        </Select.Option>
      </Select>
    ),
    weight: '0.1',
    result: '0',
  },
];

const AntdStep1 = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* 헤더 섹션: 왼쪽에 제목, 오른쪽에 평가 결과 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Col>
          <Title level={4}>Disassembly Depth 분해수준</Title>
        </Col>
        <Col>
          <Text>평가 결과(점) 0</Text>
        </Col>
      </Row>

      {/* 기준 테이블 */}
      <Table
        columns={criteriaColumns}
        dataSource={criteriaData}
        size="small"
        pagination={false}
        style={{ marginBottom: '16px' }}
      />

      {/* 평가 수행 테이블 */}
      <Table
        columns={evaluationColumns}
        dataSource={evaluationData}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default AntdStep1;
