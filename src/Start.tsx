import { Button } from "@mui/material"
import { useQuestionsStore } from "./sore/questions"

const LIMIT_QUESTIONS = 10;

export const Start = () => {

    const fecthQuestions = useQuestionsStore( state => state.fectchQuestions)

    const handleFetchQuestions = async () => {
       await fecthQuestions(LIMIT_QUESTIONS)
    }

    return (
        <Button onClick={handleFetchQuestions} variant="contained">
            Empezar
        </Button>
    )


}