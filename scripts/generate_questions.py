#!/usr/bin/env python3
"""Generate 150 IQ test questions (50 per difficulty) for CloudBase import."""

import json
import random
import math

random.seed(42)

questions = []
qid = 0

# ─── Difficulty 1: 简单 (50 questions) ───

easy_templates = [
    # 数列找规律 - 等差数列
    lambda: {"text": "2, 4, 6, 8, ?", "options": ["10", "11", "12", "9"], "answer": "10"},
    lambda: {"text": "5, 10, 15, 20, ?", "options": ["22", "25", "30", "24"], "answer": "25"},
    lambda: {"text": "1, 3, 5, 7, ?", "options": ["8", "9", "10", "11"], "answer": "9"},
    lambda: {"text": "10, 20, 30, 40, ?", "options": ["45", "50", "55", "60"], "answer": "50"},
    lambda: {"text": "3, 6, 9, 12, ?", "options": ["13", "14", "15", "16"], "answer": "15"},
    lambda: {"text": "100, 90, 80, 70, ?", "options": ["50", "55", "60", "65"], "answer": "60"},
    lambda: {"text": "7, 14, 21, 28, ?", "options": ["32", "33", "35", "42"], "answer": "35"},
    # 等比数列
    lambda: {"text": "1, 2, 4, 8, ?", "options": ["10", "12", "14", "16"], "answer": "16"},
    lambda: {"text": "3, 6, 12, 24, ?", "options": ["30", "36", "48", "72"], "answer": "48"},
    lambda: {"text": "2, 4, 8, 16, ?", "options": ["24", "30", "32", "36"], "answer": "32"},
    # 数字推理
    lambda: {"text": "如果 1=5, 2=10, 3=15, 那么 4=?", "options": ["16", "18", "20", "25"], "answer": "20"},
    lambda: {"text": "5 + 3 = 28, 9 + 1 = 810, 那么 6 + 4 = ?", "options": ["210", "410", "24", "64"], "answer": "410"},
    lambda: {"text": "所有 A 都是 B，所有 B 都是 C，那么？", "options": ["所有 A 都是 C", "所有 C 都是 A", "A 和 C 无关", "B 和 A 无关"], "answer": "所有 A 都是 C"},
    # 类比推理
    lambda: {"text": "医生对于医院，相当于老师对于？", "options": ["学生", "学校", "课本", "教室"], "answer": "学校"},
    lambda: {"text": "鸟儿对于天空，相当于鱼儿对于？", "options": ["陆地", "水中", "食物", "鱼缸"], "answer": "水中"},
    lambda: {"text": "手指对于手，相当于脚趾对于？", "options": ["腿", "脚", "鞋", "袜子"], "answer": "脚"},
    lambda: {"text": "红色对于停止，相当于绿色对于？", "options": ["等待", "通行", "减速", "停车"], "answer": "通行"},
    # 图形推理（文字描述）
    lambda: {"text": "一个三角形有3条边，一个正方形有4条边，那么五边形有几条边？", "options": ["4", "5", "6", "7"], "answer": "5"},
    lambda: {"text": "○□○□○□，下一个是什么？", "options": ["○", "□", "△", "☆"], "answer": "○"},
    lambda: {"text": "△△□△△□△△，下一个是什么？", "options": ["△", "□", "○", "☆"], "answer": "□"},
    # 数学运算
    lambda: {"text": "25 × 4 = ?", "options": ["75", "80", "100", "125"], "answer": "100"},
    lambda: {"text": "144 ÷ 12 = ?", "options": ["10", "11", "12", "13"], "answer": "12"},
    lambda: {"text": "15 + 37 = ?", "options": ["48", "50", "52", "54"], "answer": "52"},
    lambda: {"text": "99 - 45 = ?", "options": ["44", "54", "55", "64"], "answer": "54"},
    lambda: {"text": "8 × 7 = ?", "options": ["48", "54", "56", "64"], "answer": "56"},
    # 逻辑判断
    lambda: {"text": "小明比小红高，小红比小刚高，谁最矮？", "options": ["小明", "小红", "小刚", "一样高"], "answer": "小刚"},
    lambda: {"text": "今天是星期三，后天是星期几？", "options": ["星期二", "星期四", "星期五", "星期六"], "answer": "星期五"},
    lambda: {"text": "一年有多少个月？", "options": ["10", "11", "12", "13"], "answer": "12"},
    lambda: {"text": "一个正方形有几个角？", "options": ["2", "3", "4", "5"], "answer": "4"},
    lambda: {"text": "22, 20, 18, 16, ?", "options": ["12", "13", "14", "15"], "answer": "14"},
    lambda: {"text": "1, 1, 2, 3, 5, 8, ?", "options": ["10", "11", "12", "13"], "answer": "13"},
    lambda: {"text": "哪个数字最大？", "options": ["0.8", "3/4", "0.75", "0.9"], "answer": "0.9"},
    lambda: {"text": "时针从12走到3，转了多少度？", "options": ["30°", "45°", "60°", "90°"], "answer": "90°"},
    lambda: {"text": "一根绳子剪成3段需要剪几次？", "options": ["1次", "2次", "3次", "4次"], "answer": "2次"},
    lambda: {"text": "鸡和兔共10个头28只脚，鸡有几只？", "options": ["4", "5", "6", "7"], "answer": "6"},
    lambda: {"text": "1公斤棉花和1公斤铁，哪个重？", "options": ["棉花", "铁", "一样重", "无法比较"], "answer": "一样重"},
    lambda: {"text": "2, 3, 5, 7, 11, ?", "options": ["12", "13", "14", "15"], "answer": "13"},
    lambda: {"text": "A=1, B=2, C=3, 那么 D=?", "options": ["3", "4", "5", "6"], "answer": "4"},
    lambda: {"text": "雪是白色的，煤是？", "options": ["黑色的", "白色的", "红色的", "蓝色的"], "answer": "黑色的"},
    lambda: {"text": "\"大\"的反义词是？", "options": ["高", "小", "多", "宽"], "answer": "小"},
    lambda: {"text": "4个苹果分给2个人，每人几个？", "options": ["1", "2", "3", "4"], "answer": "2"},
    lambda: {"text": "一个礼拜有几天？", "options": ["5", "6", "7", "8"], "answer": "7"},
    lambda: {"text": "3, 4, 6, 9, 13, ?", "options": ["15", "16", "17", "18"], "answer": "18"},
    lambda: {"text": "哪种颜色是三原色之一？", "options": ["绿色", "橙色", "蓝色", "紫色"], "answer": "蓝色"},
    lambda: {"text": "15是3的几倍？", "options": ["3", "4", "5", "6"], "answer": "5"},
    lambda: {"text": "1/2 + 1/4 = ?", "options": ["1/4", "2/4", "3/4", "4/4"], "answer": "3/4"},
    lambda: {"text": "哪个月份有31天？", "options": ["2月", "4月", "7月", "11月"], "answer": "7月"},
    lambda: {"text": "太阳从哪个方向升起？", "options": ["东", "南", "西", "北"], "answer": "东"},
    lambda: {"text": "4, 9, 16, 25, ?", "options": ["30", "35", "36", "49"], "answer": "36"},
    lambda: {"text": "爸爸的爸爸叫什么？", "options": ["叔叔", "爷爷", "外公", "舅舅"], "answer": "爷爷"},
    lambda: {"text": "100的一半是多少？", "options": ["25", "40", "50", "60"], "answer": "50"},
]

# ─── Difficulty 2: 中等 (50 questions) ───

medium_templates = [
    lambda: {"text": "2, 6, 12, 20, ?", "options": ["28", "30", "32", "34"], "answer": "30"},
    lambda: {"text": "1, 8, 27, 64, ?", "options": ["100", "121", "125", "144"], "answer": "125"},
    lambda: {"text": "3, 7, 15, 31, ?", "options": ["45", "55", "63", "72"], "answer": "63"},
    lambda: {"text": "2, 5, 10, 17, 26, ?", "options": ["32", "35", "37", "40"], "answer": "37"},
    lambda: {"text": "1, 4, 9, 16, 25, 36, ?", "options": ["42", "49", "56", "64"], "answer": "49"},
    lambda: {"text": "0, 1, 1, 2, 3, 5, 8, ?", "options": ["10", "11", "12", "13"], "answer": "13"},
    lambda: {"text": "2, 3, 5, 9, 17, ?", "options": ["31", "32", "33", "34"], "answer": "33"},
    lambda: {"text": "121, 144, 169, 196, ?", "options": ["215", "225", "235", "245"], "answer": "225"},
    lambda: {"text": "3, 8, 15, 24, 35, ?", "options": ["44", "46", "48", "50"], "answer": "48"},
    lambda: {"text": "7, 12, 19, 28, 39, ?", "options": ["48", "50", "52", "54"], "answer": "52"},
    # 逻辑推理
    lambda: {"text": "如果所有的猫都怕水，Tom是一只猫，那么？", "options": ["Tom怕水", "Tom不怕水", "Tom喜欢水", "无法确定"], "answer": "Tom怕水"},
    lambda: {"text": "有些花是红色的，所有玫瑰都是花，那么？", "options": ["所有玫瑰都是红色的", "有些玫瑰可能是红色的", "所有红色的花都是玫瑰", "玫瑰不是花"], "answer": "有些玫瑰可能是红色的"},
    lambda: {"text": "甲说：乙说谎。乙说：丙说谎。丙说：甲和乙都说谎。谁说真话？", "options": ["甲", "乙", "丙", "都说话"], "answer": "乙"},
    lambda: {"text": "三个盒子，只有一个有宝石。A盒写着\"宝石在这里\"，B盒写着\"宝石不在这里\"，C盒写着\"宝石不在A盒\"。只有一句真话，宝石在哪？", "options": ["A盒", "B盒", "C盒", "不在任何一个"], "answer": "B盒"},
    lambda: {"text": "5个海盗分100枚金币，按等级从高到低提议。如果提议被否决，提议者被杀死。半数以上同意才通过。最高级海盗能拿多少？", "options": ["20", "25", "97", "98"], "answer": "98"},
    # 数列综合
    lambda: {"text": "1, 2, 2, 4, 8, 32, ?", "options": ["64", "128", "256", "512"], "answer": "256"},
    lambda: {"text": "1, 1, 1, 3, 5, 9, ?", "options": ["11", "15", "17", "19"], "answer": "17"},
    lambda: {"text": "3600, 1800, 600, 150, ?", "options": ["25", "30", "50", "75"], "answer": "30"},
    lambda: {"text": "2, 3, 6, 11, 18, ?", "options": ["25", "27", "29", "31"], "answer": "27"},
    # 文字推理
    lambda: {"text": "\"热\"对于\"冷\"，相当于\"高\"对于？", "options": ["大", "低", "远", "近"], "answer": "低"},
    lambda: {"text": "笔:写::刀:?", "options": ["锋利", "切割", "工具", "金属"], "answer": "切割"},
    lambda: {"text": "寻找规律：EC, FD, GE, HF, ?", "options": ["IG", "IG", "GI", "JG"], "answer": "IG"},
    lambda: {"text": "如果 5+3=28, 9+1=810, 8+6=214, 那么 7+3=?", "options": ["410", "210", "104", "1010"], "answer": "410"},
    lambda: {"text": "如果123=0, 456=3, 789=6, 那么358=?", "options": ["0", "1", "2", "3"], "answer": "2"},
    # 数学运算
    lambda: {"text": "√144 + √25 = ?", "options": ["13", "15", "17", "19"], "answer": "17"},
    lambda: {"text": "3² + 4² = ?", "options": ["16", "25", "36", "49"], "answer": "25"},
    lambda: {"text": "一个长方形的长是8cm，宽是6cm，面积是多少？", "options": ["40", "42", "48", "56"], "answer": "48"},
    lambda: {"text": "如果A=2, B=4, C=6, 那么D+E=？（D=8, E=10）", "options": ["14", "16", "18", "20"], "answer": "18"},
    lambda: {"text": "24和36的最大公约数是？", "options": ["6", "8", "12", "24"], "answer": "12"},
    lambda: {"text": "一个数除以5余3，除以6余4，这个数最小是？", "options": ["14", "28", "38", "58"], "answer": "28"},
    # 空间推理
    lambda: {"text": "一个正方体有多少条棱？", "options": ["6", "8", "12", "24"], "answer": "12"},
    lambda: {"text": "把一个正方形的边长扩大2倍，面积扩大几倍？", "options": ["2", "4", "6", "8"], "answer": "4"},
    lambda: {"text": "点数序列：⚀=1, ⚁=2, ⚂=3, ⚃=4, ⚄=5, 下一组是什么？", "options": ["⚅", "⚀", "⚁", "没有规律"], "answer": "⚅"},
    # 概率与计数
    lambda: {"text": "抛两枚硬币，至少一个正面的概率？", "options": ["1/4", "1/2", "3/4", "1"], "answer": "3/4"},
    lambda: {"text": "5个人排成一排拍照，有多少种排法？", "options": ["25", "60", "120", "240"], "answer": "120"},
    lambda: {"text": "从1到100有多少个数字包含9？", "options": ["10", "18", "19", "20"], "answer": "20"},
    # 混合
    lambda: {"text": "时针和分针在3:00时成多少度角？", "options": ["45°", "60°", "90°", "120°"], "answer": "90°"},
    lambda: {"text": "一个人用7分钟锯一根木头成4段，锯成8段需要几分钟？", "options": ["14", "16", "18", "21"], "answer": "21"},
    lambda: {"text": "一个水桶装满水需要3小时，排空需要5小时。同时进出水，多久装满？", "options": ["6h", "7.5h", "8h", "15h"], "answer": "7.5h"},
    lambda: {"text": "甲和乙的年龄和是30，甲比乙大4岁，甲几岁？", "options": ["15", "17", "19", "21"], "answer": "17"},
    lambda: {"text": "ABC三人中只有一个说真话。A说\"不是我\"，B说\"是C\"，C说\"不是我\"。是谁？", "options": ["A", "B", "C", "无法确定"], "answer": "A"},
    lambda: {"text": "1, 3, 7, 15, 31, ?", "options": ["47", "55", "63", "71"], "answer": "63"},
    lambda: {"text": "6, 12, 20, 30, 42, ?", "options": ["52", "56", "60", "72"], "answer": "56"},
    lambda: {"text": "哪个数字不属于这个序列？2, 3, 5, 7, 9, 11, 13", "options": ["2", "7", "9", "13"], "answer": "9"},
    lambda: {"text": "0.5 + 0.25 + 0.125 约等于？", "options": ["0.75", "0.8", "0.875", "0.9"], "answer": "0.875"},
    lambda: {"text": "一个等差数列：3, 7, 11, 15, ?", "options": ["17", "18", "19", "20"], "answer": "19"},
    lambda: {"text": "如果3人3天喝3桶水，9人9天喝几桶水？", "options": ["9", "18", "27", "81"], "answer": "27"},
    lambda: {"text": "父亲的年龄是儿子的3倍，5年后父亲年龄是儿子的2.5倍，儿子现在几岁？", "options": ["8", "10", "12", "15"], "answer": "10"},
    lambda: {"text": "寻找规律：1A, 2B, 3C, 4D, ?", "options": ["5E", "5F", "6E", "4E"], "answer": "5E"},
    lambda: {"text": "64, 32, 16, 8, ?", "options": ["2", "3", "4", "6"], "answer": "4"},
]

# ─── Difficulty 3: 困难 (50 questions) ───

hard_templates = [
    lambda: {"text": "1, 11, 21, 1211, 111221, ?", "options": ["312211", "312111", "321211", "311221"], "answer": "312211"},
    lambda: {"text": "2, 10, 12, 16, 17, 18, 19, ?", "options": ["20", "22", "24", "200"], "answer": "200"},
    lambda: {"text": "1, 2, 6, 24, 120, ?", "options": ["240", "360", "600", "720"], "answer": "720"},
    lambda: {"text": "3, 5, 8, 13, 21, ?", "options": ["28", "32", "34", "38"], "answer": "34"},
    lambda: {"text": "1, 1, 4, 27, ?", "options": ["64", "128", "256", "625"], "answer": "256"},
    lambda: {"text": "2, 3, 7, 43, ?", "options": ["1807", "1849", "1936", "2025"], "answer": "1807"},
    lambda: {"text": "6, 9, 18, 45, 135, ?", "options": ["270", "337.5", "405", "472.5"], "answer": "472.5"},
    lambda: {"text": "1, 2, 3, 5, 16, 231, ?", "options": ["53105", "53106", "53205", "53305"], "answer": "53105"},
    # 高级逻辑
    lambda: {"text": "一个岛上，有骑士（总说真话）和无赖（总说假话）。A说\"B是无赖\"，B说\"A和C是同一种人\"。C是什么？", "options": ["骑士", "无赖", "无法确定", "有时真有时假"], "answer": "骑士"},
    lambda: {"text": "100个囚犯和100顶帽子（黑或白），每人猜自己帽子颜色，猜错就死。他们可以事先商量策略。最多可以存活多少人？", "options": ["50", "75", "99", "100"], "answer": "99"},
    lambda: {"text": "12个球，其中1个重量不同（不知轻重），用天平最少称几次找到？", "options": ["2", "3", "4", "5"], "answer": "3"},
    lambda: {"text": "三个开关控制一个灯（在另一个房间）。你只能进有灯的房间一次，如何确定哪个开关控制灯？", "options": ["不可能", "开一个开关等一会关掉，再开另一个", "逐个尝试", "需要两个人"], "answer": "开一个开关等一会关掉，再开另一个"},
    # 数字推理
    lambda: {"text": "12345679 × 9 = ?", "options": ["111111111", "111111110", "123456789", "99999999"], "answer": "111111111"},
    lambda: {"text": "如果 1^3+2^3+3^3 = 36, 那么 1^3+2^3+3^3+4^3 = ?", "options": ["64", "81", "100", "121"], "answer": "100"},
    lambda: {"text": "11, 22, 44, 88, ?", "options": ["132", "164", "176", "188"], "answer": "176"},
    # 语言推理
    lambda: {"text": "如果 CAT = 3120, DOG = 4157, 那么 BIRD = ?", "options": ["29184", "29183", "28194", "29174"], "answer": "29184"},
    lambda: {"text": "在一种密码中，BIRD→CJSE, FISH→GJTI, 那么 EAGLE→?", "options": ["FBHMF", "FBHME", "GBHMF", "FCINF"], "answer": "FBHMF"},
    lambda: {"text": "\"所有的A都是B\"的反面是？", "options": ["所有A都不是B", "有的A不是B", "所有B都是A", "B和A无关"], "answer": "有的A不是B"},
    # 组合数学
    lambda: {"text": "10个人两两握手，共握多少次？", "options": ["20", "45", "90", "100"], "answer": "45"},
    lambda: {"text": "把5个不同的球放入3个不同的盒子，每个盒子至少1个，几种放法？", "options": ["60", "125", "150", "243"], "answer": "150"},
    lambda: {"text": "一副扑克牌除去大小王，抽5张，同花顺的概率大约是多少？", "options": ["1/1000", "1/10000", "1/50000", "1/100000"], "answer": "1/50000"},
    # 图论/路径
    lambda: {"text": "一笔画问题：一个\"田\"字图形，可以一笔画完吗？", "options": ["可以", "不可以", "取决于起点", "有时候可以"], "answer": "不可以"},
    lambda: {"text": "从(0,0)到(4,4)的棋盘，只能向右或向上走，有多少条路径？", "options": ["56", "64", "70", "84"], "answer": "70"},
    # 概率
    lambda: {"text": "3个人生日在同一天的概率（忽略闰年）？", "options": ["1/365", "1/133225", "1/365²", "接近0"], "answer": "1/133225"},
    lambda: {"text": "蒙提霍尔问题：3扇门，1扇后有奖。你选1扇后，主持人打开另一扇空门，给你机会改选。改选后中奖概率？", "options": ["1/3", "1/2", "2/3", "1"], "answer": "2/3"},
    # 复杂推理
    lambda: {"text": "爱因斯坦谜题：5座房子，已知挪威人住第一间，蓝房子在挪威人旁边，中间房子喝牛奶……谁养鱼？", "options": ["英国人", "瑞典人", "丹麦人", "德国人"], "answer": "德国人"},
    lambda: {"text": "龟兔赛跑，乌龟先跑100米。兔子速度是乌龟的10倍。兔子多久追上？", "options": ["11.1m", "90m", "100m", "111.1m"], "answer": "111.1m"},
    lambda: {"text": "1/2 + 1/4 + 1/8 + 1/16 + ... 无限加下去等于？", "options": ["0.9", "1", "1.1", "无限大"], "answer": "1"},
    lambda: {"text": "如果昨天是明天的话，那今天就是星期五了。实际上今天是星期几？", "options": ["星期三", "星期四", "星期五", "星期日"], "answer": "星期日"},
    lambda: {"text": "36, 18, 6, 2, 1, ?", "options": ["0", "0.5", "1", "2"], "answer": "1"},
    lambda: {"text": "100, 99, 96, 91, 84, ?", "options": ["71", "75", "79", "81"], "answer": "75"},
    lambda: {"text": "2, 3, 5, 7, 11, 13, 17, ?", "options": ["19", "21", "23", "25"], "answer": "19"},
    lambda: {"text": "1, 2, 6, 15, 31, ?", "options": ["48", "52", "56", "63"], "answer": "56"},
    lambda: {"text": "3, 10, 29, 66, ?", "options": ["103", "127", "129", "131"], "answer": "127"},
    lambda: {"text": "1, 4, 10, 22, 46, ?", "options": ["70", "82", "94", "102"], "answer": "94"},
    lambda: {"text": "0, 6, 24, 60, 120, ?", "options": ["180", "210", "240", "280"], "answer": "210"},
    lambda: {"text": "8, 12, 18, 27, ?", "options": ["36", "40.5", "45", "54"], "answer": "40.5"},
    lambda: {"text": "1, 0, -1, 0, 1, 0, -1, ?", "options": ["-1", "0", "1", "2"], "answer": "0"},
    lambda: {"text": "如果 2^10 ≈ 1000，那么 2^20 ≈ ?", "options": ["2000", "10000", "1000000", "1000000000"], "answer": "1000000"},
    lambda: {"text": "log₂(8) + log₂(32) = ?", "options": ["5", "6", "8", "40"], "answer": "8"},
    lambda: {"text": "sin(90°) = ?", "options": ["0", "0.5", "1", "∞"], "answer": "1"},
    lambda: {"text": "一个圆形的面积是πr²，如果把半径扩大3倍，面积扩大几倍？", "options": ["3", "6", "9", "27"], "answer": "9"},
    lambda: {"text": "一个班有40人，25人喜欢数学，20人喜欢语文，10人两门都喜欢。有多少人两门都不喜欢？", "options": ["5", "10", "15", "20"], "answer": "5"},
    lambda: {"text": "3个人各掷一个骰子，数字之和为10的概率？", "options": ["1/8", "1/12", "1/18", "1/27"], "answer": "1/8"},
    lambda: {"text": "哪个数字不属于这个序列？4, 6, 8, 9, 10, 12, 14, 15", "options": ["4", "8", "9", "14"], "answer": "14"},
    lambda: {"text": "π的小数点后第3位是什么？", "options": ["1", "4", "5", "9"], "answer": "1"},
    lambda: {"text": "一个人向南走1km，向东走1km，向北走1km，回到了起点。他在哪里？", "options": ["赤道", "北极", "南极", "不可能"], "answer": "北极"},
    lambda: {"text": "2, 7, 22, 67, ?", "options": ["120", "188", "202", "220"], "answer": "202"},
    lambda: {"text": "5, 16, 49, 148, ?", "options": ["297", "397", "445", "473"], "answer": "445"},
]

# ─── Assemble ───

def make_question(idx, tmpl, difficulty):
    data = tmpl()
    options = data["options"]
    answer = data["answer"]
    return {
        "_id": f"q_{difficulty}_{idx:04d}",
        "type": "logic",
        "difficulty": difficulty,
        "content": {"text": data["text"]},
        "options": [{"key": chr(65 + i), "text": o} for i, o in enumerate(options)],
        "answer": chr(65 + options.index(answer)),
        "time_limit": 30 if difficulty <= 2 else 40,
    }

# Easy
for i, tmpl in enumerate(easy_templates):
    questions.append(make_question(i, tmpl, 1))

# Medium
for i, tmpl in enumerate(medium_templates):
    questions.append(make_question(i, tmpl, 2))

# Hard
for i, tmpl in enumerate(hard_templates):
    questions.append(make_question(i, tmpl, 3))

# Shuffle within each difficulty
random.shuffle(questions[:len(easy_templates)])
random.shuffle(questions[len(easy_templates):len(easy_templates)+len(medium_templates)])

# Output
out_path = "/Users/ks_128/Documents/iq_test/data/questions.json"
import os
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"Generated {len(questions)} questions")
print(f"  Easy:   {sum(1 for q in questions if q['difficulty'] == 1)}")
print(f"  Medium: {sum(1 for q in questions if q['difficulty'] == 2)}")
print(f"  Hard:   {sum(1 for q in questions if q['difficulty'] == 3)}")
print(f"Saved to: {out_path}")
