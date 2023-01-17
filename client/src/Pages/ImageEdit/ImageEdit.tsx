import {useState} from "react"
import AvatarEditor from "react-avatar-editor"
// import jpeg from 'jpeg-js';

const ImageEditor = () => {
    var editor: any = ""
    const [picture, setPicture] = useState({
        cropperOpen: false,
        img: "",
        zoom: 2,
        croppedImg:
            "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
    })

    const handleSlider = (e: any) => {
        setPicture({
            ...picture,
            zoom: e.target.value,
        })
    }

    const handleCancel = () => {
        setPicture({
            ...picture,
            cropperOpen: false,
        })
    }

    const setEditorRef = (ed: any) => {
        editor = ed
    }

    const handleSave = (e: any) => {
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas({width: 200, height: 200})
            const croppedImg = canvasScaled.toDataURL()

            setPicture({
                ...picture,
                img: "",
                cropperOpen: false,
                croppedImg: croppedImg,
            })
        }
        let base64String = editor.getImageScaledToCanvas().toDataURL().split(',')[1];
        console.log(base64String)
    }

    const handleFileChange = (e: any) => {
        let url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setPicture({
            ...picture,
            img: url,
            cropperOpen: true,
        })
    }

    //const compressImage = (image, quality) => {
    //     let options = { quality };
    //     let compressedData = jpeg.encode(image, options);
    //     let base64String = 'data:image/jpeg;base64,' + Buffer.from(compressedData.data).toString('base64');
    //     return base64String;
    //   }

    //const decompressImage = (base64String) => {
    //     let data = base64String.split(',')[1];
    //     let imageData = new Uint8Array(Buffer.from(data, 'base64'));
    //     let rawImageData = jpeg.decode(imageData);
    //     return rawImageData;
    //   }

    return (
        <div className="flex">
            <div>
                <div style={{width:200, height:200}}>
                    <img
                        src={picture.croppedImg}
                        style={{width: "100%", height: "auto", padding: "5"}}
                    />
                    <button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </button>
                </div>

                {picture.cropperOpen && (
                    <div>
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={200}
                            height={200}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            rotate={0}
                            scale={picture.zoom}
                        />
                        <input
                            type="range"
                            value={picture.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={(e) => handleSlider(e)}
                        ></input>
                        <div>
                            <button onClick={handleCancel}>Cancel</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageEditor
