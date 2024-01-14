import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMembers, getMemberById, login, addMember, getByRole, deleteMember, updateMember, switchToMasseur, switchToAdmin } from '../redux/actions/team'
import { getAllMissions, getMissionById, addMission, getMissionByType, deleteMission, updateMission, getMissionsByStatus, getMissionsByPartnerBillingStatus, getMissionsByTeamBillingStatus, registerToMission, dropMission } from '../redux/actions/missions'
import { getAllPartners, getPartnerById, addPartner, getPartnerByType, deletePartner, updatePartner } from '../redux/actions/partners'
import { getAllContacts, getContactById, addContact, deleteContact, updateContact } from '../redux/actions/directory'
import { getAllSubscribers, subscribeToNewsletter, getSubscriberById, unsubscribeToNewsletter } from '../redux/actions/newsletter'

function Test() {
    const dispatch = useDispatch();
    const team = useSelector((state) => state.team);
    const missions = useSelector((state) => state.missions);
    const partners = useSelector((state) => state.partners);
    const directory = useSelector((state) => state.directory);
    const newsletter = useSelector((state) => state.newsletter);

    useEffect(() => {
        dispatch(getAllMembers())
        // dispatch(getMemberById('659ef48c495e87d69c4d6f4f'))
        dispatch(getAllMissions())
        dispatch(getAllPartners())
        dispatch(getAllContacts())
        dispatch(getAllSubscribers())
    }, [dispatch])

    setTimeout(() => {
        console.log("team", team);
        console.log("missions", missions);
        console.log("partners", partners);
        console.log("directory", directory);
        console.log("newsletter", newsletter);
    }, 5000);

    // console.log(team);

    return (
        <div className='container'>
            {/* <ul>
                {team && team.map((member) => (
                    <li>{member.fullName}</li>
                ))}
            </ul> */}
            {/* <p>{team.fullName}</p> */}

        </div >
    );
}

export default Test;