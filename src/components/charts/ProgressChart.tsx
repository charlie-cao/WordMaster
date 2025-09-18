'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// 模拟的学习进度数据
const progressData = [
  { day: '周一', words: 12, accuracy: 85 },
  { day: '周二', words: 15, accuracy: 90 },
  { day: '周三', words: 8, accuracy: 75 },
  { day: '周四', words: 20, accuracy: 88 },
  { day: '周五', words: 18, accuracy: 92 },
  { day: '周六', words: 25, accuracy: 87 },
  { day: '周日', words: 22, accuracy: 89 },
];

const difficultyData = [
  { name: '简单', value: 6, color: '#10B981' },
  { name: '中等', value: 7, color: '#F59E0B' },
  { name: '困难', value: 2, color: '#EF4444' },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

interface ProgressChartProps {
  type: 'line' | 'pie' | 'bar';
  title: string;
  height?: number;
}

export function ProgressChart({ type, title, height = 300 }: ProgressChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="words" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="words" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
}

// 学习热力图组件
export function StudyHeatmap() {
  // 生成过去30天的模拟数据
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 30), // 0-30个单词
        level: Math.floor(Math.random() * 5), // 0-4级别
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getColorIntensity = (level: number) => {
    const colors = [
      'bg-gray-100', // 0
      'bg-green-200', // 1
      'bg-green-300', // 2
      'bg-green-400', // 3
      'bg-green-500', // 4
    ];
    return colors[level] || 'bg-gray-100';
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">学习活跃度</h3>
      <div className="grid grid-cols-10 gap-1">
        {heatmapData.map((day, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-sm ${getColorIntensity(day.level)}`}
            title={`${day.date}: ${day.count} 个单词`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
        <span>30天前</span>
        <div className="flex items-center gap-1">
          <span>少</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-2 h-2 rounded-sm ${getColorIntensity(level)}`}
            />
          ))}
          <span>多</span>
        </div>
        <span>今天</span>
      </div>
    </div>
  );
}
