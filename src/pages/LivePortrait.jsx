import { Box, Button, Flex, Radio, RadioGroup, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import VideoUploader from "../components/VideoUploader";
import axios from "../utils/axios";
import { error } from "../utils/toast";

const SOURCE_TYPE = [
    { label: 'Image', value: 'image' },
    { label: 'Video', value: 'video' },
]

const LipSync = () => {
    const [srcType, setSrcType] = useState(SOURCE_TYPE[0].value);
    const [source, setSource] = useState();
    const [destination, setDestination] = useState();
    const [src, setSRC] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProcess = async () => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('src', source);
            formData.append('dst', destination);
            const { data } = await axios.post('/live-portrait', formData);
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
                    Live portrait
                </Text>
                <Flex w='100%' direction={{ base: 'column', lg: 'row' }} gap={4}>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Flex gap={4} align='end'>
                                <Text fontSize='large' fontWeight='bold'>Source</Text>
                                <RadioGroup value={srcType} onChange={setSrcType}>
                                    <Flex gap={4}>
                                        {SOURCE_TYPE.map((sourceType, index) => <Radio key={index} value={sourceType.value}>{sourceType.label}</Radio>)}
                                    </Flex>
                                </RadioGroup>
                            </Flex>
                            {srcType == SOURCE_TYPE[0].value && <ImageUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setSource} />}
                            {srcType == SOURCE_TYPE[1].value && <VideoUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setSource} />}
                        </Flex>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold'>Destination</Text>
                            <VideoUploader w='100%' aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' onChange={setDestination} />
                        </Flex>
                    </Flex>
                    <Flex w='100%' direction='column' gap={4}>
                        <Flex direction='column' gap={2}>
                            <Text fontSize='large' fontWeight='bold'>Output</Text>
                            <Box aspectRatio={1.7778} bg='#FFF4' border='2px dashed #888' overflow='hidden'>
                                <video src={src} controls style={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Flex>
                        <Flex justify='right'>
                            <Button isDisabled={!source || !destination || isProcessing} onClick={handleProcess}>
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
