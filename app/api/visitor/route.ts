import { NextResponse } from 'next/server';

// Simple in-memory counter (resets on deploy; use Vercel KV for persistence)
let totalCount = 1000;
const dailyCounts: Record<string, number> = {};

export async function POST() {
  const today = new Date().toISOString().split('T')[0];

  totalCount += 1;
  dailyCounts[today] = (dailyCounts[today] || 0) + 1;

  return NextResponse.json({
    today: dailyCounts[today],
    total: totalCount,
  });
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  return NextResponse.json({
    today: dailyCounts[today] || 0,
    total: totalCount,
  });
}
