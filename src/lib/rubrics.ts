// Rubric Configuration and Data
import { RubricType, RubricInfo } from '@/types/app';

export const rubricInfoList: RubricInfo[] = [
    {
        id: 'proposal',
        name: 'โครงร่างวิทยานิพนธ์',
        shortName: 'Proposal',
        description: 'สำหรับประเมินโครงร่างวิทยานิพนธ์ (บทที่ 1-3)',
        chapters: 'บทที่ 1-3',
        icon: '📝',
        color: '#E3F2FD',
        borderColor: '#1976D2'
    },
    {
        id: 'thesis',
        name: 'วิทยานิพนธ์ฉบับเต็ม',
        shortName: 'Full Thesis',
        description: 'สำหรับประเมินวิทยานิพนธ์ฉบับเต็ม (5 บท)',
        chapters: '5 บท',
        icon: '📚',
        color: '#F3E5F5',
        borderColor: '#7B1FA2'
    }
];

export const getRubricInfo = (rubricType: RubricType): RubricInfo | undefined => {
    return rubricInfoList.find(r => r.id === rubricType);
};

// Proposal Rubric Criteria (บทที่ 1-3) - 100 คะแนน
export interface RubricCriteria {
    id: number;
    name: string;
    weight: number;
    maxScore: number;
    chapter?: string;
}

export const proposalCriteria: RubricCriteria[] = [
    // บทที่ 1: บทนำ (25 คะแนน)
    { id: 1, name: 'ที่มาและความสำคัญของปัญหา', weight: 10, maxScore: 10, chapter: 'บทที่ 1' },
    { id: 2, name: 'คำถามการวิจัยและวัตถุประสงค์', weight: 5, maxScore: 5, chapter: 'บทที่ 1' },
    { id: 3, name: 'กรอบแนวคิดการวิจัย', weight: 5, maxScore: 5, chapter: 'บทที่ 1' },
    { id: 4, name: 'ขอบเขตและนิยามศัพท์', weight: 5, maxScore: 5, chapter: 'บทที่ 1' },
    // บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง (25 คะแนน)
    { id: 5, name: 'ความครอบคลุมและทันสมัย', weight: 10, maxScore: 10, chapter: 'บทที่ 2' },
    { id: 6, name: 'การสังเคราะห์และการวิเคราะห์', weight: 10, maxScore: 10, chapter: 'บทที่ 2' },
    { id: 7, name: 'คุณภาพแหล่งข้อมูล', weight: 5, maxScore: 5, chapter: 'บทที่ 2' },
    // บทที่ 3: ระเบียบวิธีวิจัย (40 คะแนน)
    { id: 8, name: 'แบบแผนการวิจัย (Research Design)', weight: 10, maxScore: 10, chapter: 'บทที่ 3' },
    { id: 9, name: 'ประชากรและกลุ่มตัวอย่าง', weight: 10, maxScore: 10, chapter: 'บทที่ 3' },
    { id: 10, name: 'เครื่องมือวิจัยและการตรวจสอบคุณภาพ', weight: 10, maxScore: 10, chapter: 'บทที่ 3' },
    { id: 11, name: 'การเก็บรวบรวมและการวิเคราะห์ข้อมูล', weight: 5, maxScore: 5, chapter: 'บทที่ 3' },
    { id: 12, name: 'แผนการดำเนินงาน (Timeline)', weight: 5, maxScore: 5, chapter: 'บทที่ 3' },
    // มาตรฐานวิชาการและการนำเสนอ (10 คะแนน)
    { id: 13, name: 'การเขียนและการอ้างอิง', weight: 5, maxScore: 5, chapter: 'มาตรฐานวิชาการ' },
    { id: 14, name: 'ความพร้อมและการนำเสนอ', weight: 5, maxScore: 5, chapter: 'มาตรฐานวิชาการ' }
];

// Thesis Rubric Criteria (5 บท) - 100 คะแนน
export const thesisCriteria: RubricCriteria[] = [
    // บทที่ 1: บทนำและกรอบปัญหา (15 คะแนน)
    { id: 1, name: 'ที่มาและความสำคัญของปัญหา', weight: 3, maxScore: 3, chapter: 'บทที่ 1' },
    { id: 2, name: 'คำถามการวิจัยและวัตถุประสงค์', weight: 4, maxScore: 4, chapter: 'บทที่ 1' },
    { id: 3, name: 'ขอบเขตและนิยามศัพท์', weight: 3, maxScore: 3, chapter: 'บทที่ 1' },
    { id: 4, name: 'กรอบแนวคิดการวิจัย', weight: 3, maxScore: 3, chapter: 'บทที่ 1' },
    { id: 5, name: 'ประโยชน์ที่คาดว่าจะได้รับ', weight: 2, maxScore: 2, chapter: 'บทที่ 1' },
    // บทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง (15 คะแนน)
    { id: 6, name: 'ความครอบคลุมและความทันสมัย', weight: 4, maxScore: 4, chapter: 'บทที่ 2' },
    { id: 7, name: 'การสังเคราะห์เนื้อหา', weight: 5, maxScore: 5, chapter: 'บทที่ 2' },
    { id: 8, name: 'การระบุช่องว่างทางความรู้', weight: 3, maxScore: 3, chapter: 'บทที่ 2' },
    { id: 9, name: 'คุณภาพของแหล่งอ้างอิง', weight: 3, maxScore: 3, chapter: 'บทที่ 2' },
    // บทที่ 3: ระเบียบวิธีวิจัย (20 คะแนน)
    { id: 10, name: 'แบบแผนการวิจัย', weight: 4, maxScore: 4, chapter: 'บทที่ 3' },
    { id: 11, name: 'ประชากรและกลุ่มตัวอย่าง', weight: 4, maxScore: 4, chapter: 'บทที่ 3' },
    { id: 12, name: 'เครื่องมือวิจัย', weight: 4, maxScore: 4, chapter: 'บทที่ 3' },
    { id: 13, name: 'การเก็บรวบรวมข้อมูล', weight: 4, maxScore: 4, chapter: 'บทที่ 3' },
    { id: 14, name: 'การวิเคราะห์ข้อมูล', weight: 4, maxScore: 4, chapter: 'บทที่ 3' },
    // บทที่ 4: ผลการวิจัย (20 คะแนน)
    { id: 15, name: 'การนำเสนอที่เป็นระบบ', weight: 5, maxScore: 5, chapter: 'บทที่ 4' },
    { id: 16, name: 'ความถูกต้องของข้อมูล', weight: 5, maxScore: 5, chapter: 'บทที่ 4' },
    { id: 17, name: 'การตีความ', weight: 5, maxScore: 5, chapter: 'บทที่ 4' },
    { id: 18, name: 'ความโปร่งใส', weight: 5, maxScore: 5, chapter: 'บทที่ 4' },
    // บทที่ 5: อภิปรายผลและข้อเสนอแนะ (20 คะแนน)
    { id: 19, name: 'การสรุปผล', weight: 5, maxScore: 5, chapter: 'บทที่ 5' },
    { id: 20, name: 'การอภิปรายผล', weight: 10, maxScore: 10, chapter: 'บทที่ 5' },
    { id: 21, name: 'ข้อเสนอแนะ', weight: 5, maxScore: 5, chapter: 'บทที่ 5' },
    // มาตรฐานวิชาการและจริยธรรม (10 คะแนน)
    { id: 22, name: 'การเขียนเชิงวิชาการ', weight: 4, maxScore: 4, chapter: 'มาตรฐานวิชาการ' },
    { id: 23, name: 'การอ้างอิง', weight: 3, maxScore: 3, chapter: 'มาตรฐานวิชาการ' },
    { id: 24, name: 'จริยธรรม', weight: 3, maxScore: 3, chapter: 'มาตรฐานวิชาการ' }
];

export const getCriteriaByRubric = (rubricType: RubricType): RubricCriteria[] => {
    return rubricType === 'proposal' ? proposalCriteria : thesisCriteria;
};

// Score interpretation for Proposal
export const proposalScoreInterpretation = {
    pass: { min: 80, max: 100, label: 'อนุมัติ (Approve)', color: '#4CAF50' },
    conditional: { min: 60, max: 79, label: 'อนุมัติแบบมีเงื่อนไข (Approve with Conditions)', color: '#FF9800' },
    fail: { min: 0, max: 59, label: 'ไม่อนุมัติ (Disapprove)', color: '#F44336' }
};

// Score interpretation for Thesis
export const thesisScoreInterpretation = {
    excellent: { min: 80, max: 100, label: 'ดีมาก / ผ่านฉลุย', color: '#4CAF50' },
    good: { min: 70, max: 79, label: 'ดี / ผ่าน', color: '#8BC34A' },
    fair: { min: 60, max: 69, label: 'พอใช้ / แก้ไขมาก', color: '#FF9800' },
    fail: { min: 0, max: 59, label: 'ไม่ผ่าน', color: '#F44336' }
};

export const getScoreInterpretation = (rubricType: RubricType, percentage: number): { label: string; color: string } => {
    if (rubricType === 'proposal') {
        if (percentage >= 80) return proposalScoreInterpretation.pass;
        if (percentage >= 60) return proposalScoreInterpretation.conditional;
        return proposalScoreInterpretation.fail;
    } else {
        if (percentage >= 80) return thesisScoreInterpretation.excellent;
        if (percentage >= 70) return thesisScoreInterpretation.good;
        if (percentage >= 60) return thesisScoreInterpretation.fair;
        return thesisScoreInterpretation.fail;
    }
};
