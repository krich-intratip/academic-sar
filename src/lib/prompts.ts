// Prompt Generation for Expert Evaluation

import { RubricType } from '@/types/app';
import { Expert, experts, RubricCriteria, proposalCriteria, thesisCriteria, getCriteriaByRubric } from '@/types/evaluation';

// Get rubric type label in Thai
function getRubricLabel(rubricType: RubricType): string {
    return rubricType === 'proposal' ? 'โครงร่างวิทยานิพนธ์ (บทที่ 1-3)' : 'วิทยานิพนธ์ฉบับเต็ม (5 บท)';
}

// Get scoring interpretation for rubric type
function getScoringInterpretation(rubricType: RubricType): string {
    if (rubricType === 'proposal') {
        return `ผลการพิจารณาโครงร่าง:
- คะแนน 80-100: อนุมัติ (Approve) - พร้อมดำเนินการวิจัย
- คะแนน 60-79: อนุมัติแบบมีเงื่อนไข (Approve with Conditions) - ต้องแก้ไขบางประเด็น
- คะแนนต่ำกว่า 60: ไม่อนุมัติ (Disapprove) - ต้องจัดทำโครงร่างใหม่`;
    }
    return `ผลการพิจารณาวิทยานิพนธ์:
- คะแนน 80-100: ดีมาก (ผ่านฉลุย) - Minor revisions
- คะแนน 70-79: ดี (ผ่าน) - Moderate revisions
- คะแนน 60-69: พอใช้ (แก้ไขมาก) - Major revisions
- คะแนนต่ำกว่า 60: ไม่ผ่าน - ต้องปรับปรุงอย่างมาก`;
}

// Generate criteria list for prompt
function generateCriteriaPrompt(criteria: RubricCriteria[]): string {
    // Group criteria by chapter
    const grouped: Record<string, RubricCriteria[]> = {};
    criteria.forEach(c => {
        const chapter = c.chapter || 'อื่นๆ';
        if (!grouped[chapter]) grouped[chapter] = [];
        grouped[chapter].push(c);
    });

    let result = '';
    for (const [chapter, items] of Object.entries(grouped)) {
        const chapterTotal = items.reduce((sum, item) => sum + item.maxScore, 0);
        result += `\n【${chapter}】 (รวม ${chapterTotal} คะแนน)\n`;
        items.forEach(item => {
            result += `${item.id}. ${item.name} (${item.maxScore} คะแนน)`;
            if (item.description) {
                result += ` - ${item.description}`;
            }
            result += '\n';
        });
    }
    return result;
}

export function generateExpertPrompt(expertId: string, pdfText: string, rubricType: RubricType): string {
    const expert = experts[expertId];
    const criteria = getCriteriaByRubric(rubricType);
    const rubricLabel = getRubricLabel(rubricType);
    const scoringInterpretation = getScoringInterpretation(rubricType);
    const criteriaPrompt = generateCriteriaPrompt(criteria);

    // Calculate max possible score for each criterion (for scoring guidance)
    const criteriaScoreGuide = criteria.map(c =>
        `${c.id}. ${c.name}: ให้คะแนน 0-${c.maxScore} คะแนน`
    ).join('\n');

    return `คุณคือ "${expert.name}" - ${expert.title}

ประสบการณ์: ${expert.experience}
จุดเน้นในการประเมิน: ${expert.focus}
คำถามหลักที่ใช้: ${expert.questions}

คุณได้รับมอบหมายให้รีวิว **${rubricLabel}** ต่อไปนี้:

===== เอกสารงานวิจัย =====
${pdfText}
===== สิ้นสุดเอกสาร =====

กรุณารีวิวงานวิจัยนี้ตามเกณฑ์การประเมินดังนี้:
${criteriaPrompt}

**${scoringInterpretation}**

**หลักการให้คะแนน:**
- ให้คะแนนตามคุณภาพจริงที่พบในเอกสาร โดยใช้คะแนนเต็มของแต่ละเกณฑ์
- คะแนนเต็มหมายถึงดีเยี่ยม ตรงตามเกณฑ์ทุกประการ
- คะแนน 0 หมายถึงไม่มีเนื้อหาในส่วนนี้หรือบกพร่องอย่างมาก
- คะแนนระหว่างกลางให้ตามระดับคุณภาพที่พบ

**เกณฑ์การให้คะแนน:**
${criteriaScoreGuide}

กรุณาตอบกลับในรูปแบบ JSON ที่ถูกต้องตามโครงสร้างนี้เท่านั้น (ไม่ต้องมี markdown code block):

{
  "expertId": "${expertId}",
  "paperTitle": "ชื่องานวิจัยที่อ่านได้จากเอกสาร",
  "authors": "ชื่อผู้แต่งหรือชื่อนักศึกษา",
  "publicationReadiness": "excellent/very_good/good/fair/poor",
  "overallComment": "ความเห็นโดยรวมต่องานวิจัยนี้จากมุมมองของคุณ (3-5 ประโยค)",
  "scores": [
    ${criteria.map(c => `{"criteriaId": ${c.id}, "score": 0-${c.maxScore}, "reason": "เหตุผลการให้คะแนน (ระบุจุดเด่นและจุดที่ต้องแก้ไข)"}`).join(',\n    ')}
  ],
  "strengths": ["จุดแข็ง 1 (ระบุเฉพาะเจาะจง)", "จุดแข็ง 2", "จุดแข็ง 3", "จุดแข็ง 4"],
  "weaknesses": ["จุดอ่อน 1 (ระบุเฉพาะเจาะจง)", "จุดอ่อน 2", "จุดอ่อน 3", "จุดอ่อน 4"],
  "recommendations": [
    {"priority": "critical", "title": "หัวข้อคำแนะนำ", "detail": "รายละเอียดการแก้ไข (เฉพาะเจาะจง)", "expectedResult": "ผลที่คาดหวังเมื่อแก้ไขแล้ว"},
    {"priority": "high", "title": "หัวข้อ", "detail": "รายละเอียด", "expectedResult": "ผลที่คาดหวัง"},
    {"priority": "enhancement", "title": "หัวข้อ", "detail": "รายละเอียด", "expectedResult": "ผลที่คาดหวัง"}
  ],
  "summaryQuote": "คำพูดสั้นๆ สรุปความเห็น (1-2 ประโยค)"
}

สำคัญมาก:
- ตอบเฉพาะ JSON เท่านั้น ไม่ต้องมีข้อความอื่นใดก่อนหรือหลัง JSON
- ให้คะแนนตามช่วงคะแนนของแต่ละเกณฑ์ (ไม่ใช่ 1-4 แบบเดิม)
- ต้องมี scores ครบทุก ${criteria.length} เกณฑ์`;
}

export function generateSummaryPrompt(pdfText: string): string {
  return `คุณเป็นผู้เชี่ยวชาญด้านการวิเคราะห์เอกสารโครงการ Academic SAR (Self-Assessment Report)

กรุณาวิเคราะห์และสรุปเอกสารงานวิจัยต่อไปนี้เป็นประเด็นสำคัญ:

===== เอกสาร =====
${pdfText.substring(0, 15000)}
===== สิ้นสุดเอกสาร =====

กรุณาสรุปเป็น HTML โดยใช้โครงสร้างนี้ (ตอบเฉพาะ HTML ไม่ต้องมี markdown):

<div class="space-y-4">
  <div class="bg-white p-4 rounded-lg border">
    <h4 class="font-semibold text-lg mb-2">ข้อมูลทั่วไปของงานวิจัย</h4>
    <p><strong>ชื่อเรื่อง:</strong> [ชื่อ]</p>
    <p><strong>ผู้แต่ง/สังกัด:</strong> [ข้อมูล]</p>
    <p><strong>ประเภท:</strong> [ประเภทงานวิจัย]</p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h4 class="font-semibold text-lg mb-2">วัตถุประสงค์และคำถามวิจัย</h4>
    <p>[สรุปวัตถุประสงค์]</p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h4 class="font-semibold text-lg mb-2">ระเบียบวิธีวิจัย</h4>
    <p>[สรุปวิธีการวิจัย]</p>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h4 class="font-semibold text-lg mb-2">ผลการวิจัยหลัก</h4>
    <ul class="list-disc pl-5">
      <li>[ผลลัพธ์ที่สำคัญ 1]</li>
      <li>[ผลลัพธ์ที่สำคัญ 2]</li>
    </ul>
  </div>

  <div class="bg-white p-4 rounded-lg border">
    <h4 class="font-semibold text-lg mb-2">ประเด็นสำคัญที่พบ</h4>
    <ul class="list-disc pl-5">
      <li><strong>จุดแข็ง:</strong> [สิ่งที่ทำได้ดี]</li>
      <li><strong>จุดที่ต้องปรับปรุง:</strong> [สิ่งที่ขาด/ต้องเพิ่ม]</li>
    </ul>
  </div>
</div>

หากข้อมูลไหนไม่พบในเอกสาร ให้ระบุว่า "[ไม่พบข้อมูลในเอกสาร]"
สำคัญ: ตอบเฉพาะ HTML เท่านั้น ไม่ต้องมี markdown code blocks`;
}

export function generateImprovedDraftPrompt(
  projectName: string,
  organizationName: string,
  totalScore: number,
  percentage: number,
  recommendations: Array<{ priority: string; title: string; detail: string; source: string }>,
  strengths: string[],
  weaknesses: string[]
): string {
  return `คุณเป็นผู้เชี่ยวชาญด้านการเขียนเอกสารวิจัยทางวิชาการ กรุณาสร้างร่างเอกสารงานวิจัยฉบับปรับปรุงใหม่ โดยนำคำแนะนำจากผู้เชี่ยวชาญมาปรับใช้

ข้อมูลงานวิจัยเดิม:
- ชื่อเรื่อง: ${projectName}
- สังกัด: ${organizationName}
- คะแนนรวม: ${totalScore.toFixed(1)}/100 (${percentage.toFixed(1)}%)

คำแนะนำจากผู้เชี่ยวชาญที่ต้องนำไปปรับปรุง:
${recommendations.map(r => `- [${r.priority}] ${r.title}: ${r.detail} (จาก: ${r.source})`).join('\n')}

จุดแข็งที่ต้องรักษา:
${strengths.slice(0, 5).map(s => `- ${s}`).join('\n')}

จุดอ่อนที่ต้องแก้ไข:
${weaknesses.slice(0, 5).map(w => `- ${w}`).join('\n')}

กรุณาสร้างเอกสารวิจัยฉบับปรับปรุงในรูปแบบ HTML (ตอบเป็น HTML เท่านั้น ไม่ต้องมี markdown):

<div class="space-y-6">
  <div class="bg-white p-6 rounded-lg border">
    <h3 class="font-bold text-xl mb-4 text-blue-800">1. ชื่อเรื่องและบทคัดย่อที่ปรับปรุง</h3>
    <div class="space-y-2">
      <p><strong>ชื่อเรื่อง (ปรับปรุงให้ชัดเจน SMART):</strong></p>
      <p>[ชื่อเรื่องใหม่]</p>
      <p><strong>บทคัดย่อ:</strong></p>
      <p>[บทคัดย่อที่ครบถ้วน]</p>
    </div>
  </div>

  <!-- ส่วนอื่นๆ ตามโครงสร้างงานวิจัยมาตรฐาน -->
</div>

สำหรับข้อมูลที่ไม่สามารถอนุมานได้ ให้ใส่:
<div class="bg-orange-50 border-l-4 border-orange-500 p-3 my-2">
  <strong>ต้องเพิ่มข้อมูล:</strong> [อธิบายว่าต้องเพิ่มอะไร]
</div>

ทุกส่วนต้องเขียนให้ได้คะแนนดีเยี่ยมตามเกณฑ์ ใช้ภาษาไทยทั้งหมด`;
}
