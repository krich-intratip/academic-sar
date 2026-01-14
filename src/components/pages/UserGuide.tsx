'use client';

import { Card } from '@/components/ui';

export default function UserGuide() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#E8F5E9] to-[#E3F2FD] p-8 rounded-2xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1565C0] mb-4">
                    📖 คู่มือการใช้งาน
                </h2>
                <p className="text-gray-600">
                    ขั้นตอนการใช้งานระบบรีวิวงานวิจัยทางวิชาการ
                </p>
            </div>

            {/* Step 1 */}
            <Card title="ขั้นตอนที่ 1: ตั้งค่า AI Provider" icon="⚙️">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก AI Provider</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก Provider ที่ต้องการใช้งาน ได้แก่ Google Gemini (แนะนำ - ฟรี), OpenAI, หรือ OpenRouter
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">กรอก API Key</h4>
                            <p className="text-gray-600 text-sm">
                                กรอก API Key ของ Provider ที่เลือก สามารถขอรับ API Key ฟรีได้จากลิงก์ที่ระบุ
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h4 className="font-semibold mb-1">เลือก Model</h4>
                            <p className="text-gray-600 text-sm">
                                เลือก AI Model ที่ต้องการใช้ โดยระบบแนะนำให้ใช้ Gemini 2.5 Flash หรือ Pro
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1565C0] text-white rounded-full flex items-center justify-center font-bold">4</span>
                        <div>
                            <h4 className="font-semibold mb-1">ทดสอบการเชื่อมต่อ</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม "ทดสอบการเชื่อมต่อ" เพื่อตรวจสอบว่า API Key และ Model ทำงานได้ถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Step 2 */}
            <Card title="ขั้นตอนที่ 2: อัปโหลดเอกสารงานวิจัย" icon="📄">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">อัปโหลดไฟล์ PDF</h4>
                            <p className="text-gray-600 text-sm">
                                คลิกพื้นที่อัปโหลดหรือลากไฟล์ PDF ของงานวิจัยที่ต้องการประเมินมาวาง
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#388E3C] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">ตรวจสอบการอ่านเอกสาร</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงข้อมูลสรุปของเอกสารที่อัปโหลด ให้ตรวจสอบความถูกต้อง
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <p className="text-sm text-orange-700">
                        <strong>💡 คำแนะนำ:</strong> ใช้ไฟล์ PDF ที่มีข้อความสามารถ copy ได้ (ไม่ใช่ภาพสแกน) จะให้ผลการประเมินที่แม่นยำกว่า
                    </p>
                </div>
            </Card>

            {/* Step 3 */}
            <Card title="ขั้นตอนที่ 3: เริ่มการรีวิว" icon="🚀">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">กดปุ่ม "เริ่มการรีวิว"</h4>
                            <p className="text-gray-600 text-sm">
                                เมื่อตั้งค่าและอัปโหลดเอกสารเรียบร้อย ให้กดปุ่มเริ่มการรีวิว
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#7B1FA2] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">รอผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะใช้ AI ผู้เชี่ยวชาญ 3 ท่านประเมินงานวิจัย (ใช้เวลาประมาณ 1-2 นาที)
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Step 4 */}
            <Card title="ขั้นตอนที่ 4: ดูผลการประเมินและบันทึกรายงาน" icon="📊">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h4 className="font-semibold mb-1">ดูผลการประเมิน</h4>
                            <p className="text-gray-600 text-sm">
                                ระบบจะแสดงคะแนนรวม, ผลการประเมินจากผู้เชี่ยวชาญแต่ละท่าน, จุดแข็ง-จุดอ่อน และคำแนะนำ
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#E65100] text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h4 className="font-semibold mb-1">บันทึกรายงาน</h4>
                            <p className="text-gray-600 text-sm">
                                กดปุ่ม "บันทึกรายงาน" เพื่อดาวน์โหลดผลการประเมินเป็นไฟล์ HTML
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Evaluation Criteria */}
            <Card title="เกณฑ์การประเมิน 8 หัวข้อ" icon="📝">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold">1. ชื่อเรื่องและบทคัดย่อ</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×2)</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold">2. บทนำและการทบทวนวรรณกรรม</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×3)</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold">3. คำถามวิจัยและวัตถุประสงค์</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×3)</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                        <span className="font-semibold">4. ระเบียบวิธีวิจัย</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×4)</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                        <span className="font-semibold">5. ผลการวิจัยและการวิเคราะห์ข้อมูล</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×4)</span>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <span className="font-semibold">6. การอภิปรายผล</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×3)</span>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <span className="font-semibold">7. สรุปและข้อเสนอแนะ</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×2)</span>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <span className="font-semibold">8. การอ้างอิงและรูปแบบการเขียน</span>
                        <span className="text-gray-500 text-sm ml-2">(น้ำหนัก ×2)</span>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">ระดับคะแนน:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#81C784] rounded"></span>
                            <span>4 = ดีเยี่ยม</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#FFD54F] rounded"></span>
                            <span>3 = ดี</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#FFB74D] rounded"></span>
                            <span>2 = พอใช้</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#E57373] rounded"></span>
                            <span>1 = ต้องปรับปรุง</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
