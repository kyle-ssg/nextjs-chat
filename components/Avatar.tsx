import ReactCrop, {Crop} from 'react-image-crop';

import React, {FunctionComponent, useRef, useState} from 'react'; // we need this to make JSX compile

type ComponentType = {
    src: string,
    isLoading: boolean
    onChange: (base64:string)=>void
}

const Avatar: FunctionComponent<ComponentType> = ({isLoading,onChange, src}) => {
    const [crop, setCrop] = useState<Crop>({   aspect: 1 });
    const imgRef = useRef<HTMLImageElement>(null)
    function getCroppedImg() {
        const image:HTMLImageElement = imgRef.current;
        if (!image){
            return
        }
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        onChange(base64Image.split("base64,")[1])
    }

    return (
        <div>
            <img src={src} className="my-avatar"/>
            {/*<ReactCrop*/}
            {/*    onImageLoaded={(img)=>{*/}
            {/*        imgRef.current = img;*/}
            {/*        const min = Math.min(img.width, img.height)*/}
            {/*        setCrop({*/}
            {/*            unit: '%',*/}
            {/*            aspect:1,*/}
            {/*            width: 100,*/}
            {/*        })*/}
            {/*        return false*/}
            {/*    }}*/}
            {/*    src={src}*/}
            {/*    onChange={newCrop => setCrop(newCrop)}*/}
            {/*    crop={crop}*/}
            {/*/>*/}

        </div>

    )
}

export default Avatar
