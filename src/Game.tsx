import { useQuestionsStore } from "./sore/questions"
import { Question } from "./Question";
import { IconButton, Stack, Typography } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos} from '@mui/icons-material'

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore( state => state.goNextQuestion)
    const goPreviusQuestion = useQuestionsStore( state => state.goPreviusQuestion)


    const questionInfo = questions[currentQuestion];


    return (
        <>
            <Stack direction='row' gap='2' alignItems='center' justifyContent='center'>
                <Typography variant="h4">
                    {   currentQuestion + 1        } de { questions.length }
                </Typography>

                <IconButton onClick={goPreviusQuestion}>
                    <ArrowBackIosNew />
                </IconButton>

                <IconButton onClick={goNextQuestion}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
        </>
    )

}