import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { ActivityIndicator, Alert } from "react-native";
import ImageMultipleChoiceQuestion from "../../components/ImageMultipleChoiceQuestion";
import OpenEndedQuestion from "../../components/OpenEndedQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";

import questions from "../../assets/data/allQuestions";
import Header from "../../components/Header";

const QuizDetailScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
  const [lives, setLives] = useState(5);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      Alert.alert("You won the game!");
      setCurrentQuestionIndex(0);
    } else{
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if(hasLoaded){
       saveData();
    }
  }, [lives, currentQuestionIndex, hasLoaded]);

  const onCorrect = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const restartGame = () => {
    setLives(5);
    setCurrentQuestionIndex(0);
  }
  const onWrong = () => {
    if (lives <= 1){
      Alert.alert("Game Over", "Try again", [
        {
          text: "Try again",
          onPress: restartGame,
        },
      ]);
    }else {
      Alert.alert("Wrong answer");
      setLives(lives - 1);
    }
  }

  const saveData = async () => {
    await AsyncStorage.setItem("lives", String(lives));
    await AsyncStorage.setItem("currentQuestionIndex", String(currentQuestionIndex));
  }

  const loadData = async () => {
     const loadedLives = await AsyncStorage.getItem("lives");
     if (loadedLives) {
       setLives(parseInt(loadedLives));
     }
     const currentQuestionIndex = await AsyncStorage.getItem("currentQuestionIndex");
      if (currentQuestionIndex) {
        setCurrentQuestionIndex(parseInt(currentQuestionIndex));
      }

      setHasLoaded(true);
  }

  if (!hasLoaded) {
    return (<ActivityIndicator size="large" color="#0000ff" />);
  }

  return (
    <Container>
      <Header  progress={currentQuestionIndex / questions.length} lives={lives}/>
      {currentQuestion.type === "IMAGE_MULTIPLE_CHOICE" && (
        <ImageMultipleChoiceQuestion
          question={currentQuestion}
          // @ts-ignore
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
      {currentQuestion.type === "OPEN_ENDED" ? (
        <OpenEndedQuestion
          // @ts-ignore
           question={currentQuestion}
           onCorrect={onCorrect}
           onWrong={onWrong}
        />
      ) : null}
    </Container>
  );
};

export default QuizDetailScreen;

// @ts-ignore
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
`;

