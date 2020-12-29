import ReactCrop, {Crop} from 'react-image-crop';
import Dropzone from 'react-dropzone'
import Modal from "react-modal";

import React, {FunctionComponent, useRef, useState} from 'react';
import {ModalStyles, ModalStylesAvatar} from "../common/ModalStyles"; // we need this to make JSX compile

type ComponentType = {
    src: string,
    isLoading: boolean
    onChange: (base64:string)=>void
}

const Avatar: FunctionComponent<ComponentType> = ({isLoading,onChange, src}) => {
    const [crop, setCrop] = useState<Crop>({ aspect: 1 });
    const [filePath, setFilePath] = useState<string>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
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
        setModalVisible(false);
    }

    const onDrop = (acceptedFiles: File[])=>{
        const file = acceptedFiles?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFilePath(url);
            setModalVisible(true)
        }
    }

    return (
        <div>
            <Dropzone multiple={false} accept={["image/*"]} onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={src} className="my-avatar"/>
                        </div>
                    </section>
                )}
            </Dropzone>
                <Modal
                    appElement={document.getElementById("__next")}
                    style={ModalStylesAvatar()}
                    isOpen={modalVisible}
                    onRequestClose={()=>{
                        document.body.classList.add("ReactModal__Body--before-close")
                        setModalVisible(false)
                    }}
                    onAfterClose={()=>{
                        document.body.classList.remove("ReactModal__Body--before-close")
                    }}
                    contentLabel="Example Modal"
                    closeTimeoutMS={500}
                >
                    <div className="text-center">
                        <ReactCrop
                            imageStyle={{
                                margin:"auto",
                                maxHeight: document.body.clientHeight/2.5
                            }}
                            onImageLoaded={(img)=>{
                                imgRef.current = img;
                                const min = Math.min(img.width, img.height)
                                setCrop({
                                    unit: '%',
                                    aspect:1,
                                    width: 100,
                                })
                                return false
                            }}
                            src={filePath}
                            onChange={newCrop => setCrop(newCrop)}
                            crop={crop}
                        />
                    </div>
                    <div className="text-center">
                        <div className="flex-row row-center">
                            <button
                                onClick={()=>{
                                    setModalVisible(false)
                                }}
                                className="btn btn-outline-primary mt-2 pl-4 pr-4 mr-2">
                                Cancel
                            </button>
                            <button
                                onClick={()=>{
                                    getCroppedImg();
                                    setFilePath(null)
                                }}
                                className="btn btn-primary mt-2 ml-2 pl-4 pr-4">
                                Save
                            </button>
                        </div>

                    </div>

                </Modal>
        </div>

    )
}

export default Avatar
