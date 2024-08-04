import { Button, ButtonGroup, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Flex h='100%' justify='center' align='center' bg='black'>
            <ButtonGroup zIndex={5}>
                <Button size='lg' bgGradient='linear(to-b, #497CFF, #001664)' _hover={{ bg: 'unset' }} color='white' onClick={() => navigate('/lip-sync')}>
                    Lip sync
                </Button>
                <Button size='lg' bgGradient='linear(to-b, #497CFF, #001664)' _hover={{ bg: 'unset' }} color='white' onClick={() => navigate('/live-portrait')}>
                    Live portrait
                </Button>
            </ButtonGroup>
            <Image position='absolute' bottom={0} src="images/polygon.png" w='100%' />
        </Flex>
    )
}

export default Dashboard;
