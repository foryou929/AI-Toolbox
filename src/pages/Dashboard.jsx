import { Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Flex h='100%' direction='column' justify='center' align='center' gap={4} bg='black'>
            <Text fontSize={{ base: 'xx-large', md: 'xxx-large' }} fontWeight='bold' bgGradient='linear(to-r, #FF1CF7, #00F0FF)' bgClip='text'>
                Lip Synchronization
            </Text>
            <Text fontSize={{ base: 'xx-large', md: 'xxx-large' }} fontWeight='semibold' color='white'>
                Real-Time High Quality
            </Text>
            <Text w={{ base: '85%', md: '65%' }} fontSize={{ md: 'large' }} align='center' color='white'>
                Unlock the future of animation with our state-of-the-art real-time lipsync technology, which delivers impeccably synchronized,
                natural-looking lip movements for your virtual characters, enhancing their expressiveness and engagement
                in any digital experience.
            </Text>
            <ButtonGroup zIndex={5}>
                <Button size='lg' bgGradient='linear(to-b, #497CFF, #001664)' _hover={{ bg: 'unset' }} color='white' onClick={() => navigate('/lip-sync')}>
                    Lip sync
                </Button>
                <Button size='lg' bgGradient='linear(to-b, #497CFF, #001664)' _hover={{ bg: 'unset' }} color='white' onClick={() => navigate('/live-portrait')}>
                    Live portrait
                </Button>
            </ButtonGroup>
            <Image position='absolute' bottom={0} src="images/polygon.png" w='100%' />
        </Flex >
    )
}

export default Dashboard;
