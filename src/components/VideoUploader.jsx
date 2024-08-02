import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DragDropUpload from "./DragDropUpload";
import { CloseIcon } from "@chakra-ui/icons";

const VideoUploader = ({ onChange, ...rest }) => {
    const [src, setSRC] = useState('');
    const [file, setFile] = useState();
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        if (file) {
            setSRC(URL.createObjectURL(file));
            setValid(true);
        } else {
            setValid(false);
        }
        onChange?.(file);
    }, [file]);

    const handleError = () => {
        setValid(false);
    }

    return (
        <Box {...rest}>
            {isValid ? (
                <Box w='100%' h='100%' position='relative'>
                    <Flex
                        position='absolute' right={2} top={2} zIndex={5}
                        w={6} h={6}
                        justify='center' align='center'
                        bg='red.500' rounded='full' cursor='pointer'
                        onClick={() => setFile(null)}
                    >
                        <CloseIcon fontSize='x-small' color='white' />
                    </Flex>
                    <video src={src} onError={handleError} controls />
                </Box>
            ) : (
                <DragDropUpload
                    accept={{
                        'video/*': []
                    }}
                    onAccept={setFile}
                />
            )}
        </Box>
    )
}

export default VideoUploader;