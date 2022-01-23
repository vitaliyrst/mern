import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
    if (!links.length) {
        return (
            <p className='center'>
                No links
            </p>
        );
    }

    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Short link</th>
                <th>Original Link</th>
                <th>Open link</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link,index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{link.to}</td>
                        <td>{link.from}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>
                                Open link
                            </Link>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default LinksList;
