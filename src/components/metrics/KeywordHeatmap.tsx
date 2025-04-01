
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define simplified types to avoid excessive type instantiation
export type KeywordData = {
  keyword: string;
  impressions: number;
  clicks: number;
  conversions?: number;
  score: number;
};

export type HeatmapProps = {
  data: KeywordData[];
  title?: string;
};

export const KeywordHeatmap: React.FC<HeatmapProps> = ({ 
  data = [], 
  title = "Keyword Performance Heatmap" 
}) => {
  // Calculate the max values to normalize the heatmap colors
  const maxScore = Math.max(...data.map(item => item.score), 1);
  
  // Sort data by score in descending order
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  
  // Take only top 15 items for display
  const displayData = sortedData.slice(0, 15);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {displayData.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">No keyword data available</div>
        ) : (
          <div className="grid gap-2">
            {displayData.map((item, index) => {
              // Normalize the score for color intensity (0-100%)
              const normalizedScore = (item.score / maxScore) * 100;
              
              // Calculate a color based on the normalized score
              const backgroundColor = `hsl(215, ${Math.max(20, normalizedScore)}%, ${Math.max(50, 100 - normalizedScore * 0.5)}%)`;
              
              return (
                <div 
                  key={`${item.keyword}-${index}`} 
                  className="flex items-center justify-between p-2 rounded"
                  style={{ backgroundColor }}
                >
                  <span className="font-medium truncate max-w-[70%]" title={item.keyword}>
                    {item.keyword}
                  </span>
                  <div className="flex items-center gap-3 text-sm">
                    <span title="Impressions">{item.impressions.toLocaleString()}</span>
                    <span title="Clicks">{item.clicks.toLocaleString()}</span>
                    <span title="Score" className="font-bold">
                      {item.score.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordHeatmap;
