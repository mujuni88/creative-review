import { z } from 'zod';

export const PredicationSchema = z.object({
  prompt: z.string(),
  mask: z.string(),
  image: z.string(),
  width: z.number(),
  height: z.number(),
});

export type PredictionResult = {
  completed_at: string;
  created_at: string;
  error: null | string;
  id: string;
  input: {
    mask: string;
    image: string;
    prompt: string;
    num_outputs: number;
    guidance_scale: number;
    prompt_strength: number;
    num_inference_steps: number;
  };
  logs: string;
  metrics: {
    predict_time: number;
  };
  output: string[];
  started_at: string;
  status: string;
  urls: {
    get: string;
    cancel: string;
  };
  version: string;
};

export type GetPredicationsParams = {
  prompt: string;
  mask: string;
  image: string;
  width: number;
  height: number;
};

export async function getPredications(
  data: GetPredicationsParams
): Promise<PredictionResult> {
  const { prompt, mask, image, width, height = 512 } = data;
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version:
        'c11bac58203367db93a3c552bd49a25a5418458ddffb7e90dae55780765e26d6',
      input: {
        mask,
        image,
        width,
        height,
        prompt,
        scheduler: 'DPMSolverMultistep',
        num_outputs: 4,
        guidance_scale: 7.5,
        num_inference_steps: 25,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    return { error } as PredictionResult;
  }

  const prediction = await response.json();
  console.log(prediction);

  return prediction as PredictionResult;
}

export async function getPredictionById(
  queryId: string
): Promise<PredictionResult> {
  const response = await fetch(
    'https://api.replicate.com/v1/predictions/' + queryId,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    console.error(error);
    return { error } as PredictionResult;
  }

  const prediction = await response.json();

  console.log(prediction);

  return prediction as PredictionResult;
}
