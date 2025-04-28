import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

const LiveDemo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [detections, setDetections] = useState<{ id: number; time: string; type: string; confidence: number }[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsAnalyzed(false);
      setDetections([]);
      
      // Create object URL for video preview
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.src = URL.createObjectURL(selectedFile);
        videoElement.onloadedmetadata = () => {
          videoElement.currentTime = 0;
        };
      }
    }
  };
  
  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Generate fake detection results
      const fakeDetections = [
        { id: 1, time: '00:03', type: 'Drone', confidence: 98.7 },
        { id: 2, time: '00:12', type: 'Bird', confidence: 87.2 },
        { id: 3, time: '00:25', type: 'Drone', confidence: 99.1 },
        { id: 4, time: '00:37', type: 'Aircraft', confidence: 95.8 },
        { id: 5, time: '00:52', type: 'Drone', confidence: 97.3 },
      ];
      
      setDetections(fakeDetections);
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 3000);
  };
  
  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setFile(null);
    setIsAnalyzed(false);
    setIsPlaying(false);
    setDetections([]);
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.src = '';
    }
    
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Live Demo</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Video Analysis</h2>
              
              <div className="bg-slate-900 rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center">
                {file ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls={false}
                    onEnded={() => setIsPlaying(false)}
                  ></video>
                ) : (
                  <div className="text-center p-8">
                    <Upload className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Upload a video file to analyze</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Supported formats: MP4, WebM, MOV
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center transition-colors duration-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Video
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileChange}
                />
                
                {file && (
                  <>
                    <button
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center transition-colors duration-200"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Play
                        </>
                      )}
                    </button>
                    
                    <button
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center transition-colors duration-200"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </button>
                    
                    {!isAnalyzed && !isAnalyzing && (
                      <button
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center transition-colors duration-200 ml-auto"
                        onClick={handleAnalyze}
                      >
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Analyze Threats
                      </button>
                    )}
                    
                    {isAnalyzing && (
                      <div className="px-4 py-2 bg-slate-700 rounded-lg flex items-center ml-auto">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing...
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {isAnalyzed && (
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-xl font-semibold">Analysis Complete</h2>
                </div>
                
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6">
                  <p className="text-green-400">
                    Analysis completed successfully. {detections.length} potential threats detected.
                  </p>
                </div>
                
                <h3 className="font-medium mb-3">Detection Summary</h3>
                
                <div className="bg-slate-900 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700">
                        <th className="py-2 px-4 text-left">Time</th>
                        <th className="py-2 px-4 text-left">Object Type</th>
                        <th className="py-2 px-4 text-left">Confidence</th>
                        <th className="py-2 px-4 text-left">Threat Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detections.map((detection) => (
                        <tr key={detection.id} className="border-t border-slate-700">
                          <td className="py-2 px-4">{detection.time}</td>
                          <td className="py-2 px-4">{detection.type}</td>
                          <td className="py-2 px-4">{detection.confidence.toFixed(1)}%</td>
                          <td className="py-2 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                detection.type === 'Drone'
                                  ? 'bg-red-900/30 text-red-400'
                                  : detection.type === 'Aircraft'
                                  ? 'bg-amber-900/30 text-amber-400'
                                  : 'bg-green-900/30 text-green-400'
                              }`}
                            >
                              {detection.type === 'Drone'
                                ? 'High'
                                : detection.type === 'Aircraft'
                                ? 'Medium'
                                : 'Low'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-900/50 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Video</h3>
                    <p className="text-sm text-slate-400">
                      Upload surveillance footage from your security cameras or drone detection systems.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-900/50 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">AI Analysis</h3>
                    <p className="text-sm text-slate-400">
                      Our advanced AI algorithms analyze the video frame-by-frame to detect airborne objects.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-900/50 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Threat Classification</h3>
                    <p className="text-sm text-slate-400">
                      Detected objects are classified by type and assigned a threat level based on behavior.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-900/50 text-cyan-400 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Results</h3>
                    <p className="text-sm text-slate-400">
                      Review detailed analysis with timestamps, object types, and confidence scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Detection Capabilities</h2>
              
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Commercial and consumer drones</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Fixed-wing aircraft</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Helicopters and rotorcraft</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Birds (false positive filtering)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Weather phenomena</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;