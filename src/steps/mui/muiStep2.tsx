import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
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

const MuiStep2 = () => {
  const [selections, setSelections] = useState({
    battery: '',
    hose: '',
    nozzles: '',
    filters: '',
    tubeExtension: '',
  });

  const handleChange = (name: keyof typeof selections) => (
    event: SelectChangeEvent<string>
  ): void => {
    setSelections((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 평가 대상 섹션 헤더: 왼쪽 제목, 오른쪽 평가 결과 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">
          2. Fasteners and Connectors 체결부품
        </Typography>
        <Typography variant="subtitle1">
          평가 결과(점) 0/5
        </Typography>
      </Box>

      {/* 평가 등급 테이블 */}
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
          <TableRow>
            <TableCell align="center">A</TableCell>
            <TableCell align="center">Reusable Fasteners</TableCell>
            <TableCell align="center">재사용 가능 체결품</TableCell>
            <TableCell align="center">래칫, 나사, 볼트 등</TableCell>
            <TableCell align="center">5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">B</TableCell>
            <TableCell align="center">Semi-Permanent Fasteners</TableCell>
            <TableCell align="center">준영구 체결품</TableCell>
            <TableCell align="center">리벳, 용접, 접착제 등</TableCell>
            <TableCell align="center">3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">C</TableCell>
            <TableCell align="center">Removable Fasteners</TableCell>
            <TableCell align="center">분리가능 체결품</TableCell>
            <TableCell align="center">너트만 제거하면 분리 가능 등</TableCell>
            <TableCell align="center">1</TableCell>
          </TableRow>
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
          {[
            { key: 'battery', label: 'battery (BAT)', weight: 0.1 },
            { key: 'hose', label: 'hose (HOS)', weight: 0.4 },
            { key: 'nozzles', label: 'nozzles (NO)', weight: 0.3 },
            { key: 'filters', label: 'filters (FI)', weight: 0.3 },
            { key: 'tubeExtension', label: 'tube extension (TE)', weight: 0.3 },
          ].map((item) => (
            <TableRow key={item.key}>
              <TableCell align="center">{item.label}</TableCell>
              <TableCell align="center">
                <Select
                  defaultValue=""
                  fullWidth
                  sx={{ height: '40px' }}
                  onChange={handleChange(item.key as keyof typeof selections)}
                  value={selections[item.key as keyof typeof selections]}
                >
                  <MenuItem value="">선택하세요</MenuItem>
                  <MenuItem value="A">Reusable Fasteners (5)</MenuItem>
                  <MenuItem value="B">Semi-Permanent Fasteners (3)</MenuItem>
                  <MenuItem value="C">Removable Fasteners (1)</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="center">{item.weight}</TableCell>
              <TableCell align="center">0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MuiStep2;
