import { PredicationSchema, getPredications } from '@/lib/replicate';
import { addBackgroundToPNG } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mask = addBackgroundToPNG(body.mask);
    const values = PredicationSchema.parse({ ...body, mask });
    const result = await getPredications(values);

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
