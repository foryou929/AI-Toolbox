import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import VideoUploader from "../components/VideoUploader";
import axios from "../utils/axios";
import { error } from "../utils/toast";

const LipSync = () => {
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [src, setSRC] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProcess = async () => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('video', video);
            const { data } = await axios.post('/live-portrait', formData);
            setSRC(`${import.meta.env.VITE_APP_URL}/uploads/${data.url}`);
        } catch (err) {
            error(err.message);
        }
        setIsProcessing(false);
    }

    return (
        <Box h='100%' bg='url("images/background.jpg")'>
            <Flex mx='auto' p={{ base: 8, lg: 16 }} w='100%' maxW='1440px' h='100%' direction='column' gap={4}>
                <Text fontSize='xx-large' fontWeight='bold' color='white' align='center' bgGradient='linear(to-r, #FF0080, #7928CA)' bgClip='text'>
                    Live portrait
                </Text>
                <Flex w='100%' direction={{ base: 'column', lg: 'row' }} gap={4}>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold' color='white'>Image</Text>
                            <ImageUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setImage} />
                        </Flex>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold' color='white'>Video</Text>
                            <VideoUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setVideo} />
                        </Flex>
                    </Flex>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold' color='white'>Output</Text>
                            <Box aspectRatio={1.7778} border='2px dashed #888' overflow='hidden'>
                                <video src={src} controls style={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Flex>
                        <Flex justify='right'>
                            <Button isDisabled={!image || !video || isProcessing} onClick={handleProcess}>
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
