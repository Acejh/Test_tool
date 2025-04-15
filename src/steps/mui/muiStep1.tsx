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

const MuiStep1 = () => {
  return (
    <Box>
      {/* 헤더 섹션: 왼쪽에는 Disassembly Depth 분해수준, 오른쪽에는 평가 결과(점) 0 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">
          Disassembly Depth 분해수준
        </Typography>
        <Typography variant="subtitle1">
          평가 결과(점) 0
        </Typography>
      </Box>

      {/* 기준 테이블 */}
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead sx={{ backgroundColor: '#c7c7c7' }}>
          <TableRow>
            <TableCell align="center">평가 등급</TableCell>
            <TableCell align="center">
              분해 단계(step)수 등급 적용 범위(영문)
            </TableCell>
            <TableCell align="center">
              분해 단계(step)수 등급 적용 범위(한글)
            </TableCell>
            <TableCell align="center">등급 점수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">A</TableCell>
            <TableCell align="center">
              Disassembly Depth ≤ 2 steps
            </TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">B</TableCell>
            <TableCell align="center">
              2 steps &lt; Disassembly Depth ≤ 5
            </TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">C</TableCell>
            <TableCell align="center">
              5 steps &lt; Disassembly Depth ≤ 10
            </TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">D</TableCell>
            <TableCell align="center">
              10 steps &lt; Disassembly Depth ≤ 15
            </TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">E</TableCell>
            <TableCell align="center">
              15 steps &lt; Disassembly Depth
            </TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">1</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* 평가 수행 테이블 */}
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#c7c7c7' }}>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              평가 대상 예비 부품
            </TableCell>
            <TableCell align="center">평가 수행</TableCell>
            <TableCell align="center">가중치</TableCell>
            <TableCell align="center">
              평가 결과(S i.pp)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">battery (BAT)</TableCell>
            <TableCell align="center">배터리</TableCell>
            <TableCell align="center">
              <Select defaultValue="" fullWidth sx={{ height: '40px' }}>
                <MenuItem value="">
                  단계(step) 적용 범위 선택
                </MenuItem>
                <MenuItem value="level5">
                  Disassembly Depth ≤ 2 steps
                </MenuItem>
                <MenuItem value="level4">
                  2 steps &lt; Disassembly Depth ≤ 5
                </MenuItem>
                <MenuItem value="level3">
                  5 steps &lt; Disassembly Depth ≤ 10
                </MenuItem>
                <MenuItem value="level2">
                  10 steps &lt; Disassembly Depth ≤ 15
                </MenuItem>
                <MenuItem value="level1">
                  15 steps &lt; Disassembly Depth
                </MenuItem>
              </Select>
            </TableCell>
            <TableCell align="center">0.1</TableCell>
            <TableCell align="center">0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default MuiStep1;
