import { useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";



const Avatar = ({ onChangeImage }) => {
    const [imageUrl, setImageUrl] = useState('/default_avatar.webp')

    const onChangeAvatar = (e) => {
        // files sẽ trả về một cái mảng.
        const { files } = e.target;
        const path = URL.createObjectURL(files[0])
        setImageUrl(path);
        onChangeImage(files[0]);
    }

    useEffect(() => {
        // Chạy khi component unmount khỏi dom.
        // Trước khi change State.
        return () => {
            URL.revokeObjectURL(imageUrl);
        }
    }, [imageUrl])

    return <FormGroup>
        <Label for="avatar">
            <img
                src={imageUrl}
                className="w-100 rounded-circle object-fit-fill"
                width={100}
                height={150}

            />
        </Label>
        <Input type="file" id="avatar" onChange={onChangeAvatar} hidden />

    </FormGroup>
}

export default Avatar;