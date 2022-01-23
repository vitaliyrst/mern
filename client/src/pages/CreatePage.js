import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    const pressHandler = async (eo) => {
        if (eo.key === 'Enter') {
            try {
                const data = await request(
                    'http://localhost:5000/api/link/generate',
                    'POST', {from: link},
                    {Authorization: `Bearer ${auth.token}`}
                );

                navigate(`/detail/${data.link._id}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        id="link" name="link"
                        type="text"
                        placeholder="enter your link"
                        value={link}
                        onChange={(eo) => setLink(eo.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter your link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
