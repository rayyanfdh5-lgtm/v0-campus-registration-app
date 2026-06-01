'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, Loader2, Check, AlertCircle, X } from 'lucide-react';

interface CheckInRecord {
  id: string;
  name: string;
  registrationNumber: string;
  program: string;
  room: string;
  checkInTime: Date;
  status: 'checked-in' | 'already-checked' | 'not-found';
}

export default function CheckInPage() {
  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mock database of participants
  const mockParticipants: Record<string, any> = {
    'PMB-2024-001': {
      name: 'Budi Santoso',
      registrationNumber: 'PMB-2024-001',
      program: 'Teknik Informatika',
      room: 'Lab 1',
    },
    'PMB-2024-002': {
      name: 'Siti Nur Azizah',
      registrationNumber: 'PMB-2024-002',
      program: 'Manajemen Bisnis',
      room: 'Ruang 201',
    },
    'PMB-2024-003': {
      name: 'Ahmad Wijaya',
      registrationNumber: 'PMB-2024-003',
      program: 'Hukum',
      room: 'Ruang 301',
    },
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        scanQRCode();
      }
    } catch (error) {
      console.error('[v0] Camera error:', error);
      alert('Tidak dapat mengakses kamera. Gunakan mode manual input.');
      setMode('manual');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    if (!context) return;

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Simulate QR code detection (in production, use jsQR library)
        // For now, we'll just monitor manual input
      }

      if (isCameraActive) {
        requestAnimationFrame(scan);
      }
    };

    scan();
  };

  const processCheckIn = (registrationNumber: string) => {
    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      const participant = mockParticipants[registrationNumber];

      if (!participant) {
        setCheckInRecords((prev) => [
          {
            id: `${Date.now()}`,
            name: 'Unknown',
            registrationNumber,
            program: '-',
            room: '-',
            checkInTime: new Date(),
            status: 'not-found',
          },
          ...prev,
        ]);
        setIsProcessing(false);
        return;
      }

      // Check if already checked in
      const alreadyCheckedIn = checkInRecords.some(
        (record) => record.registrationNumber === registrationNumber && record.status === 'checked-in',
      );

      if (alreadyCheckedIn) {
        setCheckInRecords((prev) => [
          {
            id: `${Date.now()}`,
            ...participant,
            checkInTime: new Date(),
            status: 'already-checked',
          },
          ...prev,
        ]);
      } else {
        setCheckInRecords((prev) => [
          {
            id: `${Date.now()}`,
            ...participant,
            checkInTime: new Date(),
            status: 'checked-in',
          },
          ...prev,
        ]);
      }

      setManualInput('');
      setIsProcessing(false);
    }, 800);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      processCheckIn(manualInput.trim().toUpperCase());
    }
  };

  const checkedInCount = checkInRecords.filter((r) => r.status === 'checked-in').length;
  const totalCount = checkInRecords.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Peserta Check-in Ujian</h1>
          <p className="text-gray-600">Scan QR Code atau masukkan nomor peserta secara manual</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Check-in Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              {/* Mode Selector */}
              <div className="flex gap-4 mb-6">
                <Button
                  variant={mode === 'camera' ? 'default' : 'outline'}
                  onClick={() => {
                    setMode('camera');
                    if (!isCameraActive) startCamera();
                  }}
                  className="flex-1 gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Scan QR Code
                </Button>
                <Button
                  variant={mode === 'manual' ? 'default' : 'outline'}
                  onClick={() => {
                    setMode('manual');
                    stopCamera();
                  }}
                  className="flex-1"
                >
                  Input Manual
                </Button>
              </div>

              {/* Camera Mode */}
              {mode === 'camera' && (
                <div className="space-y-4">
                  {!isCameraActive ? (
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Kamera belum aktif</p>
                      <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
                        Nyalakan Kamera
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        {/* Scan overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-2 border-green-400 rounded-lg" />
                        </div>
                      </div>
                      <Button onClick={stopCamera} variant="destructive" className="w-full">
                        Matikan Kamera
                      </Button>
                      <p className="text-sm text-gray-600 text-center">
                        Arahkan kamera ke QR Code pada kartu peserta
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Manual Mode */}
              {mode === 'manual' && (
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Peserta / Registration Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Contoh: PMB-2024-001"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      disabled={isProcessing}
                      className="text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isProcessing || !manualInput.trim()}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Check-in'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Coba: PMB-2024-001, PMB-2024-002, atau PMB-2024-003
                  </p>
                </form>
              )}
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            {/* Check-in Summary */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Ringkasan Check-in</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Sudah Check-in</span>
                    <span className="text-2xl font-bold text-green-600">{checkedInCount}</span>
                  </div>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-500">Total Peserta</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                </div>
              </div>
            </Card>

            {/* Recent Check-ins */}
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Check-in Terakhir</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {checkInRecords.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">Belum ada check-in</p>
                ) : (
                  checkInRecords.slice(0, 5).map((record) => (
                    <div
                      key={record.id}
                      className={`p-3 rounded-lg border-l-4 text-xs ${
                        record.status === 'checked-in'
                          ? 'bg-green-50 border-l-green-400'
                          : record.status === 'already-checked'
                            ? 'bg-blue-50 border-l-blue-400'
                            : 'bg-red-50 border-l-red-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{record.name}</p>
                          <p className="text-gray-600">{record.registrationNumber}</p>
                        </div>
                        {record.status === 'checked-in' && (
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                        {record.status === 'already-checked' && (
                          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                        {record.status === 'not-found' && (
                          <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-gray-500 mt-1">
                        {record.checkInTime.toLocaleTimeString('id-ID')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* All Check-in Records */}
        {checkInRecords.length > 0 && (
          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Semua Peserta yang Check-in</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-700">Nama</th>
                    <th className="text-left p-3 text-gray-700">No. Peserta</th>
                    <th className="text-left p-3 text-gray-700">Program</th>
                    <th className="text-left p-3 text-gray-700">Ruangan</th>
                    <th className="text-left p-3 text-gray-700">Waktu Check-in</th>
                    <th className="text-left p-3 text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {checkInRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{record.name}</td>
                      <td className="p-3 font-mono text-xs">{record.registrationNumber}</td>
                      <td className="p-3">{record.program}</td>
                      <td className="p-3">{record.room}</td>
                      <td className="p-3">{record.checkInTime.toLocaleTimeString('id-ID')}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'checked-in'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'already-checked'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {record.status === 'checked-in'
                            ? 'Berhasil'
                            : record.status === 'already-checked'
                              ? 'Sudah Check-in'
                              : 'Tidak Ditemukan'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
