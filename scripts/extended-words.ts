// 扩展的单词数据库 - 按难度和类别分类
export const extendedWordsDatabase = {
  // 基础单词 (CET4级别)
  basic: [
    {
      word: 'abandon',
      pronunciation: '/əˈbændən/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '放弃；抛弃',
          example: 'They had to abandon their car in the snow.',
          exampleTranslation: '他们不得不把车丢弃在雪地里。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 4500,
      tags: ['CET4', 'verb', 'common']
    },
    {
      word: 'ability',
      pronunciation: '/əˈbɪləti/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '能力；才能',
          example: 'She has the ability to learn languages quickly.',
          exampleTranslation: '她有快速学习语言的能力。'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 6000,
      tags: ['CET4', 'noun', 'basic']
    },
    {
      word: 'absolute',
      pronunciation: '/ˈæbsəluːt/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '绝对的；完全的',
          example: 'I have absolute confidence in you.',
          exampleTranslation: '我对你有绝对的信心。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 3800,
      tags: ['CET4', 'adjective']
    },
    {
      word: 'accept',
      pronunciation: '/əkˈsept/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '接受；承认',
          example: 'I accept your apology.',
          exampleTranslation: '我接受你的道歉。'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 7500,
      tags: ['CET4', 'verb', 'basic']
    },
    {
      word: 'access',
      pronunciation: '/ˈækses/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '通道；访问权限',
          example: 'Students need access to computers.',
          exampleTranslation: '学生需要使用计算机。'
        },
        {
          partOfSpeech: 'verb',
          meaning: '访问；进入',
          example: 'You can access your files online.',
          exampleTranslation: '你可以在线访问你的文件。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 5200,
      tags: ['CET4', 'noun', 'verb', 'technology']
    },
    {
      word: 'account',
      pronunciation: '/əˈkaʊnt/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '账户；账目；报告',
          example: 'I need to check my bank account.',
          exampleTranslation: '我需要查看我的银行账户。'
        },
        {
          partOfSpeech: 'verb',
          meaning: '解释；说明',
          example: 'How do you account for this mistake?',
          exampleTranslation: '你如何解释这个错误？'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 6800,
      tags: ['CET4', 'noun', 'verb', 'business']
    },
    {
      word: 'achieve',
      pronunciation: '/əˈtʃiːv/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '实现；达到；获得',
          example: 'She achieved her goal of becoming a doctor.',
          exampleTranslation: '她实现了成为医生的目标。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 4200,
      tags: ['CET4', 'verb', 'success']
    },
    {
      word: 'action',
      pronunciation: '/ˈækʃən/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '行动；行为；作用',
          example: 'We need to take action immediately.',
          exampleTranslation: '我们需要立即采取行动。'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 8000,
      tags: ['CET4', 'noun', 'basic']
    },
    {
      word: 'active',
      pronunciation: '/ˈæktɪv/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '积极的；活跃的；主动的',
          example: 'She leads an active lifestyle.',
          exampleTranslation: '她过着积极的生活方式。'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 5500,
      tags: ['CET4', 'adjective', 'lifestyle']
    },
    {
      word: 'actual',
      pronunciation: '/ˈæktʃuəl/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '实际的；真实的',
          example: 'The actual cost was higher than expected.',
          exampleTranslation: '实际成本比预期的要高。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 4000,
      tags: ['CET4', 'adjective']
    }
  ],

  // 中级单词 (CET6级别)
  intermediate: [
    {
      word: 'adequate',
      pronunciation: '/ˈædɪkwət/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '足够的；适当的',
          example: 'The salary is adequate for my needs.',
          exampleTranslation: '这份薪水足以满足我的需要。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2800,
      tags: ['CET6', 'adjective', 'formal']
    },
    {
      word: 'advocate',
      pronunciation: '/ˈædvəkeɪt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '提倡；拥护；主张',
          example: 'Many doctors advocate a healthy diet.',
          exampleTranslation: '许多医生提倡健康饮食。'
        },
        {
          partOfSpeech: 'noun',
          meaning: '拥护者；提倡者',
          example: 'She is an advocate for animal rights.',
          exampleTranslation: '她是动物权利的拥护者。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 2200,
      tags: ['CET6', 'verb', 'noun', 'formal']
    },
    {
      word: 'ambiguous',
      pronunciation: '/æmˈbɪɡjuəs/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '模糊的；有歧义的',
          example: 'His answer was ambiguous.',
          exampleTranslation: '他的回答很模糊。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1800,
      tags: ['CET6', 'adjective', 'academic']
    },
    {
      word: 'anticipate',
      pronunciation: '/ænˈtɪsɪpeɪt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '预期；期望；预料',
          example: 'We anticipate problems with the new system.',
          exampleTranslation: '我们预料新系统会有问题。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2500,
      tags: ['CET6', 'verb', 'planning']
    },
    {
      word: 'arbitrary',
      pronunciation: '/ˈɑːrbɪtreri/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '任意的；专制的；武断的',
          example: 'The decision seemed arbitrary.',
          exampleTranslation: '这个决定似乎很武断。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1500,
      tags: ['CET6', 'adjective', 'formal']
    },
    {
      word: 'comprehensive',
      pronunciation: '/ˌkɑːmprɪˈhensɪv/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '全面的；综合的；详尽的',
          example: 'We need a comprehensive plan.',
          exampleTranslation: '我们需要一个全面的计划。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 2000,
      tags: ['CET6', 'adjective', 'academic']
    },
    {
      word: 'constitute',
      pronunciation: '/ˈkɑːnstɪtuːt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '构成；组成；设立',
          example: 'Women constitute 40% of the workforce.',
          exampleTranslation: '女性占劳动力的40%。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1800,
      tags: ['CET6', 'verb', 'formal']
    },
    {
      word: 'contemporary',
      pronunciation: '/kənˈtempəreri/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '当代的；现代的；同时期的',
          example: 'Contemporary art is very diverse.',
          exampleTranslation: '当代艺术非常多样化。'
        },
        {
          partOfSpeech: 'noun',
          meaning: '同时代的人',
          example: 'Shakespeare and his contemporaries.',
          exampleTranslation: '莎士比亚和他的同时代人。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2300,
      tags: ['CET6', 'adjective', 'noun', 'culture']
    },
    {
      word: 'controversy',
      pronunciation: '/ˈkɑːntrəvɜːrsi/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '争议；争论；辩论',
          example: 'The new law caused much controversy.',
          exampleTranslation: '新法律引起了很大争议。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2100,
      tags: ['CET6', 'noun', 'debate']
    },
    {
      word: 'eliminate',
      pronunciation: '/ɪˈlɪmɪneɪt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '消除；排除；淘汰',
          example: 'We must eliminate all errors.',
          exampleTranslation: '我们必须消除所有错误。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2400,
      tags: ['CET6', 'verb', 'process']
    }
  ],

  // 高级单词 (TOEFL/IELTS级别)
  advanced: [
    {
      word: 'ubiquitous',
      pronunciation: '/juːˈbɪkwɪtəs/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '无处不在的；普遍存在的',
          example: 'Smartphones are ubiquitous in modern society.',
          exampleTranslation: '智能手机在现代社会无处不在。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 800,
      tags: ['TOEFL', 'IELTS', 'adjective', 'advanced']
    },
    {
      word: 'paradigm',
      pronunciation: '/ˈpærədaɪm/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '范式；模式；典型',
          example: 'This represents a new paradigm in education.',
          exampleTranslation: '这代表了教育的新模式。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1200,
      tags: ['TOEFL', 'IELTS', 'noun', 'academic']
    },
    {
      word: 'meticulous',
      pronunciation: '/məˈtɪkjələs/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '细致的；一丝不苟的',
          example: 'She is meticulous in her work.',
          exampleTranslation: '她工作一丝不苟。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 900,
      tags: ['TOEFL', 'IELTS', 'adjective', 'personality']
    },
    {
      word: 'phenomenal',
      pronunciation: '/fəˈnɑːmɪnəl/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '非凡的；杰出的；显著的',
          example: 'The team showed phenomenal improvement.',
          exampleTranslation: '团队表现出非凡的进步。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1000,
      tags: ['TOEFL', 'IELTS', 'adjective', 'praise']
    },
    {
      word: 'resilient',
      pronunciation: '/rɪˈzɪliənt/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '有弹性的；能恢复的；坚韧的',
          example: 'Children are remarkably resilient.',
          exampleTranslation: '孩子们的恢复能力非常强。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1100,
      tags: ['TOEFL', 'IELTS', 'adjective', 'psychology']
    },
    {
      word: 'substantiate',
      pronunciation: '/səbˈstænʃieɪt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '证实；支持；使具体化',
          example: 'Can you substantiate your claims?',
          exampleTranslation: '你能证实你的说法吗？'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 600,
      tags: ['TOEFL', 'IELTS', 'verb', 'academic']
    },
    {
      word: 'unprecedented',
      pronunciation: '/ʌnˈpresɪdentɪd/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '史无前例的；前所未有的',
          example: 'The pandemic created unprecedented challenges.',
          exampleTranslation: '疫情带来了前所未有的挑战。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 1300,
      tags: ['TOEFL', 'IELTS', 'adjective', 'formal']
    },
    {
      word: 'vindicate',
      pronunciation: '/ˈvɪndɪkeɪt/',
      definitions: [
        {
          partOfSpeech: 'verb',
          meaning: '证明...正确；为...辩护；澄清',
          example: 'The evidence vindicated his theory.',
          exampleTranslation: '证据证明了他的理论是正确的。'
        }
      ],
      difficulty: 'hard' as const,
      frequency: 500,
      tags: ['TOEFL', 'IELTS', 'verb', 'formal']
    }
  ],

  // 科技类单词
  technology: [
    {
      word: 'artificial',
      pronunciation: '/ˌɑːrtɪˈfɪʃəl/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '人工的；人造的；虚假的',
          example: 'Artificial intelligence is advancing rapidly.',
          exampleTranslation: '人工智能发展迅速。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 3200,
      tags: ['technology', 'AI', 'adjective']
    },
    {
      word: 'digital',
      pronunciation: '/ˈdɪdʒɪtəl/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '数字的；数码的',
          example: 'We live in a digital age.',
          exampleTranslation: '我们生活在数字时代。'
        }
      ],
      difficulty: 'easy' as const,
      frequency: 4500,
      tags: ['technology', 'modern', 'adjective']
    },
    {
      word: 'innovation',
      pronunciation: '/ˌɪnəˈveɪʃən/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '创新；革新；新方法',
          example: 'Innovation drives economic growth.',
          exampleTranslation: '创新推动经济增长。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2800,
      tags: ['technology', 'business', 'noun']
    },
    {
      word: 'interface',
      pronunciation: '/ˈɪntərfeɪs/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '界面；接口；交界面',
          example: 'The user interface is very intuitive.',
          exampleTranslation: '用户界面非常直观。'
        },
        {
          partOfSpeech: 'verb',
          meaning: '连接；接合',
          example: 'These systems interface seamlessly.',
          exampleTranslation: '这些系统无缝连接。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2200,
      tags: ['technology', 'computing', 'noun', 'verb']
    },
    {
      word: 'virtual',
      pronunciation: '/ˈvɜːrtʃuəl/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '虚拟的；实质上的',
          example: 'Virtual reality is becoming more popular.',
          exampleTranslation: '虚拟现实正变得越来越流行。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2600,
      tags: ['technology', 'VR', 'adjective']
    }
  ],

  // 商务类单词
  business: [
    {
      word: 'entrepreneur',
      pronunciation: '/ˌɑːntrəprəˈnɜːr/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '企业家；创业者',
          example: 'She is a successful entrepreneur.',
          exampleTranslation: '她是一位成功的企业家。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 1800,
      tags: ['business', 'career', 'noun']
    },
    {
      word: 'revenue',
      pronunciation: '/ˈrevənuː/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '收入；收益；税收',
          example: 'The company reported strong revenue growth.',
          exampleTranslation: '公司报告收入强劲增长。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 2400,
      tags: ['business', 'finance', 'noun']
    },
    {
      word: 'strategy',
      pronunciation: '/ˈstrætədʒi/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '策略；战略；计划',
          example: 'We need a new marketing strategy.',
          exampleTranslation: '我们需要新的营销策略。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 3500,
      tags: ['business', 'planning', 'noun']
    },
    {
      word: 'competitive',
      pronunciation: '/kəmˈpetətɪv/',
      definitions: [
        {
          partOfSpeech: 'adjective',
          meaning: '竞争的；有竞争力的',
          example: 'We offer competitive prices.',
          exampleTranslation: '我们提供有竞争力的价格。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 3000,
      tags: ['business', 'market', 'adjective']
    },
    {
      word: 'investment',
      pronunciation: '/ɪnˈvestmənt/',
      definitions: [
        {
          partOfSpeech: 'noun',
          meaning: '投资；投资额',
          example: 'Education is an investment in the future.',
          exampleTranslation: '教育是对未来的投资。'
        }
      ],
      difficulty: 'medium' as const,
      frequency: 4200,
      tags: ['business', 'finance', 'noun']
    }
  ]
};

// 将所有单词合并成一个数组
export const getAllExtendedWords = () => {
  const allWords: any[] = [];
  
  // 合并所有类别的单词
  Object.values(extendedWordsDatabase).forEach(category => {
    allWords.push(...category);
  });
  
  return allWords;
};

// 按难度获取单词
export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return getAllExtendedWords().filter(word => word.difficulty === difficulty);
};

// 按标签获取单词
export const getWordsByTag = (tag: string) => {
  return getAllExtendedWords().filter(word => word.tags.includes(tag));
};
