import {visionClient} from "./gcp";
import {google} from "@google-cloud/vision/build/protos/protos";
const getConfidence = (value:google.cloud.vision.v1.Likelihood|keyof typeof google.cloud.vision.v1.Likelihood|null) => {
    switch (value) {
        case "LIKELY":
        case "VERY_LIKELY":
            return true
    }
    return  false
}
export default async function explicitCheck(base64) {
    const [result] = await visionClient.safeSearchDetection(new Buffer(base64,'base64'));
    let problem = "";
    if (getConfidence(result.safeSearchAnnotation.adult)) {
        problem = "adult"
    } else if (getConfidence(result.safeSearchAnnotation.racy)) {
        problem = "racially explicit"
    } else if (getConfidence(result.safeSearchAnnotation.violence)) {
        problem = "violent"
    }
    return problem
}
