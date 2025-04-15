// src/page/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button style={{ marginRight: '1rem', color:'white'}} onClick={() => navigate('/part')}>
        ErP
      </Button>
    </div>
  );
};

export default Home;
