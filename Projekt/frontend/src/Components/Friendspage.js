import { useParams } from 'react-router-dom';

export default function Friendpage() {
    const { friendName } = useParams();

    return (
        <>
            <p> du är på {friendName}s sida</p> 
        </>
    )
}