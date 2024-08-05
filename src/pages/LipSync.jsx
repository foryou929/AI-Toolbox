import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import AudioUploader from "../components/AudioUploader";
import VideoUploader from "../components/VideoUploader";
import axios from "../utils/axios";
import { error } from "../utils/toast";

const LipSync = () => {
    const [audio, setAudio] = useState();
    const [video, setVideo] = useState();
    const [src, setSRC] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProcess = async () => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('audio', audio);
            formData.append('video', video);
            const { data } = await axios.post('/lip-sync', formData);
            setSRC(`${import.meta.env.VITE_APP_URL}/uploads/${data.url}`);
        } catch (err) {
            error(err.message);
        }
        setIsProcessing(false);
    }

    return (
        <Box h='100%' bg='url("images/background.jpg")'>
            <Flex mx='auto' p={{ base: 8, lg: 16 }} w='100%' maxW='1440px' h='100%' direction='column' align='center' gap={4}>
                <Text fontSize='xx-large' fontWeight='bold' align='center' bgGradient='linear(to-r, #FF1CF7, #00F0FF)' bgClip='text'>
                    Lip Sync
                </Text>
                <Flex w='100%' direction={{ base: 'column', lg: 'row' }} gap={4}>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold'>Video</Text>
                            <VideoUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setVideo} />
                        </Flex>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold'>Audio</Text>
                            <AudioUploader w='100%' aspectRatio={1.7778} as={Flex} justify='center' bg='#FFF4' border='2px dashed #888' onChange={setAudio} />
                        </Flex>
                    </Flex>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold'>Output</Text>
                            <Box aspectRatio={1.7778} border='2px dashed #888' overflow='hidden'>
                                <video src={src} controls style={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Flex>
                        <Flex justify='right'>
                            <Button isDisabled={!audio || !video || isProcessing} onClick={handleProcess}>
                                {isProcessing && <Spinner size='sm' mr={2} />}
                                Process
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default LipSync;
