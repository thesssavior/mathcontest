import { useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import Main from "../components/Main/Main";
import useTimeStore from "../timeStore";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const Wrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`

const Form = styled.form``

const Input = styled.input``

export default function Problem() {
    // Params from router 
    const { folderName, number } = useParams<{folderName:string; number:string}>()

    // component states
    const [imgUrl, setImgUrl] = useState('')
    const [answer, setAnswer] = useState('') 
    const [realAnswer, setRealAnswer] = useState<number>()
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState('') 
    const onChange =async (e:React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }

    // zustand state from stopwatch
    // hooks can only be called inside a body of a function component
    // useEffect나 다른 함수 안에서 쓸 수가 없다
    const timeArray = useTimeStore((state) => state.timeArray);


    useEffect(()=>{
        const leaderboardRef = collection(db, "leaderboard")
        

        // just one more update onsubmit
    }, [])

    // firebase ref
    useEffect(()=>{
        try{
            setIsLoading(true)
            const backspaced = folderName?.slice(0,-1)
            const imgRef = ref(storage, `${folderName}/${backspaced}${number}.jpg`)    
            getDownloadURL(imgRef).then((url)=>{
                setImgUrl(url)
            })
            const problemRef = doc(db, `${folderName}`, `${backspaced}${number}`)
    
            getDoc(problemRef).then((problemSnapshot)=>{
                if (problemSnapshot.exists()){
                    const answer = problemSnapshot.data().answer
                    console.log(answer)
                    setRealAnswer(answer)
                }
            })
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
 

    },[])


    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = auth.currentUser
        // 정답이 아님 입구컷? 아님 걍 틀린 그대로 db에 보낼까?
        if (!user || isLoading || parseInt(answer) !== realAnswer) return null;
        try {
            setIsLoading(true)
            // create/update document 
            const backspaced = folderName?.slice(0,-1)
            const leaderboardRef = doc(db, `${folderName}`, `${backspaced}${number}/leaderboard/${user.uid}`)
            await setDoc(leaderboardRef, {
                username: user.displayName,
                time: timeArray,
                rank: 1
            })
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Wrapper>
                    <img src={imgUrl} alt="math prob image"/>
                </Wrapper>
                <Wrapper>
                    <Input type="answer" value={answer} onChange={onChange}/>
                    <Input type="submit" value={ isLoading ? "Loading..." : "Submit"}/>
                </Wrapper>
            </Form>
            <Wrapper>
                <Main/>
            </Wrapper>
        </Wrapper>
    );
}