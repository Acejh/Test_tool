import { useState } from 'react';
import { Table, Typography, Row, Col, Select, TableColumnType} from 'antd';

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
    key: 'A',
    grade: 'A',
    criteriaEn: 'Reusable Fasteners',
    criteriaKo: '재사용 가능 체결품',
    example: '래칫, 나사, 볼트 등',
    score: 5,
  },
  {
    key: 'B',
    grade: 'B',
    criteriaEn: 'Semi-Permanent Fasteners',
    criteriaKo: '준영구 체결품',
    example: '리벳, 용접, 접착제 등',
    score: 3,
  },
  {
    key: 'C',
    grade: 'C',
    criteriaEn: 'Removable Fasteners',
    criteriaKo: '분리가능 체결품',
    example: '너트만 제거하면 분리 가능 등',
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
  { key: 'battery', item: 'battery (BAT)', weight: 0.1, result: 0 },
  { key: 'hose', item: 'hose (HOS)', weight: 0.4, result: 0 },
  { key: 'nozzles', item: 'nozzles (NO)', weight: 0.3, result: 0 },
  { key: 'filters', item: 'filters (FI)', weight: 0.3, result: 0 },
  { key: 'tubeExtension', item: 'tube extension (TE)', weight: 0.3, result: 0 },
];

const AntdStep2 = () => {
  const [selections, setSelections] = useState<Record<string, string>>({
    battery: '',
    hose: '',
    nozzles: '',
    filters: '',
    tubeExtension: '',
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
          <Select.Option value="A">Reusable Fasteners (5)</Select.Option>
          <Select.Option value="B">Semi-Permanent Fasteners (3)</Select.Option>
          <Select.Option value="C">Removable Fasteners (1)</Select.Option>
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
      {/* 평가 대상 섹션 헤더 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>2. Fasteners and Connectors 체결부품</Title>
        </Col>
        <Col>
          <Text>평가 결과(점) 0/5</Text>
        </Col>
      </Row>

      {/* 평가 등급 테이블 */}
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

export default AntdStep2;
