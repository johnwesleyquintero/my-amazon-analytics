
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface KeywordRanking {
  keyword: string;
  rank: number;
  previousRank: number;
  searchVolume: number;
  change: number;
}

interface KeywordRankingTableProps {
  rankings: KeywordRanking[];
}

export function KeywordRankingTable({ rankings }: KeywordRankingTableProps) {
  if (!rankings || rankings.length === 0) {
    return (
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Top Keyword Rankings</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-gray-700">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Top Keyword Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-900">
            <thead className="text-sm">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Keyword</th>
                <th className="text-center py-3 px-4 font-semibold">Rank</th>
                <th className="text-center py-3 px-4 font-semibold">Change</th>
                <th className="text-right py-3 px-4 font-semibold">Search Volume</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="text-left py-3 px-4 font-medium">{item.keyword}</td>
                  <td className="text-center py-3 px-4">
                    <Badge variant="outline" className="font-semibold">
                      #{item.rank}
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      {item.change > 0 ? (
                        <div className="flex items-center text-green-600">
                          <ChevronUp className="w-4 h-4" />
                          <span>{Math.abs(item.change)}</span>
                        </div>
                      ) : item.change < 0 ? (
                        <div className="flex items-center text-red-600">
                          <ChevronDown className="w-4 h-4" />
                          <span>{Math.abs(item.change)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <Minus className="w-4 h-4" />
                          <span>0</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-medium">
                    {item.searchVolume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
