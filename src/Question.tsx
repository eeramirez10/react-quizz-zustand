import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "./sore/questions"
import { type Question as QuestionType } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const getBackgroundColor = (info: QuestionType, index: number) => {
    const { correctAnswer, userSelectedAnswer } = info

    if (userSelectedAnswer == null) return 'transparent'

    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

    if (index === correctAnswer) return 'green'

    if (index === userSelectedAnswer) return 'red'

    return 'transparent'
}


export const Question = ({ info }: { info: QuestionType }) => {


    const selectAnswer = useQuestionsStore(store => store.selectAnswer)

    const handleClick = (questionId: number, answerIndex: number) => () => selectAnswer(questionId, answerIndex)


    return (
        <Card variant="outlined" sx={{ textAlign: "left", p: 2, mt: 2 }} >
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ backgroundColor: '#333' }} disablePadding>
                {info.answers.map((answer, i) => (

                    <ListItem key={i} divider disablePadding>

                        <ListItemButton
                            disabled={info.userSelectedAnswer != null }
                            onClick={handleClick(info.id, i)}
                            sx={{ backgroundColor: getBackgroundColor(info, i) }}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: "center" }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )

}