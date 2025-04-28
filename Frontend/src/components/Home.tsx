import React, { useEffect, useRef } from 'react';
import { Radar, Shield, Eye, AlertTriangle } from 'lucide-react';

interface HomeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Radar animation
    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Generate random "threats" for the radar to detect
    const threats: { x: number; y: number; detected: boolean; size: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const distance = Math.random() * radius * 0.9;
      const threatAngle = Math.random() * Math.PI * 2;
      threats.push({
        x: centerX + Math.cos(threatAngle) * distance,
        y: centerY + Math.sin(threatAngle) * distance,
        detected: false,
        size: 2 + Math.random() * 4
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw radar circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * (i / 4), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.stroke();
      }
      
      // Draw radar lines
      for (let i = 0; i < 8; i++) {
        const lineAngle = (Math.PI / 4) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(lineAngle) * radius,
          centerY + Math.sin(lineAngle) * radius
        );
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.stroke();
      }
      
      // Draw radar sweep
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;
      
      // Draw sweep arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle - 0.1, angle);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.stroke();
      
      // Check for threat detection
      threats.forEach(threat => {
        const threatAngle = Math.atan2(threat.y - centerY, threat.x - centerX);
        const normalizedThreatAngle = threatAngle < 0 ? threatAngle + Math.PI * 2 : threatAngle;
        const normalizedSweepAngle = angle % (Math.PI * 2);
        
        // Detect if the sweep is passing over the threat
        if (Math.abs(normalizedThreatAngle - normalizedSweepAngle) < 0.1) {
          threat.detected = true;
        }
        
        // Draw threats
        if (threat.detected) {
          ctx.beginPath();
          ctx.arc(threat.x, threat.y, threat.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.fill();
          
          // Draw pulsing effect
          ctx.beginPath();
          ctx.arc(threat.x, threat.y, threat.size + 5 + Math.sin(angle * 5) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.stroke();
        }
      });
      
      // Update angle for next frame
      angle += 0.01;
      if (angle > Math.PI * 2) angle = 0;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="h-full flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
        
        <div className="relative z-10 text-center p-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Radar className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            AirGuard <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xl mb-8 text-slate-300">
            Advanced airborne threat detection powered by artificial intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors duration-200 font-medium"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </button>
            <button 
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 font-medium"
              onClick={() => setActiveSection('live-demo')}
            >
              Live Demo
            </button>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="py-16 px-6 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">About AirGuard AI</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Radar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Detection</h3>
              <p className="text-slate-300">
                Our advanced AI algorithms can detect and classify airborne threats in real-time with 99.7% accuracy.
              </p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Security</h3>
              <p className="text-slate-300">
                Get instant alerts when unauthorized aircraft or drones enter restricted airspace.
              </p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg transition-transform duration-300 hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-slate-300">
                Comprehensive reporting and analytics to help identify patterns and improve security protocols.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-slate-700 p-8 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="bg-amber-500 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Choose AirGuard AI?</h3>
                <p className="text-slate-300 mb-4">
                  In today's world, airspace security is more important than ever. Unauthorized drones and aircraft pose significant risks to critical infrastructure, public events, and private property.
                </p>
                <p className="text-slate-300">
                  AirGuard AI combines cutting-edge computer vision with advanced radar technology to provide the most comprehensive airborne threat detection system available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;