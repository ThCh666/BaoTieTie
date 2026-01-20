import { Conference } from './types';

export const MOCK_CONFERENCES: Conference[] = [
  {
    id: 'cvpr-2024',
    name: 'IEEE/CVF 计算机视觉与模式识别会议 (CVPR)',
    acronym: 'CVPR 2024',
    location: '美国 西雅图',
    dates: '2024年6月17-21日',
    tags: ['人工智能', '计算机视觉', '顶级会议'],
    imageUrl: 'https://picsum.photos/800/400?random=1',
    providerCount: 12,
    basePrice: 50
  },
  {
    id: 'neurips-2024',
    name: '神经信息处理系统大会 (NeurIPS)',
    acronym: 'NeurIPS 2024',
    location: '加拿大 温哥华',
    dates: '2024年12月10-15日',
    tags: ['人工智能', '机器学习'],
    imageUrl: 'https://picsum.photos/800/400?random=2',
    providerCount: 8,
    basePrice: 60
  },
  {
    id: 'asco-2024',
    name: '美国临床肿瘤学会年会 (ASCO Annual Meeting)',
    acronym: 'ASCO 2024',
    location: '美国 芝加哥',
    dates: '2024年5月31日 - 6月4日',
    tags: ['医学', '肿瘤学', '临床研究'],
    imageUrl: 'https://picsum.photos/800/400?random=5',
    providerCount: 15,
    basePrice: 70
  },
  {
    id: 'aps-march-2024',
    name: '美国物理学会三月会议 (APS March Meeting)',
    acronym: 'APS March',
    location: '美国 明尼阿波利斯',
    dates: '2024年3月3-8日',
    tags: ['物理', '凝聚态物理', '量子信息'],
    imageUrl: 'https://picsum.photos/800/400?random=6',
    providerCount: 6,
    basePrice: 45
  },
  {
    id: 'icra-2024',
    name: 'IEEE 机器人与自动化国际会议 (ICRA)',
    acronym: 'ICRA 2024',
    location: '日本 横滨',
    dates: '2024年5月13-17日',
    tags: ['机器人', '自动化', '工程'],
    imageUrl: 'https://picsum.photos/800/400?random=7',
    providerCount: 4,
    basePrice: 60
  },
  {
    id: 'acs-fall-2024',
    name: '美国化学会秋季会议',
    acronym: 'ACS Fall',
    location: '美国 丹佛',
    dates: '2024年8月18-22日',
    tags: ['化学', '材料科学'],
    imageUrl: 'https://picsum.photos/800/400?random=3',
    providerCount: 5,
    basePrice: 45
  },
  {
    id: 'aom-2024',
    name: '管理学会年会 (Academy of Management Annual Meeting)',
    acronym: 'AOM 2024',
    location: '美国 芝加哥',
    dates: '2024年8月9-13日',
    tags: ['管理学', '商科', '组织行为'],
    imageUrl: 'https://picsum.photos/800/400?random=8',
    providerCount: 9,
    basePrice: 50
  },
  {
    id: 'isscc-2024',
    name: '国际固态电路会议 (ISSCC)',
    acronym: 'ISSCC 2024',
    location: '美国 旧金山',
    dates: '2024年2月18-22日',
    tags: ['电子工程', '芯片', '半导体'],
    imageUrl: 'https://picsum.photos/800/400?random=9',
    providerCount: 3,
    basePrice: 55
  },
  {
    id: 'siggraph-2024',
    name: 'ACM 计算机图形学与交互技术大会',
    acronym: 'SIGGRAPH',
    location: '美国 丹佛',
    dates: '2024年7月28日 - 8月1日',
    tags: ['图形学', '交互技术'],
    imageUrl: 'https://picsum.photos/800/400?random=4',
    providerCount: 3,
    basePrice: 55
  },
  {
    id: 'agu-2024',
    name: '美国地球物理联盟秋季会议 (AGU Fall Meeting)',
    acronym: 'AGU 2024',
    location: '美国 华盛顿特区',
    dates: '2024年12月9-13日',
    tags: ['地球科学', '气候变化', '环境科学'],
    imageUrl: 'https://picsum.photos/800/400?random=10',
    providerCount: 7,
    basePrice: 48
  },
  {
    id: 'aaa-2024',
    name: '美国人类学协会年会 (AAA Annual Meeting)',
    acronym: 'AAA 2024',
    location: '美国 坦帕',
    dates: '2024年11月20-24日',
    tags: ['社会科学', '人类学'],
    imageUrl: 'https://picsum.photos/800/400?random=11',
    providerCount: 5,
    basePrice: 45
  },
  {
    id: 'aea-2024',
    name: '美国经济学会年会 (AEA Annual Meeting)',
    acronym: 'AEA 2024',
    location: '美国 圣安东尼奥',
    dates: '2024年1月5-7日',
    tags: ['经济学', '商科'],
    imageUrl: 'https://picsum.photos/800/400?random=12',
    providerCount: 8,
    basePrice: 55
  },
  {
    id: 'sfn-2024',
    name: '神经科学学会年会 (Neuroscience 2024)',
    acronym: 'SfN 2024',
    location: '美国 芝加哥',
    dates: '2024年10月5-9日',
    tags: ['医学', '神经科学', '生命科学'],
    imageUrl: 'https://picsum.photos/800/400?random=13',
    providerCount: 14,
    basePrice: 65
  },
  {
    id: 'mrs-fall-2024',
    name: '材料研究学会秋季会议 (MRS Fall)',
    acronym: 'MRS Fall 2024',
    location: '美国 波士顿',
    dates: '2024年12月1-6日',
    tags: ['材料科学', '物理', '化学'],
    imageUrl: 'https://picsum.photos/800/400?random=14',
    providerCount: 6,
    basePrice: 50
  },
  {
    id: 'chi-2024',
    name: 'ACM 人机交互会议 (CHI)',
    acronym: 'CHI 2024',
    location: '美国 夏威夷',
    dates: '2024年5月11-16日',
    tags: ['计算机', '人机交互'],
    imageUrl: 'https://picsum.photos/800/400?random=15',
    providerCount: 10,
    basePrice: 60
  },
  {
    id: 'acl-2024',
    name: '计算语言学协会年会 (ACL)',
    acronym: 'ACL 2024',
    location: '泰国 曼谷',
    dates: '2024年8月11-16日',
    tags: ['人工智能', '自然语言处理'],
    imageUrl: 'https://picsum.photos/800/400?random=16',
    providerCount: 7,
    basePrice: 50
  },
  {
    id: 'eccv-2024',
    name: '欧洲计算机视觉会议 (ECCV)',
    acronym: 'ECCV 2024',
    location: '意大利 米兰',
    dates: '2024年9月29日 - 10月4日',
    tags: ['人工智能', '计算机视觉'],
    imageUrl: 'https://picsum.photos/800/400?random=17',
    providerCount: 9,
    basePrice: 55
  },
  {
    id: 'aacr-2024',
    name: '美国癌症研究协会年会 (AACR)',
    acronym: 'AACR 2024',
    location: '美国 圣地亚哥',
    dates: '2024年4月5-10日',
    tags: ['医学', '肿瘤学'],
    imageUrl: 'https://picsum.photos/800/400?random=18',
    providerCount: 12,
    basePrice: 70
  },
  {
    id: 'iclr-2024',
    name: '国际学习表征会议 (ICLR)',
    acronym: 'ICLR 2024',
    location: '奥地利 维也纳',
    dates: '2024年5月7-11日',
    tags: ['人工智能', '深度学习'],
    imageUrl: 'https://picsum.photos/800/400?random=19',
    providerCount: 8,
    basePrice: 60
  },
  {
    id: 'aaai-2024',
    name: 'AAAI 人工智能会议',
    acronym: 'AAAI 2024',
    location: '加拿大 温哥华',
    dates: '2024年2月20-27日',
    tags: ['人工智能', '顶级会议'],
    imageUrl: 'https://picsum.photos/800/400?random=20',
    providerCount: 11,
    basePrice: 55
  },
  {
    id: 'kdd-2024',
    name: 'ACM 知识发现与数据挖掘会议 (KDD)',
    acronym: 'KDD 2024',
    location: '西班牙 巴塞罗那',
    dates: '2024年8月25-29日',
    tags: ['数据科学', '人工智能'],
    imageUrl: 'https://picsum.photos/800/400?random=21',
    providerCount: 5,
    basePrice: 55
  },
  {
    id: 'ijcai-2024',
    name: '国际人工智能联合会议 (IJCAI)',
    acronym: 'IJCAI 2024',
    location: '韩国 济州岛',
    dates: '2024年8月3-9日',
    tags: ['人工智能'],
    imageUrl: 'https://picsum.photos/800/400?random=22',
    providerCount: 6,
    basePrice: 50
  },
  {
    id: 'sc-2024',
    name: '国际高性能计算、网络、存储和分析会议 (SC)',
    acronym: 'SC24',
    location: '美国 亚特兰大',
    dates: '2024年11月17-22日',
    tags: ['计算机', '高性能计算'],
    imageUrl: 'https://picsum.photos/800/400?random=23',
    providerCount: 4,
    basePrice: 60
  },
  {
    id: 'cell-bio-2024',
    name: 'ASCB/EMBO 细胞生物学会议',
    acronym: 'Cell Bio 2024',
    location: '美国 圣地亚哥',
    dates: '2024年12月14-18日',
    tags: ['生命科学', '生物学'],
    imageUrl: 'https://picsum.photos/800/400?random=24',
    providerCount: 7,
    basePrice: 50
  }
];

export const PRINTING_COST = 40; // Flat rate for printing assumption
export const DESIGN_COST = 100; // Flat rate for design assumption