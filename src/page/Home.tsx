// src/page/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import './custom-dark.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dark-theme" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button className="p-button" style={{ marginRight: '1rem' }} onClick={() => navigate('/part')}>
        ErP
      </Button>
      <Button className="p-button" style={{ marginRight: '1rem' }} onClick={() => navigate('/muirepairT')}>
        Mui
      </Button>
      <Button className="p-button" style={{ marginRight: '1rem' }} onClick={() => navigate('/antdrepairT')}>
        Antd
      </Button>
      <Button className="p-button" style={{ marginRight: '1rem' }} onClick={() => navigate('/primerepairT')}>
        PrimeReact
      </Button>
      <Button className="p-button" style={{ marginRight: '1rem' }} onClick={() => navigate('/rsuiterepairT')}>
        Rsuite
      </Button>
    </div>
  );
};

export default Home;