import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead className="text-right">Rank</TableHead>
              <TableHead className="text-right">Previous</TableHead>
              <TableHead className="text-right">Search Volume</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((ranking) => (
              <TableRow key={ranking.keyword}>
                <TableCell>{ranking.keyword}</TableCell>
                <TableCell className="text-right">{ranking.rank}</TableCell>
                <TableCell className="text-right">{ranking.previousRank}</TableCell>
                <TableCell className="text-right">{ranking.searchVolume.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${ranking.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {ranking.change > 0 ? '+' : ''}{ranking.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}