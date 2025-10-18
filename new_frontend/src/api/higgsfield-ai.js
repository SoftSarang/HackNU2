const BASE_URL = 'https://platform.higgsfield.ai/v1';
const API_KEY = '93f8fe91-c3e3-4cdb-ba23-64d174756788';  // Ваш API Key ID
const API_SECRET = '01fd91629b5aa88205dae562b65235e574ced083910d283c7dee7e28d93fc8cc';  // Ваш API Key Secret

export const MODELS = {
  textToVideo: [
    {
      id: 'kling-21-master-t2v',
      name: 'Kling 2.1 Master',
      description: 'Advanced text to video generation',
      type: 'video',
      category: 'Text to Video',
      endpoint: 'text2video/kling-21-master-t2v'
    },
    {
      id: 'minimax-t2v',
      name: 'Minimax Hailuo 02',
      description: 'Text to video with Minimax model',
      type: 'video',
      category: 'Text to Video',
      endpoint: 'text2video/minimax-t2v'
    },
    {
      id: 'seedance-v1-lite-t2v',
      name: 'Seedance 1.0 Lite',
      description: 'Lite version of text to video generation',
      type: 'video',
      category: 'Text to Video',
      endpoint: 'text2video/seedance-v1-lite-t2v'
    }
  ],
  imageToVideo: [
    {
      id: 'kling-2-5',
      name: 'Kling 2.5 Turbo',
      description: 'Fast image to video conversion',
      type: 'video',
      category: 'Image to Video',
      endpoint: 'image2video/kling-2-5'
    },
    {
      id: 'minimax',
      name: 'Minimax Hailuo 02',
      description: 'Image to video with Minimax model',
      type: 'video',
      category: 'Image to Video',
      endpoint: 'image2video/minimax'
    },
    {
      id: 'veo3',
      name: 'Veo 3',
      description: 'Advanced video generation from images',
      type: 'video',
      category: 'Image to Video',
      endpoint: 'image2video/veo3'
    },
    {
      id: 'wan-25-fast',
      name: 'Wan 2.5 Fast',
      description: 'Quick image to video conversion',
      type: 'video',
      category: 'Image to Video',
      endpoint: 'image2video/wan-25-fast'
    }
  ],
  textToImage: [
    {
      id: 'nano-banana',
      name: 'Nano Banana',
      description: 'Fast text to image generation',
      type: 'image',
      category: 'Text to Image',
      endpoint: 'text2image/nano-banana'
    },
    {
      id: 'see-dream',
      name: 'Seedream 4.0',
      description: 'High-quality image generation',
      type: 'image',
      category: 'Text to Image',
      endpoint: 'text2image/see-dream'
    }
  ]
};

// Flatten all models for easy access
export const ALL_MODELS = [
  ...MODELS.textToVideo,
  ...MODELS.imageToVideo,
  ...MODELS.textToImage
];

export const generateContent = async (modelId, prompt, additionalParams = {}) => {
  try {
    // Find the model based on modelId
    const modelData = findModelById(modelId);
    if (!modelData) {
      throw new Error('Invalid model ID');
    }

    // Use the model's endpoint
    const url = `${BASE_URL}/${modelData.endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'hf-api-key': API_KEY,
        'hf-secret': API_SECRET
      },
      body: JSON.stringify({
        params: {
          prompt,
          aspect_ratio: "4:3", // Example parameter, you can modify it
          input_images: [],
          ...additionalParams
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate content');
    }

    const data = await response.json();
    console.log('Initial response:', data); // Для отладки
    const taskId = data.id;

    // Start polling for results
    const result = await pollForResults(taskId);
    console.log('Final result:', result); // Для отладки
    return result;

  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

// Helper function to find a model by ID across all categories
const findModelById = (modelId) => {
  for (const category in MODELS) {
    const model = MODELS[category].find(m => m.id === modelId);
    if (model) {
      return model;
    }
  }
  return null;
};

// Poll for results with configurable interval
const pollForResults = async (taskId) => {
  const pollInterval = 5000; // 5 seconds between checks
  const maxAttempts = 60; // 5 minutes total (5 seconds * 60)
  let attempts = 0;

  const checkStatus = async () => {
    const response = await fetch(`${BASE_URL}/job-sets/${taskId}`, {
      headers: {
        'hf-api-key': API_KEY,
        'hf-secret': API_SECRET
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check generation status');
    }

    const data = await response.json();
    console.log('Status check response:', data); // Для отладки
    return data;
  };

  while (attempts < maxAttempts) {
    try {
      const result = await checkStatus();

      if (result.jobs && result.jobs[0]) {
        console.log('Job status:', result.jobs[0].status); // Для отладки
        
        if (result.jobs[0].status === 'completed' && result.jobs[0].results) {
          console.log('Completed job results:', result.jobs[0].results); // Для отладки
          
          return {
            jobId: result.id,
            type: result.type,
            createdAt: result.created_at,
            result: {
              raw: {
                url: result.jobs[0].results.raw.url
              }
            }
          };
        } else if (result.jobs[0].status === 'failed') {
          throw new Error(result.jobs[0].error || 'Generation failed');
        }
      }
      
      console.log(`Attempt ${attempts + 1} of ${maxAttempts}`); // Для отладки
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      attempts++;
    } catch (error) {
      console.error('Error checking status:', error);
      throw error;
    }
  }

  throw new Error('Generation timed out');
};