import AvatarEditor from "react-avatar-editor"
// import jpeg from 'jpeg-js';

const ImageEditor = ({picture, setPicture}: any) => {
    var editor: any = ""

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
            const canvasScaled = editor.getImageScaledToCanvas({
                width: 200,
                height: 200,
            })
            const croppedImg = canvasScaled.toDataURL()

            setPicture({
                ...picture,
                img: croppedImg.split(",")[1],
                cropperOpen: false,
                croppedImg: croppedImg,
            })
        }
    }

    const divStyle = {
        display: picture.cropperOpen ? "block" : "none",
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
        <div className="modal" onClick={handleCancel} style={divStyle}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={handleCancel}>
                    &times;
                </span>

                <div className="modal-flex">
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
            </div>
        </div>
    )
}

export default ImageEditor
