import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import AudioUploader from "../components/AudioUploader";
import VideoUploader from "../components/VideoUploader";
import axios from "../utils/axios";
import { error } from "../utils/toast";

const LipSync = () => {
    const [audio, setAudio] = useState();
    const [video, setVideo] = useState();
    const [src, setSRC] = useState('');

    const handleProcess = async () => {
        try {
            const formData = new FormData();
            formData.append('audio', audio);
            formData.append('video', video);
            const { data } = await axios.post('/process', formData);
            setSRC(`${import.meta.env.VITE_APP_URL}/uploads/${data.url}`);
        } catch (err) {
            error(err.message);
        }
    }

    return (
        <Box h='100%' bg='url("images/background.jpg")'>
            <Flex mx='auto' p={{ base: 8, lg: 16 }} w='100%' maxW='1440px' h='100%' direction={{ base: 'column', lg: 'row' }} gap={4}>
                <Flex w='100%' direction='column' gap={4}>
                    <VideoUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setVideo} />
                    <AudioUploader w='100%' as={Flex} justify='center' bg='#FFF4' border='2px dashed #888' onChange={setAudio} />
                </Flex>
                <Flex w='100%' direction='column' gap={4}>
                    <Box aspectRatio={1.7778} border='2px dashed #888' overflow='hidden'>
                        <video src={src} controls style={{ width: '100%', height: '100%' }} />
                    </Box>
                    <Flex justify='right'>
                        <Button isDisabled={!audio || !video} onClick={handleProcess}>
                            Process
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default LipSync;
