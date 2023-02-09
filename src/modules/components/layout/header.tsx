import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className="title-header">
                <h3>Petshop</h3>
            </div>

            <div className="button-header">
                <button onClick={() => navigate('/')}>Homepage</button>
                <button onClick={() => navigate('/animals/new')}>Add Animal</button>
            </div>
        </div>
    )
}