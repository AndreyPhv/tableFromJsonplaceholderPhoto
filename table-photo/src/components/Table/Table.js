import React from 'react';

export default props => {

    return (
        <table className="table table-striped p-5 table-bordered" >
            <thead className="thead-dark">
                <tr>
                    <th scope="col">albumId</th>
                    <th scope="col" onClick={props.sortingById}>id {props.sortTriangle} </th>
                    <th scope="col">title</th>
                    <th scope="col">littleImg</th>
                </tr>
            </thead>
            <tbody>
                {props.displayData.map(persone => (
                    <tr key={persone.id}>
                        <td>{persone.albumId}</td>
                        <td>{persone.id}</td>
                        <td>{persone.title}</td>
                        <td className="d-flex justify-content-center">
                            <img src={persone.thumbnailUrl} 
                                 alt='color img' 
                                 onClick={() => props.showBigColor(persone.url)}/>
                            <br/>{'<= click me'}
                        </td>
                    </tr>
                ))}                
            </tbody>
        </table> 
    )
}
