'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useEvaluation } from '@/hooks';
import { Navigation, Footer } from '@/components/layout';
import type { TabId } from '@/components/layout';
import { Card, Button, StatusMessage } from '@/components/ui';
import { ProviderSelector, ApiKeyInput, ModelSelector } from '@/components/providers';
import { PdfUpload, PdfSummary } from '@/components/pdf';
import { StartEvaluation, EvaluationProgress } from '@/components/evaluation';
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
import { generateHtmlReport } from '@/lib/reportExport';

export default function Home() {
  const { state, getEffectiveModel, saveConfig } = useApp();
  const { testConnection, results } = useEvaluation();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [connectionStatus, setConnectionStatus] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>({ show: false, type: 'info', message: '' });
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setConnectionStatus({ show: true, type: 'info', message: `⏳ กำลังทดสอบการเชื่อมต่อกับ Model: ${getEffectiveModel()}...` });

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
    a.download = `AcademicSAR_Report_${results.projectName || 'Evaluation'}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            {/* Step 1: AI Configuration */}
            <Card title="⚙️ ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="">
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
                    🔗 ทดสอบการเชื่อมต่อ
                  </Button>

                  <StatusMessage
                    type={connectionStatus.type}
                    message={connectionStatus.message}
                    show={connectionStatus.show}
                  />
                </>
              )}
            </Card>

            {/* Step 2: Upload PDF */}
            <Card title="📄 ขั้นตอนที่ 2: อัปโหลดเอกสารงานวิจัย" icon="">
              <PdfUpload />
              {state.pdfText && <PdfSummary />}
            </Card>

            {/* Step 3: Start Evaluation */}
            <Card title="🚀 ขั้นตอนที่ 3: เริ่มการรีวิว" icon="">
              <StartEvaluation />
            </Card>

            {/* Evaluation Progress */}
            <EvaluationProgress />

            {/* Results Section */}
            {results && (
              <div id="results-section">
                <SummaryScore />

                <Card title="👥 คณะผู้เชี่ยวชาญประเมิน" icon="">
                  <ExpertCards />
                </Card>

                <Card title="📈 คะแนนเปรียบเทียบ 8 หัวข้อ" icon="">
                  <ScoreTable />
                  <div className="mt-8">
                    <BarChart />
                  </div>
                </Card>

                <Card title="🔍 ผลการประเมินโดยละเอียด" icon="">
                  <ExpertDetailTabs />
                </Card>

                <Card title="💡 คำแนะนำสำคัญจากผู้เชี่ยวชาญ" icon="">
                  <Recommendations />
                </Card>

                <Card title="🗺️ แผนการพัฒนางานวิจัย" icon="">
                  <Roadmap />
                </Card>

                <div className="bg-white rounded-2xl shadow-md p-8 text-center no-print">
                  <div className="flex gap-4 justify-center mb-6 flex-wrap">
                    <Button onClick={handleDownloadReport} variant="success">
                      💾 บันทึกรายงาน
                    </Button>
                  </div>
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
    </main>
  );
}
