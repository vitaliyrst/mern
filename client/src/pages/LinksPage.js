import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [links, setLinks] = useState([]);

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request(
                'http://localhost:5000/api/link',
                'GET',
                null,
                {Authorization: `Bearer ${token}`}
            );

            setLinks(data);
        } catch (error) {
            console.log(error);
        }
    }, [request, token]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};

export default LinksPage;
