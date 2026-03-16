import {BasePage} from "../../components/BasePage/BasePage";
import {Button} from "../../components/Button/Button";
import bg from "../../assets/background/main-background.png";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Main menu (Start) page of the application.
 *
 * This page serves as the entry point after user selection.
 * It provides navigation to the main sections of the game:
 *
 * - Start Game
 * - Settings
 * - Results
 *
 * The page uses the userId from URL parameters to keep routing
 * consistent within a user-specific session.
 */
export const StartPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  return (
    <BasePage background={bg}>
      <>
        <Button onClick={() => navigate(`/${userId}/game`)}>START</Button>
        <Button onClick={() => navigate(`/${userId}/settings`)}>SETTINGS</Button>
        <Button onClick={() => navigate(`/${userId}/results`)}>RESULTS</Button>
      </>
    </BasePage>
  );
};

