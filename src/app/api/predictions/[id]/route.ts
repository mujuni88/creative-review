import { getPredictionById } from '@/lib/replicate';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getPredictionById(params.id);

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
