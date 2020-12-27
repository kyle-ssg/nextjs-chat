import {storage} from "./gcp";
import stream from "stream";
import Project from "common/project";
export default async function uploadPhoto(prefix:string,base64:string) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(base64, 'base64'));
    const myBucket = storage.bucket("nextjschat");
    const file = myBucket.file(prefix+'.jpg');
    return new Promise((resolve,reject)=>{
        bufferStream.pipe(file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg',
            },
            public: true,
        }))
            .on('error', function(err) {
                console.log("Google cloud error", err)
                reject(err)
            })
            .on('finish', function(v) {
                resolve(`${Project.storage}${prefix}.jpg`);
            });
    })

}
