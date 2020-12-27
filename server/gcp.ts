import vision from '@google-cloud/vision';
import {Storage} from '@google-cloud/storage';
const credentials = JSON.parse(process.env.GCP);

export const storage = new Storage({
    credentials
});

export const visionClient = new vision.ImageAnnotatorClient({
    credentials
});
