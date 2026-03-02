'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useEvaluation } from '@/hooks';
import { Navigation, Footer } from '@/components/layout';
import type { TabId } from '@/components/layout';
import { Card, Button, StatusMessage, QRCodeModal } from '@/components/ui';
import { ProviderSelector, ApiKeyInput, ModelSelector } from '@/components/providers';
import { PdfUpload, PdfSummary } from '@/components/pdf';
import { StartEvaluation, EvaluationProgress } from '@/components/evaluation';
import { RubricSelector, RubricBadge } from '@/components/rubric';
import {
  SummaryScore,
  ExpertCards,
  ScoreTable,
  BarChart,
  ExpertDetailTabs,
  Recommendations,
  Roadmap
} from '@/components/results';
import { UserGuide, About } from '@/components/pages';
import { generateHtmlReport, generateMarkdownReport } from '@/lib/reportExport';
import { getCriteriaByRubric } from '@/types/evaluation';

export default function Home() {
  const { state, getEffectiveModel, saveConfig } = useApp();
  const { testConnection, results, resetEvaluation } = useEvaluation();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [connectionStatus, setConnectionStatus] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>({ show: false, type: 'info', message: '' });
  const [isTesting, setIsTesting] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setConnectionStatus({ show: true, type: 'info', message: `กำลังทดสอบการเชื่อมต่อกับ Model: ${getEffectiveModel()}...` });

    const result = await testConnection();
    setConnectionStatus({
      show: true,
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    setIsTesting(false);

    if (result.success) {
      saveConfig();
    }
  };

  const handleDownloadReport = () => {
    if (!results) return;

    const htmlContent = generateHtmlReport(results);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const rubricLabel = results.rubricType === 'proposal' ? 'Proposal' : 'Thesis';
    a.download = `AcademicSAR_${rubricLabel}_Report_${results.projectName || 'Evaluation'}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    if (!results) return;

    // BOM prefix ensures Thai characters display correctly in Windows editors
    const BOM = '\uFEFF';
    const mdContent = BOM + generateMarkdownReport(results);
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const rubricLabel = results.rubricType === 'proposal' ? 'Proposal' : 'Thesis';
    a.download = `AcademicSAR_${rubricLabel}_Notes_${results.projectName || 'Evaluation'}_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNewEvaluation = () => {
    resetEvaluation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get criteria count based on rubric type
  const criteriaCount = state.config.rubricType
    ? getCriteriaByRubric(state.config.rubricType).length
    : 0;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'guide':
        return <UserGuide />;
      case 'about':
        return <About />;
      case 'home':
      default:
        return (
          <>
            {/* Donation Support Banner */}
            <div className="bg-gradient-to-r from-[#E8F5E9] via-[#F3E5F5] to-[#E3F2FD] p-6 rounded-2xl shadow-md mb-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center md:justify-start gap-2">
                    <span>☕</span> สนับสนุนผู้พัฒนา
                  </h3>
                  <p className="text-gray-600 text-sm">
                    สนับสนุนช่วยค่าเช่า Server ของ Web app นี้<br />
                    เพื่อให้สามารถบริการได้ต่อไป
                  </p>
                </div>
                <button
                  onClick={() => setIsQRModalOpen(true)}
                  className="w-28 h-28 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white p-1 flex-shrink-0 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 group relative"
                  title="คลิกเพื่อดูรูปขนาดใหญ่"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/donation-qr.jpg"
                    alt="QR Code สำหรับบริจาค"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">ดูใหญ่</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 1: AI Configuration */}
            <Card title="ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="⚙️">
              <ProviderSelector />

              {state.config.provider && (
                <>
                  <ApiKeyInput />
                  <ModelSelector />

                  <Button
                    onClick={handleTestConnection}
                    isLoading={isTesting}
                    variant="secondary"
                  >
                    ทดสอบการเชื่อมต่อ
                  </Button>

                  <StatusMessage
                    type={connectionStatus.type}
                    message={connectionStatus.message}
                    show={connectionStatus.show}
                  />
                </>
              )}
            </Card>

            {/* Step 2: Select Rubric Type */}
            <Card title="ขั้นตอนที่ 2: เลือกประเภทการประเมิน" icon="📋">
              <RubricSelector />
            </Card>

            {/* Step 3: Upload PDF */}
            <Card
              title={
                <span className="flex items-center gap-3">
                  ขั้นตอนที่ 3: อัปโหลดเอกสาร
                  {state.config.rubricType && <RubricBadge size="sm" />}
                </span>
              }
              icon="📄"
            >
              {!state.config.rubricType ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    กรุณาเลือกประเภทการประเมินในขั้นตอนที่ 2 ก่อนอัปโหลดเอกสาร
                  </p>
                </div>
              ) : (
                <>
                  <PdfUpload />
                  {state.pdfText && <PdfSummary />}
                </>
              )}
            </Card>

            {/* Step 4: Start Evaluation */}
            <Card
              title={
                <span className="flex items-center gap-3">
                  ขั้นตอนที่ 4: เริ่มการประเมิน
                  {state.config.rubricType && <RubricBadge size="sm" />}
                </span>
              }
              icon="🚀"
            >
              <StartEvaluation />
            </Card>

            {/* Evaluation Progress */}
            <EvaluationProgress />

            {/* Results Section */}
            {results && (
              <div id="results-section">
                <SummaryScore />

                <Card title="คณะผู้เชี่ยวชาญประเมิน" icon="👥">
                  <ExpertCards />
                </Card>

                <Card title={`คะแนนเปรียบเทียบ ${criteriaCount} หัวข้อ`} icon="📈">
                  <ScoreTable />
                  <div className="mt-8">
                    <BarChart />
                  </div>
                </Card>

                <Card title="ผลการประเมินโดยละเอียด" icon="🔍">
                  <ExpertDetailTabs />
                </Card>

                <Card title="คำแนะนำสำคัญจากผู้เชี่ยวชาญ" icon="💡">
                  <Recommendations />
                </Card>

                <Card title="แผนการพัฒนางานวิจัย" icon="🗺️">
                  <Roadmap />
                </Card>

                <div className="bg-white rounded-2xl shadow-md p-8 text-center no-print">
                  <p className="text-sm text-gray-500 mb-4">บันทึกผลการประเมินในรูปแบบที่ต้องการ</p>
                  <div className="flex gap-4 justify-center mb-6 flex-wrap">
                    <Button onClick={handleDownloadReport} variant="success">
                      📄 บันทึก HTML
                    </Button>
                    <Button onClick={handleDownloadMarkdown} variant="secondary">
                      📝 บันทึก Markdown (.md)
                    </Button>
                    <Button onClick={handleNewEvaluation} variant="secondary">
                      🔄 เริ่มการประเมินใหม่
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    HTML: รายงานพร้อมพิมพ์ | Markdown: นำไปศึกษาและพัฒนางานวิจัยต่อ
                  </p>
                </div>

                <Footer />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-5">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        imageSrc="/donation-qr.jpg"
        imageAlt="QR Code สำหรับบริจาค"
        downloadFileName="donation-qr-academic-sar.jpg"
      />
    </main>
  );
}
