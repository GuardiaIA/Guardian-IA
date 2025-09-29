import React, { useRef, useEffect, useCallback, useState } from 'react';

interface CameraViewProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { exact: mode }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error(`Error starting ${mode} camera:`, err);
      // Fallback to default if exact mode fails (e.g., on desktops)
      if (mode === 'environment') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
        } catch (fallbackErr) {
             console.error("Error accessing any camera:", fallbackErr);
             alert("No se pudo acceder a la cámara. Por favor, revise los permisos.");
             onClose();
        }
      } else {
        alert(`No se pudo acceder a la cámara ${mode}.`);
        onClose();
      }
    }
  }, [onClose]);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode, startCamera]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setCapturedImage(dataUrl);
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, []);

  const handleConfirm = useCallback(() => {
    if (capturedImage) {
        fetch(capturedImage)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
                onCapture(file);
                onClose();
            });
    }
  }, [capturedImage, onCapture, onClose]);
  
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };
  
  const handleSwitchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    setCapturedImage(null);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
        {capturedImage ? (
            <img src={capturedImage} alt="Captura" className="w-full h-full object-contain" />
        ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="mt-6 flex items-center justify-center w-full max-w-4xl">
        {capturedImage ? (
          <div className="flex items-center gap-8">
            <button onClick={handleRetake} className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
              Reintentar
            </button>
            <button onClick={handleConfirm} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Confirmar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around w-full">
             <button onClick={handleSwitchCamera} className="p-4 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition" aria-label="Cambiar cámara">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
             </button>
             <button
                onClick={handleCapture}
                className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                aria-label="Capturar foto"
             />
             <div className="w-14 h-14"></div> {/* Placeholder for spacing */}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-slate-800 bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition"
        aria-label="Cerrar cámara"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CameraView;
