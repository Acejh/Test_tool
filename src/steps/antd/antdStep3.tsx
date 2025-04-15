import React, { useState } from 'react';
import { Table, Typography, Row, Col, Select ,TableColumnType} from 'antd';

const { Title, Text } = Typography;

interface Criteria {
  key: string;
  grade: string;
  criteriaEn: string;
  criteriaKo: string;
  example: string;
  score: number;
}

const criteriaData: Criteria[] = [
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

const criteriaColumns: TableColumnType<Criteria>[] = [
  {
    title: '평가 등급',
    dataIndex: 'grade',
    key: 'grade',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '평가 등급 기준(영문)',
    dataIndex: 'criteriaEn',
    key: 'criteriaEn',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '평가 등급 기준(한글)',
    dataIndex: 'criteriaKo',
    key: 'criteriaKo',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '예시',
    dataIndex: 'example',
    key: 'example',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
  {
    title: '점수',
    dataIndex: 'score',
    key: 'score',
    align: 'center',
    onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
  },
];

interface EvalItem {
  key: string;
  item: string;
  weight: number;
  result: number;
}

const evalData: EvalItem[] = [
  { key: '1', item: 'battery (BAT)', weight: 0.4, result: 0 },
  { key: '2', item: 'hose (HOS)', weight: 0.1, result: 0 },
  { key: '3', item: 'nozzles (NO)', weight: 0.3, result: 0 },
  { key: '4', item: 'filters (FI)', weight: 0.3, result: 0 },
  { key: '5', item: 'tube extension (TE)', weight: 0.3, result: 0 },
];

const AntdStep3: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
  });

  const handleSelectChange = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const evalColumns: TableColumnType<EvalItem>[] = [
    {
      title: '평가 대상(품목)',
      dataIndex: 'item',
      key: 'item',
      align: 'center',
      onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
    },
    {
      title: '평가 수행',
      dataIndex: 'evaluation',
      key: 'evaluation',
      align: 'center',
      onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
      render: (_: unknown, record: EvalItem) => (
        <Select
          style={{ width: '100%', height: 40 }}
          placeholder="선택하세요"
          value={selections[record.key]}
          onChange={(value) => handleSelectChange(record.key, value)}
        >
          <Select.Option value="">선택하세요</Select.Option>
          <Select.Option value="A">No tools (5)</Select.Option>
          <Select.Option value="B">Basic tools (4)</Select.Option>
          <Select.Option value="C">Supplied with the spare (3)</Select.Option>
          <Select.Option value="D">Supplied with the product (2)</Select.Option>
          <Select.Option value="E">Commercially available tools (1)</Select.Option>
        </Select>
      ),
    },
    {
      title: '가중치',
      dataIndex: 'weight',
      key: 'weight',
      align: 'center',
      onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
    },
    {
      title: '평가 결과*(S i.pp)',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      onHeaderCell: () => ({ style: { backgroundColor: '#c7c7c7' } }),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      {/* 상단 영역: 제목 및 평가 결과 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>3. Tools 작업도구</Title>
        </Col>
        <Col>
          <Text>평가 결과(점) 0/5</Text>
        </Col>
      </Row>

      {/* 평가 기준 테이블 */}
      <Table
        columns={criteriaColumns}
        dataSource={criteriaData}
        size="small"
        pagination={false}
        style={{ marginBottom: 16 }}
      />

      {/* 평가 대상 테이블 */}
      <Table
        columns={evalColumns}
        dataSource={evalData}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default AntdStep3;
