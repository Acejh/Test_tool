// src/layout/Layout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    // 상위 래퍼: 뷰포트 전체를 차지
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <header
        style={{
          background: '#f0f0f0',
          padding: '1rem 2rem',
          textAlign: 'center',
        }}
      >
        <nav>
          {/* nav의 경우 inline-flex를 사용하여 중앙정렬 */}
          <ul style={{ display: 'inline-flex', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/part">ErP</Link>
            </li>
            <li>
              <Link to="/muirepairT">Mui</Link>
            </li>
            <li>
              <Link to="/antdrepairT">Antd</Link>
            </li>
            <li>
              <Link to="/primerepairT">PrimeReact</Link>
            </li>
            <li>
              <Link to="/rsuiterepairT">Rsuite</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        {/* 중앙 컨테이너 (최대 너비를 지정하고 margin auto 적용) */}
        <div
          style={{
            width: '100%',
            maxWidth: '1500px',
            height: '700px',
            margin: '0 auto',
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <Outlet />
        </div>
      </main>

      {/* 푸터 */}
      <footer
        style={{
          background: '#f0f0f0',
          padding: '1rem 2rem',
          textAlign: 'center',
        }}
      >
        &copy; {new Date().getFullYear()} Demo
      </footer>
    </div>
  );
};

export default Layout;
