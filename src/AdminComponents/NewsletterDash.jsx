import { useMemo, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { useSelector, useDispatch } from "react-redux";
import { getAllSubscribers, getSubscriberById, unsubscribeToNewsletter } from '../redux/actions/newsletter'

const NewsletterDash = () => {
    const dispatch = useDispatch();
    const newsletter = useSelector((state) => state.newsletter);

    useEffect(() => {
        dispatch(getAllSubscribers())
    }, [dispatch])

    // const data = [
    //     {
    //         email: {newsletter.subscribers},
    //         unsubscribe: 'poubelle img',
    //     },
    // ];

    const data = useMemo(() => newsletter.subscribers || [], [newsletter.subscribers])

console.log(newsletter);
setTimeout(() => {
    console.log("newsletter", newsletter);
}, 5000);

const columns = useMemo(
    () => [
        {
            accessorKey: 'email', //access nested data with dot notation
            header: 'Email',
            size: 150,
        },
        {
            accessorKey: 'unsubscribe',
            header: 'Désinscrire',
            size: 150,
        },
    ],
    [],
);

const table = useMaterialReactTable({
    columns,
    data,
});

return <MaterialReactTable table={table} />;
};

export default NewsletterDash;