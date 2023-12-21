import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    align-items: center;
`

export default function Layout() {
    return (
        <Wrapper>
            <Outlet/>
        </Wrapper>
    );
}