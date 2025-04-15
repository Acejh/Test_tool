import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// 평가 기준 데이터
const dataCriteria = [
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

// 평가 대상 데이터
const dataEvaluation = [
  { key: '1', item: 'battery (BAT)', weight: 0.4, result: 0 },
  { key: '2', item: 'hose (HOS)', weight: 0.1, result: 0 },
  { key: '3', item: 'nozzles (NO)', weight: 0.3, result: 0 },
  { key: '4', item: 'filters (FI)', weight: 0.3, result: 0 },
  { key: '5', item: 'tube extension (TE)', weight: 0.3, result: 0 },
];

const MuiStep3: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
  });

  const handleSelectChange = (event: SelectChangeEvent, key: string) => {
    setSelections((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 상단 영역: 제목 및 평가 결과 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">3. Tools 작업도구</Typography>
        <Typography variant="subtitle1">평가 결과(점) 0/5</Typography>
      </Box>

      {/* 평가 기준 테이블 */}
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead sx={{ backgroundColor: '#c7c7c7' }}>
          <TableRow>
            <TableCell align="center">평가 등급</TableCell>
            <TableCell align="center">평가 등급 기준(영문)</TableCell>
            <TableCell align="center">평가 등급 기준(한글)</TableCell>
            <TableCell align="center">예시</TableCell>
            <TableCell align="center">점수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataCriteria.map((row) => (
            <TableRow key={row.key}>
              <TableCell align="center">{row.grade}</TableCell>
              <TableCell align="center">{row.criteriaEn}</TableCell>
              <TableCell align="center">{row.criteriaKo}</TableCell>
              <TableCell align="center">{row.example}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 평가 대상 테이블 */}
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#c7c7c7' }}>
          <TableRow>
            <TableCell align="center">평가 대상(품목)</TableCell>
            <TableCell align="center">평가 수행</TableCell>
            <TableCell align="center">가중치</TableCell>
            <TableCell align="center">평가 결과*(S i.pp)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEvaluation.map((row) => (
            <TableRow key={row.key}>
              <TableCell align="center">{row.item}</TableCell>
              <TableCell align="center">
                <Select
                  defaultValue=""
                  fullWidth
                  sx={{ height: '40px' }}
                  value={selections[row.key]}
                  onChange={(e) => handleSelectChange(e, row.key)}
                >
                  <MenuItem value="">선택하세요</MenuItem>
                  <MenuItem value="A">No tools (5)</MenuItem>
                  <MenuItem value="B">Basic tools (4)</MenuItem>
                  <MenuItem value="C">Supplied with the spare (3)</MenuItem>
                  <MenuItem value="D">Supplied with the product (2)</MenuItem>
                  <MenuItem value="E">Commercially available tools (1)</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MuiStep3;
