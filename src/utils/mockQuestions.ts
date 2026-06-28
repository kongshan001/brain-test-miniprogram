import type { Question, QuestionType } from '@/types';

const MOCK_QUESTIONS: Question[] = [
  // ============ LOGIC (推理) — 40 题 ============
  { _id: 'L01', type: 'logic', difficulty: 1, content: { text: '2, 4, 6, 8, ?' }, options: [{ key: 'A', text: '10' }, { key: 'B', text: '11' }, { key: 'C', text: '12' }, { key: 'D', text: '9' }], answer: 'A', time_limit: 25 },
  { _id: 'L02', type: 'logic', difficulty: 1, content: { text: '所有 A 都是 B，所有 B 都是 C，那么？' }, options: [{ key: 'A', text: '所有 A 都是 C' }, { key: 'B', text: '所有 C 都是 A' }, { key: 'C', text: 'A 和 C 无关' }, { key: 'D', text: 'B 和 A 无关' }], answer: 'A', time_limit: 30 },
  { _id: 'L03', type: 'logic', difficulty: 1, content: { text: '医生对于医院，相当于老师对于？' }, options: [{ key: 'A', text: '学生' }, { key: 'B', text: '学校' }, { key: 'C', text: '课本' }, { key: 'D', text: '教室' }], answer: 'B', time_limit: 25 },
  { _id: 'L04', type: 'logic', difficulty: 1, content: { text: '小明比小红高，小红比小刚高，谁最矮？' }, options: [{ key: 'A', text: '小明' }, { key: 'B', text: '小红' }, { key: 'C', text: '小刚' }, { key: 'D', text: '一样高' }], answer: 'C', time_limit: 25 },
  { _id: 'L05', type: 'logic', difficulty: 1, content: { text: '红色对于停止，相当于绿色对于？' }, options: [{ key: 'A', text: '等待' }, { key: 'B', text: '通行' }, { key: 'C', text: '减速' }, { key: 'D', text: '停车' }], answer: 'B', time_limit: 25 },
  { _id: 'L06', type: 'logic', difficulty: 1, content: { text: '○□○□○□，下一个是什么？' }, options: [{ key: 'A', text: '○' }, { key: 'B', text: '□' }, { key: 'C', text: '△' }, { key: 'D', text: '☆' }], answer: 'A', time_limit: 25 },
  { _id: 'L07', type: 'logic', difficulty: 1, content: { text: '"大"的反义词是？' }, options: [{ key: 'A', text: '高' }, { key: 'B', text: '小' }, { key: 'C', text: '多' }, { key: 'D', text: '宽' }], answer: 'B', time_limit: 20 },
  { _id: 'L08', type: 'logic', difficulty: 1, content: { text: '鸟儿对于天空，相当于鱼儿对于？' }, options: [{ key: 'A', text: '陆地' }, { key: 'B', text: '水中' }, { key: 'C', text: '食物' }, { key: 'D', text: '鱼缸' }], answer: 'B', time_limit: 25 },
  { _id: 'L09', type: 'logic', difficulty: 1, content: { text: '△△□△△□△△，下一个是什么？' }, options: [{ key: 'A', text: '△' }, { key: 'B', text: '□' }, { key: 'C', text: '○' }, { key: 'D', text: '☆' }], answer: 'B', time_limit: 30 },
  { _id: 'L10', type: 'logic', difficulty: 1, content: { text: '手指对于手，相当于脚趾对于？' }, options: [{ key: 'A', text: '腿' }, { key: 'B', text: '脚' }, { key: 'C', text: '鞋' }, { key: 'D', text: '袜子' }], answer: 'B', time_limit: 25 },
  { _id: 'L11', type: 'logic', difficulty: 2, content: { text: '如果所有的猫都怕水，Tom是一只猫，那么？' }, options: [{ key: 'A', text: 'Tom怕水' }, { key: 'B', text: 'Tom不怕水' }, { key: 'C', text: 'Tom喜欢水' }, { key: 'D', text: '无法确定' }], answer: 'A', time_limit: 30 },
  { _id: 'L12', type: 'logic', difficulty: 2, content: { text: '有些花是红色的，所有玫瑰都是花，那么？' }, options: [{ key: 'A', text: '所有玫瑰都是红色的' }, { key: 'B', text: '有些玫瑰可能是红色的' }, { key: 'C', text: '所有红色的花都是玫瑰' }, { key: 'D', text: '玫瑰不是花' }], answer: 'B', time_limit: 35 },
  { _id: 'L13', type: 'logic', difficulty: 2, content: { text: '甲说：乙说谎。乙说：丙说谎。丙说：甲和乙都说谎。谁说真话？' }, options: [{ key: 'A', text: '甲' }, { key: 'B', text: '乙' }, { key: 'C', text: '丙' }, { key: 'D', text: '都说谎' }], answer: 'B', time_limit: 40 },
  { _id: 'L14', type: 'logic', difficulty: 2, content: { text: 'ABC三人中只有一个说真话。A说"不是我"，B说"是C"，C说"不是我"。是谁？' }, options: [{ key: 'A', text: 'A' }, { key: 'B', text: 'B' }, { key: 'C', text: 'C' }, { key: 'D', text: '无法确定' }], answer: 'A', time_limit: 40 },
  { _id: 'L15', type: 'logic', difficulty: 2, content: { text: '三个盒子只有一个有宝石。A盒写"宝石在这里"，B盒写"宝石不在这里"，C盒写"宝石不在A盒"。只有一句真话，宝石在哪？' }, options: [{ key: 'A', text: 'A盒' }, { key: 'B', text: 'B盒' }, { key: 'C', text: 'C盒' }, { key: 'D', text: '不在任何一个' }], answer: 'B', time_limit: 45 },
  { _id: 'L16', type: 'logic', difficulty: 2, content: { text: '笔:写::刀:?' }, options: [{ key: 'A', text: '锋利' }, { key: 'B', text: '切割' }, { key: 'C', text: '工具' }, { key: 'D', text: '金属' }], answer: 'B', time_limit: 30 },
  { _id: 'L17', type: 'logic', difficulty: 2, content: { text: '"热"对于"冷"，相当于"高"对于？' }, options: [{ key: 'A', text: '大' }, { key: 'B', text: '低' }, { key: 'C', text: '远' }, { key: 'D', text: '近' }], answer: 'B', time_limit: 30 },
  { _id: 'L18', type: 'logic', difficulty: 2, content: { text: '寻找规律：EC, FD, GE, HF, ?' }, options: [{ key: 'A', text: 'IG' }, { key: 'B', text: 'GI' }, { key: 'C', text: 'JG' }, { key: 'D', text: 'IH' }], answer: 'A', time_limit: 40 },
  { _id: 'L19', type: 'logic', difficulty: 2, content: { text: '如果 5+3=28, 9+1=810, 8+6=214, 那么 7+3=?' }, options: [{ key: 'A', text: '410' }, { key: 'B', text: '210' }, { key: 'C', text: '104' }, { key: 'D', text: '1010' }], answer: 'A', time_limit: 40 },
  { _id: 'L20', type: 'logic', difficulty: 2, content: { text: '寻找规律：1A, 2B, 3C, 4D, ?' }, options: [{ key: 'A', text: '5E' }, { key: 'B', text: '5F' }, { key: 'C', text: '6E' }, { key: 'D', text: '4E' }], answer: 'A', time_limit: 30 },
  { _id: 'L21', type: 'logic', difficulty: 3, content: { text: '一个岛上，有骑士（总说真话）和无赖（总说假话）。A说"B是无赖"，B说"A和C是同一种人"。C是什么？' }, options: [{ key: 'A', text: '骑士' }, { key: 'B', text: '无赖' }, { key: 'C', text: '无法确定' }, { key: 'D', text: '有时真有时假' }], answer: 'A', time_limit: 50 },
  { _id: 'L22', type: 'logic', difficulty: 3, content: { text: '"所有的A都是B"的反面是？' }, options: [{ key: 'A', text: '所有A都不是B' }, { key: 'B', text: '有的A不是B' }, { key: 'C', text: '所有B都是A' }, { key: 'D', text: 'B和A无关' }], answer: 'B', time_limit: 40 },
  { _id: 'L23', type: 'logic', difficulty: 3, content: { text: '如果昨天是明天的话，那今天就是星期五了。实际上今天是星期几？' }, options: [{ key: 'A', text: '星期三' }, { key: 'B', text: '星期四' }, { key: 'C', text: '星期五' }, { key: 'D', text: '星期日' }], answer: 'D', time_limit: 50 },
  { _id: 'L24', type: 'logic', difficulty: 3, content: { text: '蒙提霍尔问题：3扇门，1扇后有奖。你选1扇后，主持人打开另一扇空门，给你机会改选。改选后中奖概率？' }, options: [{ key: 'A', text: '1/3' }, { key: 'B', text: '1/2' }, { key: 'C', text: '2/3' }, { key: 'D', text: '1' }], answer: 'C', time_limit: 45 },
  { _id: 'L25', type: 'logic', difficulty: 3, content: { text: '5个海盗分100枚金币，按等级从高到低提议。被否决则提议者被杀死。半数以上同意才通过。最高级海盗能拿多少？' }, options: [{ key: 'A', text: '20' }, { key: 'B', text: '25' }, { key: 'C', text: '97' }, { key: 'D', text: '98' }], answer: 'D', time_limit: 45 },
  { _id: 'L26', type: 'logic', difficulty: 3, content: { text: '三个开关控制一个灯（在另一个房间）。你只能进有灯的房间一次，如何确定哪个开关控制灯？' }, options: [{ key: 'A', text: '不可能' }, { key: 'B', text: '开一个开关等一会关掉，再开另一个' }, { key: 'C', text: '逐个尝试' }, { key: 'D', text: '需要两个人' }], answer: 'B', time_limit: 45 },
  { _id: 'L27', type: 'logic', difficulty: 3, content: { text: '爱因斯坦谜题：5座房子，已知挪威人住第一间，蓝房子在挪威人旁边，中间房子喝牛奶。谁养鱼？' }, options: [{ key: 'A', text: '英国人' }, { key: 'B', text: '瑞典人' }, { key: 'C', text: '丹麦人' }, { key: 'D', text: '德国人' }], answer: 'D', time_limit: 50 },
  { _id: 'L28', type: 'logic', difficulty: 3, content: { text: '100个囚犯和100顶帽子（黑或白），每人猜自己帽子颜色，猜错就死。事先商量策略，最多可以存活多少人？' }, options: [{ key: 'A', text: '50' }, { key: 'B', text: '75' }, { key: 'C', text: '99' }, { key: 'D', text: '100' }], answer: 'C', time_limit: 50 },
  { _id: 'L29', type: 'logic', difficulty: 3, content: { text: '如果 CAT = 3120, DOG = 4157, 那么 BIRD = ?' }, options: [{ key: 'A', text: '29184' }, { key: 'B', text: '29183' }, { key: 'C', text: '28194' }, { key: 'D', text: '29174' }], answer: 'A', time_limit: 50 },
  { _id: 'L30', type: 'logic', difficulty: 3, content: { text: '在一种密码中，BIRD→CJSE, FISH→GJTI, 那么 EAGLE→?' }, options: [{ key: 'A', text: 'FBHMF' }, { key: 'B', text: 'FBHME' }, { key: 'C', text: 'GBHMF' }, { key: 'D', text: 'FCINF' }], answer: 'A', time_limit: 50 },
  { _id: 'L31', type: 'logic', difficulty: 1, content: { text: '雪是白色的，煤是？' }, options: [{ key: 'A', text: '黑色的' }, { key: 'B', text: '白色的' }, { key: 'C', text: '红色的' }, { key: 'D', text: '蓝色的' }], answer: 'A', time_limit: 20 },
  { _id: 'L32', type: 'logic', difficulty: 1, content: { text: '太阳从哪个方向升起？' }, options: [{ key: 'A', text: '东' }, { key: 'B', text: '南' }, { key: 'C', text: '西' }, { key: 'D', text: '北' }], answer: 'A', time_limit: 20 },
  { _id: 'L33', type: 'logic', difficulty: 2, content: { text: 'A=1, B=2, C=3, 那么 F=?' }, options: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '7' }], answer: 'C', time_limit: 25 },
  { _id: 'L34', type: 'logic', difficulty: 2, content: { text: '5个人排成一排拍照，有多少种排法？' }, options: [{ key: 'A', text: '25' }, { key: 'B', text: '60' }, { key: 'C', text: '120' }, { key: 'D', text: '240' }], answer: 'C', time_limit: 35 },
  { _id: 'L35', type: 'logic', difficulty: 3, content: { text: '1, 11, 21, 1211, 111221, ?' }, options: [{ key: 'A', text: '312211' }, { key: 'B', text: '312111' }, { key: 'C', text: '321211' }, { key: 'D', text: '311221' }], answer: 'A', time_limit: 45 },
  { _id: 'L36', type: 'logic', difficulty: 1, content: { text: '爸爸的爸爸叫什么？' }, options: [{ key: 'A', text: '叔叔' }, { key: 'B', text: '爷爷' }, { key: 'C', text: '外公' }, { key: 'D', text: '舅舅' }], answer: 'B', time_limit: 20 },
  { _id: 'L37', type: 'logic', difficulty: 2, content: { text: '哪个数字不属于序列？2, 3, 5, 7, 9, 11, 13' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '7' }, { key: 'C', text: '9' }, { key: 'D', text: '13' }], answer: 'C', time_limit: 35 },
  { _id: 'L38', type: 'logic', difficulty: 3, content: { text: '哪个数字不属于序列？4, 6, 8, 9, 10, 12, 14, 15' }, options: [{ key: 'A', text: '4' }, { key: 'B', text: '8' }, { key: 'C', text: '9' }, { key: 'D', text: '14' }], answer: 'D', time_limit: 40 },
  { _id: 'L39', type: 'logic', difficulty: 2, content: { text: '10个人两两握手，共握多少次？' }, options: [{ key: 'A', text: '20' }, { key: 'B', text: '45' }, { key: 'C', text: '90' }, { key: 'D', text: '100' }], answer: 'B', time_limit: 35 },
  { _id: 'L40', type: 'logic', difficulty: 3, content: { text: '一个人向南走1km，向东走1km，向北走1km，回到了起点。他在哪里？' }, options: [{ key: 'A', text: '赤道' }, { key: 'B', text: '北极' }, { key: 'C', text: '南极' }, { key: 'D', text: '不可能' }], answer: 'B', time_limit: 45 },

  // ============ NUMBER (数字) — 40 题 ============
  { _id: 'N01', type: 'number', difficulty: 1, content: { text: '25 × 4 = ?' }, options: [{ key: 'A', text: '75' }, { key: 'B', text: '80' }, { key: 'C', text: '100' }, { key: 'D', text: '125' }], answer: 'C', time_limit: 20 },
  { _id: 'N02', type: 'number', difficulty: 1, content: { text: '144 ÷ 12 = ?' }, options: [{ key: 'A', text: '10' }, { key: 'B', text: '11' }, { key: 'C', text: '12' }, { key: 'D', text: '13' }], answer: 'C', time_limit: 20 },
  { _id: 'N03', type: 'number', difficulty: 1, content: { text: '15 + 37 = ?' }, options: [{ key: 'A', text: '48' }, { key: 'B', text: '50' }, { key: 'C', text: '52' }, { key: 'D', text: '54' }], answer: 'C', time_limit: 20 },
  { _id: 'N04', type: 'number', difficulty: 1, content: { text: '99 - 45 = ?' }, options: [{ key: 'A', text: '44' }, { key: 'B', text: '54' }, { key: 'C', text: '55' }, { key: 'D', text: '64' }], answer: 'B', time_limit: 20 },
  { _id: 'N05', type: 'number', difficulty: 1, content: { text: '8 × 7 = ?' }, options: [{ key: 'A', text: '48' }, { key: 'B', text: '54' }, { key: 'C', text: '56' }, { key: 'D', text: '64' }], answer: 'C', time_limit: 20 },
  { _id: 'N06', type: 'number', difficulty: 1, content: { text: '100的一半是多少？' }, options: [{ key: 'A', text: '25' }, { key: 'B', text: '40' }, { key: 'C', text: '50' }, { key: 'D', text: '60' }], answer: 'C', time_limit: 20 },
  { _id: 'N07', type: 'number', difficulty: 1, content: { text: '1/2 + 1/4 = ?' }, options: [{ key: 'A', text: '1/4' }, { key: 'B', text: '2/4' }, { key: 'C', text: '3/4' }, { key: 'D', text: '4/4' }], answer: 'C', time_limit: 25 },
  { _id: 'N08', type: 'number', difficulty: 1, content: { text: '15是3的几倍？' }, options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }], answer: 'C', time_limit: 20 },
  { _id: 'N09', type: 'number', difficulty: 1, content: { text: '哪个数字最大？0.8, 3/4, 0.75, 0.9' }, options: [{ key: 'A', text: '0.8' }, { key: 'B', text: '3/4' }, { key: 'C', text: '0.75' }, { key: 'D', text: '0.9' }], answer: 'D', time_limit: 25 },
  { _id: 'N10', type: 'number', difficulty: 1, content: { text: '鸡和兔共10个头28只脚，鸡有几只？' }, options: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '7' }], answer: 'C', time_limit: 35 },
  { _id: 'N11', type: 'number', difficulty: 2, content: { text: '√144 + √25 = ?' }, options: [{ key: 'A', text: '13' }, { key: 'B', text: '15' }, { key: 'C', text: '17' }, { key: 'D', text: '19' }], answer: 'C', time_limit: 30 },
  { _id: 'N12', type: 'number', difficulty: 2, content: { text: '3² + 4² = ?' }, options: [{ key: 'A', text: '16' }, { key: 'B', text: '25' }, { key: 'C', text: '36' }, { key: 'D', text: '49' }], answer: 'B', time_limit: 25 },
  { _id: 'N13', type: 'number', difficulty: 2, content: { text: '24和36的最大公约数是？' }, options: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '12' }, { key: 'D', text: '24' }], answer: 'C', time_limit: 30 },
  { _id: 'N14', type: 'number', difficulty: 2, content: { text: '一个数除以5余3，除以6余4，这个数最小是？' }, options: [{ key: 'A', text: '14' }, { key: 'B', text: '28' }, { key: 'C', text: '38' }, { key: 'D', text: '58' }], answer: 'B', time_limit: 40 },
  { _id: 'N15', type: 'number', difficulty: 2, content: { text: '0.5 + 0.25 + 0.125 = ?' }, options: [{ key: 'A', text: '0.75' }, { key: 'B', text: '0.8' }, { key: 'C', text: '0.875' }, { key: 'D', text: '0.9' }], answer: 'C', time_limit: 25 },
  { _id: 'N16', type: 'number', difficulty: 2, content: { text: '一个等差数列：3, 7, 11, 15, ?' }, options: [{ key: 'A', text: '17' }, { key: 'B', text: '18' }, { key: 'C', text: '19' }, { key: 'D', text: '20' }], answer: 'C', time_limit: 30 },
  { _id: 'N17', type: 'number', difficulty: 2, content: { text: '如果3人3天喝3桶水，9人9天喝几桶水？' }, options: [{ key: 'A', text: '9' }, { key: 'B', text: '18' }, { key: 'C', text: '27' }, { key: 'D', text: '81' }], answer: 'C', time_limit: 35 },
  { _id: 'N18', type: 'number', difficulty: 2, content: { text: '甲和乙的年龄和是30，甲比乙大4岁，甲几岁？' }, options: [{ key: 'A', text: '15' }, { key: 'B', text: '17' }, { key: 'C', text: '19' }, { key: 'D', text: '21' }], answer: 'B', time_limit: 35 },
  { _id: 'N19', type: 'number', difficulty: 2, content: { text: '一个水桶装满水需要3小时，排空需要5小时。同时进出水，多久装满？' }, options: [{ key: 'A', text: '6h' }, { key: 'B', text: '7.5h' }, { key: 'C', text: '8h' }, { key: 'D', text: '15h' }], answer: 'B', time_limit: 40 },
  { _id: 'N20', type: 'number', difficulty: 2, content: { text: '父亲的年龄是儿子的3倍，5年后父亲年龄是儿子的2.5倍，儿子现在几岁？' }, options: [{ key: 'A', text: '8' }, { key: 'B', text: '10' }, { key: 'C', text: '12' }, { key: 'D', text: '15' }], answer: 'B', time_limit: 45 },
  { _id: 'N21', type: 'number', difficulty: 3, content: { text: '1, 2, 6, 24, 120, ?' }, options: [{ key: 'A', text: '240' }, { key: 'B', text: '360' }, { key: 'C', text: '600' }, { key: 'D', text: '720' }], answer: 'D', time_limit: 40 },
  { _id: 'N22', type: 'number', difficulty: 3, content: { text: '如果 1³+2³+3³ = 36, 那么 1³+2³+3³+4³ = ?' }, options: [{ key: 'A', text: '64' }, { key: 'B', text: '81' }, { key: 'C', text: '100' }, { key: 'D', text: '121' }], answer: 'C', time_limit: 40 },
  { _id: 'N23', type: 'number', difficulty: 3, content: { text: '12345679 × 9 = ?' }, options: [{ key: 'A', text: '111111111' }, { key: 'B', text: '111111110' }, { key: 'C', text: '123456789' }, { key: 'D', text: '99999999' }], answer: 'A', time_limit: 35 },
  { _id: 'N24', type: 'number', difficulty: 3, content: { text: '1/2 + 1/4 + 1/8 + 1/16 + ... 无限加下去等于？' }, options: [{ key: 'A', text: '0.9' }, { key: 'B', text: '1' }, { key: 'C', text: '1.1' }, { key: 'D', text: '无限大' }], answer: 'B', time_limit: 40 },
  { _id: 'N25', type: 'number', difficulty: 3, content: { text: 'log₂(8) + log₂(32) = ?' }, options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '8' }, { key: 'D', text: '40' }], answer: 'C', time_limit: 40 },
  { _id: 'N26', type: 'number', difficulty: 3, content: { text: '如果 2^10 ≈ 1000，那么 2^20 ≈ ?' }, options: [{ key: 'A', text: '2000' }, { key: 'B', text: '10000' }, { key: 'C', text: '1000000' }, { key: 'D', text: '1000000000' }], answer: 'C', time_limit: 40 },
  { _id: 'N27', type: 'number', difficulty: 3, content: { text: '从(0,0)到(4,4)的棋盘，只能向右或向上走，有多少条路径？' }, options: [{ key: 'A', text: '56' }, { key: 'B', text: '64' }, { key: 'C', text: '70' }, { key: 'D', text: '84' }], answer: 'C', time_limit: 40 },
  { _id: 'N28', type: 'number', difficulty: 3, content: { text: '3个人各掷一个骰子，数字之和为10的概率？' }, options: [{ key: 'A', text: '1/8' }, { key: 'B', text: '1/12' }, { key: 'C', text: '1/18' }, { key: 'D', text: '1/27' }], answer: 'A', time_limit: 45 },
  { _id: 'N29', type: 'number', difficulty: 3, content: { text: '一副扑克牌除去大小王，抽5张，同花顺的概率大约是多少？' }, options: [{ key: 'A', text: '1/1000' }, { key: 'B', text: '1/10000' }, { key: 'C', text: '1/50000' }, { key: 'D', text: '1/100000' }], answer: 'C', time_limit: 45 },
  { _id: 'N30', type: 'number', difficulty: 3, content: { text: '3个人生日在同一天的概率（忽略闰年）？' }, options: [{ key: 'A', text: '1/365' }, { key: 'B', text: '1/133225' }, { key: 'C', text: '1/365²' }, { key: 'D', text: '接近0' }], answer: 'B', time_limit: 45 },
  { _id: 'N31', type: 'number', difficulty: 1, content: { text: '1公斤棉花和1公斤铁，哪个重？' }, options: [{ key: 'A', text: '棉花' }, { key: 'B', text: '铁' }, { key: 'C', text: '一样重' }, { key: 'D', text: '无法比较' }], answer: 'C', time_limit: 20 },
  { _id: 'N32', type: 'number', difficulty: 1, content: { text: '4个苹果分给2个人，每人几个？' }, options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }, { key: 'C', text: '3' }, { key: 'D', text: '4' }], answer: 'B', time_limit: 20 },
  { _id: 'N33', type: 'number', difficulty: 2, content: { text: '一个长方形的长是8cm，宽是6cm，面积是多少？' }, options: [{ key: 'A', text: '40' }, { key: 'B', text: '42' }, { key: 'C', text: '48' }, { key: 'D', text: '56' }], answer: 'C', time_limit: 25 },
  { _id: 'N34', type: 'number', difficulty: 2, content: { text: '抛两枚硬币，至少一个正面的概率？' }, options: [{ key: 'A', text: '1/4' }, { key: 'B', text: '1/2' }, { key: 'C', text: '3/4' }, { key: 'D', text: '1' }], answer: 'C', time_limit: 35 },
  { _id: 'N35', type: 'number', difficulty: 3, content: { text: 'sin(90°) = ?' }, options: [{ key: 'A', text: '0' }, { key: 'B', text: '0.5' }, { key: 'C', text: '1' }, { key: 'D', text: '∞' }], answer: 'C', time_limit: 35 },
  { _id: 'N36', type: 'number', difficulty: 2, content: { text: '龟兔赛跑，乌龟先跑100米。兔子速度是乌龟的10倍。兔子追上时乌龟跑了多少米？' }, options: [{ key: 'A', text: '11.1m' }, { key: 'B', text: '100m' }, { key: 'C', text: '111.1m' }, { key: 'D', text: '200m' }], answer: 'C', time_limit: 45 },
  { _id: 'N37', type: 'number', difficulty: 1, content: { text: '36 + 64 = ?' }, options: [{ key: 'A', text: '90' }, { key: 'B', text: '96' }, { key: 'C', text: '100' }, { key: 'D', text: '110' }], answer: 'C', time_limit: 20 },
  { _id: 'N38', type: 'number', difficulty: 3, content: { text: 'π的小数点后第3位是什么？' }, options: [{ key: 'A', text: '1' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '9' }], answer: 'A', time_limit: 35 },
  { _id: 'N39', type: 'number', difficulty: 2, content: { text: '一个班有40人，25人喜欢数学，20人喜欢语文，10人两门都喜欢。多少人两门都不喜欢？' }, options: [{ key: 'A', text: '5' }, { key: 'B', text: '10' }, { key: 'C', text: '15' }, { key: 'D', text: '20' }], answer: 'A', time_limit: 40 },
  { _id: 'N40', type: 'number', difficulty: 3, content: { text: '把5个不同的球放入3个不同的盒子，每个盒子至少1个，几种放法？' }, options: [{ key: 'A', text: '60' }, { key: 'B', text: '125' }, { key: 'C', text: '150' }, { key: 'D', text: '243' }], answer: 'C', time_limit: 45 },

  // ============ SPATIAL (空间) — 35 题 ============
  { _id: 'S01', type: 'spatial', difficulty: 1, content: { text: '一个正方形有几个角？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '5' }], answer: 'C', time_limit: 20 },
  { _id: 'S02', type: 'spatial', difficulty: 1, content: { text: '一个三角形有3条边，一个正方形有4条边，那么五边形有几条边？' }, options: [{ key: 'A', text: '4' }, { key: 'B', text: '5' }, { key: 'C', text: '6' }, { key: 'D', text: '7' }], answer: 'B', time_limit: 25 },
  { _id: 'S03', type: 'spatial', difficulty: 1, content: { text: '时针从12走到3，转了多少度？' }, options: [{ key: 'A', text: '30°' }, { key: 'B', text: '45°' }, { key: 'C', text: '60°' }, { key: 'D', text: '90°' }], answer: 'D', time_limit: 25 },
  { _id: 'S04', type: 'spatial', difficulty: 1, content: { text: '一根绳子剪成3段需要剪几次？' }, options: [{ key: 'A', text: '1次' }, { key: 'B', text: '2次' }, { key: 'C', text: '3次' }, { key: 'D', text: '4次' }], answer: 'B', time_limit: 25 },
  { _id: 'S05', type: 'spatial', difficulty: 1, content: { text: '正方体有几个面？' }, options: [{ key: 'A', text: '4' }, { key: 'B', text: '6' }, { key: 'C', text: '8' }, { key: 'D', text: '12' }], answer: 'B', time_limit: 20 },
  { _id: 'S06', type: 'spatial', difficulty: 1, content: { text: '圆形有多少条对称轴？' }, options: [{ key: 'A', text: '0' }, { key: 'B', text: '2' }, { key: 'C', text: '4' }, { key: 'D', text: '无数条' }], answer: 'D', time_limit: 25 },
  { _id: 'S07', type: 'spatial', difficulty: 1, content: { text: '两个相同的正方形可以拼成一个什么形状？' }, options: [{ key: 'A', text: '三角形' }, { key: 'B', text: '长方形' }, { key: 'C', text: '圆形' }, { key: 'D', text: '梯形' }], answer: 'B', time_limit: 25 },
  { _id: 'S08', type: 'spatial', difficulty: 1, content: { text: '镜子里的你举起左手，镜中的你举起哪只手？' }, options: [{ key: 'A', text: '左手' }, { key: 'B', text: '右手' }, { key: 'C', text: '双手' }, { key: 'D', text: '不确定' }], answer: 'B', time_limit: 25 },
  { _id: 'S09', type: 'spatial', difficulty: 1, content: { text: '一个骰子，对面的点数之和等于几？' }, options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '8' }], answer: 'C', time_limit: 25 },
  { _id: 'S10', type: 'spatial', difficulty: 1, content: { text: '一张A4纸对折两次后，被分成几份？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '8' }], answer: 'C', time_limit: 25 },
  { _id: 'S11', type: 'spatial', difficulty: 2, content: { text: '一个正方体有多少条棱？' }, options: [{ key: 'A', text: '6' }, { key: 'B', text: '8' }, { key: 'C', text: '12' }, { key: 'D', text: '24' }], answer: 'C', time_limit: 25 },
  { _id: 'S12', type: 'spatial', difficulty: 2, content: { text: '把一个正方形的边长扩大2倍，面积扩大几倍？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '6' }, { key: 'D', text: '8' }], answer: 'B', time_limit: 30 },
  { _id: 'S13', type: 'spatial', difficulty: 2, content: { text: '时针和分针在3:00时成多少度角？' }, options: [{ key: 'A', text: '45°' }, { key: 'B', text: '60°' }, { key: 'C', text: '90°' }, { key: 'D', text: '120°' }], answer: 'C', time_limit: 30 },
  { _id: 'S14', type: 'spatial', difficulty: 2, content: { text: '一个人用7分钟锯一根木头成4段，锯成8段需要几分钟？' }, options: [{ key: 'A', text: '14' }, { key: 'B', text: '16' }, { key: 'C', text: '18' }, { key: 'D', text: '21' }], answer: 'D', time_limit: 40 },
  { _id: 'S15', type: 'spatial', difficulty: 2, content: { text: '一个圆形的面积是πr²，如果半径扩大3倍，面积扩大几倍？' }, options: [{ key: 'A', text: '3' }, { key: 'B', text: '6' }, { key: 'C', text: '9' }, { key: 'D', text: '27' }], answer: 'C', time_limit: 35 },
  { _id: 'S16', type: 'spatial', difficulty: 2, content: { text: '柱子在地上的影子长2米，此时太阳仰角45°，柱子多高？' }, options: [{ key: 'A', text: '1m' }, { key: 'B', text: '2m' }, { key: 'C', text: '3m' }, { key: 'D', text: '4m' }], answer: 'B', time_limit: 35 },
  { _id: 'S17', type: 'spatial', difficulty: 2, content: { text: '从正上方看一个圆锥体，看到的是什么形状？' }, options: [{ key: 'A', text: '三角形' }, { key: 'B', text: '圆形' }, { key: 'C', text: '正方形' }, { key: 'D', text: '梯形' }], answer: 'B', time_limit: 30 },
  { _id: 'S18', type: 'spatial', difficulty: 2, content: { text: '围绕一个正方形花坛走一圈是40米，花坛边长是多少？' }, options: [{ key: 'A', text: '8m' }, { key: 'B', text: '10m' }, { key: 'C', text: '12m' }, { key: 'D', text: '20m' }], answer: 'B', time_limit: 30 },
  { _id: 'S19', type: 'spatial', difficulty: 2, content: { text: '两个完全一样的三角形，不能拼成什么？' }, options: [{ key: 'A', text: '平行四边形' }, { key: 'B', text: '长方形' }, { key: 'C', text: '正方形' }, { key: 'D', text: '圆形' }], answer: 'D', time_limit: 30 },
  { _id: 'S20', type: 'spatial', difficulty: 2, content: { text: '一个长方体长宽高分别是2, 3, 4，体积是多少？' }, options: [{ key: 'A', text: '18' }, { key: 'B', text: '20' }, { key: 'C', text: '24' }, { key: 'D', text: '48' }], answer: 'C', time_limit: 25 },
  { _id: 'S21', type: 'spatial', difficulty: 3, content: { text: '一笔画问题：一个"田"字图形，可以一笔画完吗？' }, options: [{ key: 'A', text: '可以' }, { key: 'B', text: '不可以' }, { key: 'C', text: '取决于起点' }, { key: 'D', text: '有时候可以' }], answer: 'B', time_limit: 40 },
  { _id: 'S22', type: 'spatial', difficulty: 3, content: { text: '一个正四面体有几个顶点？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '6' }], answer: 'C', time_limit: 30 },
  { _id: 'S23', type: 'spatial', difficulty: 3, content: { text: '3维空间最多可以有几个互相垂直的方向？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '3' }, { key: 'C', text: '4' }, { key: 'D', text: '无限' }], answer: 'B', time_limit: 25 },
  { _id: 'S24', type: 'spatial', difficulty: 3, content: { text: '一个足球（截角二十面体）有多少个五边形面？' }, options: [{ key: 'A', text: '8' }, { key: 'B', text: '10' }, { key: 'C', text: '12' }, { key: 'D', text: '20' }], answer: 'C', time_limit: 40 },
  { _id: 'S25', type: 'spatial', difficulty: 3, content: { text: '蜂巢的六边形结构有什么优势？' }, options: [{ key: 'A', text: '最美观' }, { key: 'B', text: '同等材料下面积最大' }, { key: 'C', text: '最易建造' }, { key: 'D', text: '随机形成' }], answer: 'B', time_limit: 35 },
  { _id: 'S26', type: 'spatial', difficulty: 3, content: { text: '莫比乌斯带有几个面？' }, options: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }, { key: 'D', text: '3' }], answer: 'B', time_limit: 35 },
  { _id: 'S27', type: 'spatial', difficulty: 3, content: { text: '一个球体被一个平面截开，截面是什么形状？' }, options: [{ key: 'A', text: '椭圆' }, { key: 'B', text: '圆形' }, { key: 'C', text: '抛物线' }, { key: 'D', text: '不确定' }], answer: 'B', time_limit: 30 },
  { _id: 'S28', type: 'spatial', difficulty: 3, content: { text: '1弧度约等于多少度？' }, options: [{ key: 'A', text: '45°' }, { key: 'B', text: '57.3°' }, { key: 'C', text: '60°' }, { key: 'D', text: '90°' }], answer: 'B', time_limit: 35 },
  { _id: 'S29', type: 'spatial', difficulty: 3, content: { text: '正十二面体有多少条棱？' }, options: [{ key: 'A', text: '12' }, { key: 'B', text: '20' }, { key: 'C', text: '30' }, { key: 'D', text: '60' }], answer: 'C', time_limit: 45 },
  { _id: 'S30', type: 'spatial', difficulty: 3, content: { text: '一个立方体被沿对角线切开，截面是什么形状？' }, options: [{ key: 'A', text: '三角形' }, { key: 'B', text: '长方形' }, { key: 'C', text: '六边形' }, { key: 'D', text: '菱形' }], answer: 'B', time_limit: 40 },
  { _id: 'S31', type: 'spatial', difficulty: 1, content: { text: '长方形有几条对称轴？' }, options: [{ key: 'A', text: '0' }, { key: 'B', text: '1' }, { key: 'C', text: '2' }, { key: 'D', text: '4' }], answer: 'C', time_limit: 25 },
  { _id: 'S32', type: 'spatial', difficulty: 2, content: { text: '如果地球的半径是现在的2倍，表面积是现在的几倍？' }, options: [{ key: 'A', text: '2' }, { key: 'B', text: '4' }, { key: 'C', text: '6' }, { key: 'D', text: '8' }], answer: 'B', time_limit: 40 },
  { _id: 'S33', type: 'spatial', difficulty: 3, content: { text: '一个圆锥的体积是等底等高圆柱体积的几分之几？' }, options: [{ key: 'A', text: '1/2' }, { key: 'B', text: '1/3' }, { key: 'C', text: '2/3' }, { key: 'D', text: '3/4' }], answer: 'B', time_limit: 35 },
  { _id: 'S34', type: 'spatial', difficulty: 2, content: { text: '时针和分针在6:00时成多少度角？' }, options: [{ key: 'A', text: '90°' }, { key: 'B', text: '120°' }, { key: 'C', text: '150°' }, { key: 'D', text: '180°' }], answer: 'D', time_limit: 25 },
  { _id: 'S35', type: 'spatial', difficulty: 2, content: { text: '把一个圆形的半径缩小一半，面积变成原来的多少？' }, options: [{ key: 'A', text: '1/2' }, { key: 'B', text: '1/3' }, { key: 'C', text: '1/4' }, { key: 'D', text: '1/8' }], answer: 'C', time_limit: 35 },

  // ============ MEMORY (记忆) — 35 题 ============
  { _id: 'M01', type: 'memory', difficulty: 1, content: { text: '一年有多少个月？' }, options: [{ key: 'A', text: '10' }, { key: 'B', text: '11' }, { key: 'C', text: '12' }, { key: 'D', text: '13' }], answer: 'C', time_limit: 20 },
  { _id: 'M02', type: 'memory', difficulty: 1, content: { text: '一个礼拜有几天？' }, options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '8' }], answer: 'C', time_limit: 20 },
  { _id: 'M03', type: 'memory', difficulty: 1, content: { text: '哪种颜色是三原色之一？' }, options: [{ key: 'A', text: '绿色' }, { key: 'B', text: '橙色' }, { key: 'C', text: '蓝色' }, { key: 'D', text: '紫色' }], answer: 'C', time_limit: 25 },
  { _id: 'M04', type: 'memory', difficulty: 1, content: { text: '中文里"五"对应的数字是？' }, options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }], answer: 'C', time_limit: 20 },
  { _id: 'M05', type: 'memory', difficulty: 1, content: { text: '彩虹有几种颜色？' }, options: [{ key: 'A', text: '5' }, { key: 'B', text: '6' }, { key: 'C', text: '7' }, { key: 'D', text: '8' }], answer: 'C', time_limit: 25 },
  { _id: 'M06', type: 'memory', difficulty: 1, content: { text: '水的沸点是多少摄氏度？' }, options: [{ key: 'A', text: '90°C' }, { key: 'B', text: '96°C' }, { key: 'C', text: '100°C' }, { key: 'D', text: '110°C' }], answer: 'C', time_limit: 20 },
  { _id: 'M07', type: 'memory', difficulty: 1, content: { text: '圆周率 π ≈ ?' }, options: [{ key: 'A', text: '2.14' }, { key: 'B', text: '3.14' }, { key: 'C', text: '3.41' }, { key: 'D', text: '4.13' }], answer: 'B', time_limit: 20 },
  { _id: 'M08', type: 'memory', difficulty: 1, content: { text: '光的速度约为每秒多少公里？' }, options: [{ key: 'A', text: '3万' }, { key: 'B', text: '30万' }, { key: 'C', text: '300万' }, { key: 'D', text: '3000万' }], answer: 'B', time_limit: 25 },
  { _id: 'M09', type: 'memory', difficulty: 1, content: { text: '地球绕太阳一圈需要多长时间？' }, options: [{ key: 'A', text: '一个月' }, { key: 'B', text: '半年' }, { key: 'C', text: '一年' }, { key: 'D', text: '一天' }], answer: 'C', time_limit: 20 },
  { _id: 'M10', type: 'memory', difficulty: 1, content: { text: '人体正常体温约为多少度？' }, options: [{ key: 'A', text: '35°C' }, { key: 'B', text: '37°C' }, { key: 'C', text: '39°C' }, { key: 'D', text: '41°C' }], answer: 'B', time_limit: 20 },
  { _id: 'M11', type: 'memory', difficulty: 2, content: { text: '化学符号 H 代表什么元素？' }, options: [{ key: 'A', text: '氦' }, { key: 'B', text: '氢' }, { key: 'C', text: '汞' }, { key: 'D', text: '碳' }], answer: 'B', time_limit: 25 },
  { _id: 'M12', type: 'memory', difficulty: 2, content: { text: '声音在空气中的传播速度大约是多少？' }, options: [{ key: 'A', text: '34m/s' }, { key: 'B', text: '340m/s' }, { key: 'C', text: '3400m/s' }, { key: 'D', text: '300000km/s' }], answer: 'B', time_limit: 25 },
  { _id: 'M13', type: 'memory', difficulty: 2, content: { text: '中国的首都是？' }, options: [{ key: 'A', text: '上海' }, { key: 'B', text: '南京' }, { key: 'C', text: '北京' }, { key: 'D', text: '西安' }], answer: 'C', time_limit: 20 },
  { _id: 'M14', type: 'memory', difficulty: 2, content: { text: 'DNA的全称是？' }, options: [{ key: 'A', text: '脱氧核糖核酸' }, { key: 'B', text: '核糖核酸' }, { key: 'C', text: '氨基酸' }, { key: 'D', text: '蛋白质' }], answer: 'A', time_limit: 30 },
  { _id: 'M15', type: 'memory', difficulty: 2, content: { text: '太阳系中最大的行星是？' }, options: [{ key: 'A', text: '地球' }, { key: 'B', text: '火星' }, { key: 'C', text: '土星' }, { key: 'D', text: '木星' }], answer: 'D', time_limit: 25 },
  { _id: 'M16', type: 'memory', difficulty: 2, content: { text: '元素周期表中原子序数为1的元素是？' }, options: [{ key: 'A', text: '氦' }, { key: 'B', text: '氢' }, { key: 'C', text: '锂' }, { key: 'D', text: '碳' }], answer: 'B', time_limit: 25 },
  { _id: 'M17', type: 'memory', difficulty: 2, content: { text: '中国有多少个省级行政区？' }, options: [{ key: 'A', text: '28' }, { key: 'B', text: '30' }, { key: 'C', text: '34' }, { key: 'D', text: '38' }], answer: 'C', time_limit: 25 },
  { _id: 'M18', type: 'memory', difficulty: 2, content: { text: '一张标准扑克牌有多少张（含大小王）？' }, options: [{ key: 'A', text: '52' }, { key: 'B', text: '54' }, { key: 'C', text: '56' }, { key: 'D', text: '48' }], answer: 'B', time_limit: 25 },
  { _id: 'M19', type: 'memory', difficulty: 2, content: { text: '十二生肖中，排在龙后面的是？' }, options: [{ key: 'A', text: '兔' }, { key: 'B', text: '蛇' }, { key: 'C', text: '马' }, { key: 'D', text: '羊' }], answer: 'B', time_limit: 25 },
  { _id: 'M20', type: 'memory', difficulty: 2, content: { text: '世界上最大的海洋是？' }, options: [{ key: 'A', text: '大西洋' }, { key: 'B', text: '印度洋' }, { key: 'C', text: '太平洋' }, { key: 'D', text: '北冰洋' }], answer: 'C', time_limit: 25 },
  { _id: 'M21', type: 'memory', difficulty: 3, content: { text: '最早提出相对论的科学家是？' }, options: [{ key: 'A', text: '牛顿' }, { key: 'B', text: '爱因斯坦' }, { key: 'C', text: '霍金' }, { key: 'D', text: '普朗克' }], answer: 'B', time_limit: 25 },
  { _id: 'M22', type: 'memory', difficulty: 3, content: { text: '"勾股定理"中勾3股4则弦？' }, options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }], answer: 'C', time_limit: 25 },
  { _id: 'M23', type: 'memory', difficulty: 3, content: { text: '第二次世界大战爆发于哪一年？' }, options: [{ key: 'A', text: '1937' }, { key: 'B', text: '1939' }, { key: 'C', text: '1941' }, { key: 'D', text: '1945' }], answer: 'B', time_limit: 30 },
  { _id: 'M24', type: 'memory', difficulty: 3, content: { text: 'DNA的碱基配对中，A与什么配对？' }, options: [{ key: 'A', text: 'C' }, { key: 'B', text: 'G' }, { key: 'C', text: 'T' }, { key: 'D', text: 'U' }], answer: 'C', time_limit: 30 },
  { _id: 'M25', type: 'memory', difficulty: 3, content: { text: '计算机中 1KB 等于多少字节？' }, options: [{ key: 'A', text: '100' }, { key: 'B', text: '512' }, { key: 'C', text: '1000' }, { key: 'D', text: '1024' }], answer: 'D', time_limit: 30 },
  { _id: 'M26', type: 'memory', difficulty: 3, content: { text: '绝对零度是多少开尔文？' }, options: [{ key: 'A', text: '-273' }, { key: 'B', text: '0' }, { key: 'C', text: '273' }, { key: 'D', text: '100' }], answer: 'B', time_limit: 30 },
  { _id: 'M27', type: 'memory', difficulty: 3, content: { text: '人体中最大的器官是？' }, options: [{ key: 'A', text: '心脏' }, { key: 'B', text: '大脑' }, { key: 'C', text: '皮肤' }, { key: 'D', text: '肝脏' }], answer: 'C', time_limit: 30 },
  { _id: 'M28', type: 'memory', difficulty: 3, content: { text: '化学中 pH=7 表示什么？' }, options: [{ key: 'A', text: '酸性' }, { key: 'B', text: '中性' }, { key: 'C', text: '碱性' }, { key: 'D', text: '不确定' }], answer: 'B', time_limit: 25 },
  { _id: 'M29', type: 'memory', difficulty: 3, content: { text: '海森堡不确定性原理是关于什么的？' }, options: [{ key: 'A', text: '经济学' }, { key: 'B', text: '量子力学' }, { key: 'C', text: '生物学' }, { key: 'D', text: '地质学' }], answer: 'B', time_limit: 35 },
  { _id: 'M30', type: 'memory', difficulty: 3, content: { text: 'TCP/IP协议中，IP代表什么？' }, options: [{ key: 'A', text: 'Internet Protocol' }, { key: 'B', text: 'Internal Program' }, { key: 'C', text: 'Input Process' }, { key: 'D', text: 'Integrated Path' }], answer: 'A', time_limit: 35 },
  { _id: 'M31', type: 'memory', difficulty: 1, content: { text: '哪个月份有31天？' }, options: [{ key: 'A', text: '2月' }, { key: 'B', text: '4月' }, { key: 'C', text: '7月' }, { key: 'D', text: '11月' }], answer: 'C', time_limit: 20 },
  { _id: 'M32', type: 'memory', difficulty: 2, content: { text: '化学中 O 代表什么元素？' }, options: [{ key: 'A', text: '金' }, { key: 'B', text: '银' }, { key: 'C', text: '氧' }, { key: 'D', text: '碳' }], answer: 'C', time_limit: 25 },
  { _id: 'M33', type: 'memory', difficulty: 3, content: { text: '地球到太阳的平均距离约为？' }, options: [{ key: 'A', text: '38万公里' }, { key: 'B', text: '380万公里' }, { key: 'C', text: '1.5亿公里' }, { key: 'D', text: '15亿公里' }], answer: 'C', time_limit: 35 },
  { _id: 'M34', type: 'memory', difficulty: 2, content: { text: '奥运五环有几个环？' }, options: [{ key: 'A', text: '3' }, { key: 'B', text: '4' }, { key: 'C', text: '5' }, { key: 'D', text: '6' }], answer: 'C', time_limit: 20 },
  { _id: 'M35', type: 'memory', difficulty: 3, content: { text: '国际象棋棋盘有多少个格子？' }, options: [{ key: 'A', text: '36' }, { key: 'B', text: '49' }, { key: 'C', text: '64' }, { key: 'D', text: '81' }], answer: 'C', time_limit: 30 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getMockQuestions(difficulty: number): Question[] {
  const pool = MOCK_QUESTIONS.filter(q => q.difficulty === difficulty);

  if (pool.length < 10) {
    return shuffle(MOCK_QUESTIONS).slice(0, 10);
  }

  const byType: Record<QuestionType, Question[]> = {
    logic: [],
    number: [],
    spatial: [],
    memory: [],
  };

  for (const q of pool) {
    byType[q.type].push(q);
  }

  const selected: Question[] = [];

  const types: QuestionType[] = ['logic', 'number', 'spatial', 'memory'];
  const perType = [3, 3, 2, 2];

  for (let i = 0; i < types.length; i++) {
    const typePool = shuffle(byType[types[i]]);
    const count = Math.min(perType[i], typePool.length);
    selected.push(...typePool.slice(0, count));
  }

  // 补满 10 题
  const remaining = shuffle(pool.filter(q => !selected.includes(q)));
  selected.push(...remaining.slice(0, 10 - selected.length));

  return shuffle(selected);
}
