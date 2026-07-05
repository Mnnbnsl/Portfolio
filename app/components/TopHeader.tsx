'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import avatarImage from '@/assets/avatar.jpg';

export default function TopHeader() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setTime(currentTime);
    };

    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="top-header" aria-label="Profile header">
      <div className="header-container">
        <div className="header-left">
          <div className="avatar-small" aria-hidden="true">
            <Image 
              src={avatarImage} 
              alt="Manan Bansal"
              fill
              className="avatar-small-image"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        
        <div className="header-center">
          <h2>Manan Bansal</h2>
          <p>AI & Full-Stack Developer</p>
        </div>

        <div className="header-right">
          <span className="time">{time}</span>
        </div>
      </div>
    </header>
  );
}
