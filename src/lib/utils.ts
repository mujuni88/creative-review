import bufferToDataUrl from 'buffer-to-data-url';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

export function readAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });
}

export function addBackgroundToPNG(dataUrl: string) {
  const options = {
    colorType: 2,
    bgColor: {
      red: 0,
      green: 0,
      blue: 0,
    },
  } as const;

  const arrayBuffer = dataUriToBuffer(dataUrl).buffer;
  const _buffer = Buffer.from(arrayBuffer);
  const png = PNG.sync.read(_buffer);
  const buffer = PNG.sync.write(png, options);

  if (process.env.NODE_ENV !== 'production') {
    const filename = dataUrl.substring(dataUrl.length - 10) + '.png';
    fs.writeFileSync(path.join(__dirname, filename), buffer);
    console.log(path.join(__dirname, filename));
  }

  return bufferToDataUrl('image/png', buffer);
}
