import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <ButtonGroup>
            <Button onClick={() => navigate('/lip-sync')}>
                Lip sync
            </Button>
            <Button onClick={() => navigate('/live-portrait')}>
                Live portrait
            </Button>
        </ButtonGroup>
    )
}

export default Dashboard;
