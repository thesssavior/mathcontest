import { Link } from "react-router-dom";
import { styled } from "styled-components";
import React, { useState } from "react";

const Wrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`

export default function Home() {
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState('') 

    return (
        <Wrapper>
            <Link to={"/list/hk-problems"}>
                <button>전호균 n제</button>
            </Link>
            <Link to={"/list/past-exam-problems"}>
                <button>기출문제</button>
            </Link>
            <Link to={"/list/self-created-problems"}>
                <button>자작문제</button>
            </Link>
        </Wrapper>
    );
}