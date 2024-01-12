import { useState, useEffect } from "react";
import { getAllMembers, getMemberById } from '../redux/actions/team'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Test() {
    const dispatch = useDispatch();
    const team = useSelector((state) => state.team);
    // console.log(team);

    useEffect(() => {
        // dispatch(getAllMembers())
        dispatch(getMemberById('659ef48c495e87d69c4d6f4f'))
    }, [dispatch])
setTimeout(() => {
    console.log(team);
}, 5000);

// console.log(team);

    return (
        <div className='container'>
            {/* <ul>
                {team && team.map((member) => (
                    <li>{member.fullName}</li>
                ))}
            </ul> */}
            <p>{team.fullName}</p>

        </div >
    );
}

export default Test;