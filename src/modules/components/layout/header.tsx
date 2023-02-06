import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className='header'>
            <Link to='/'>Homepage</Link>
            <Link to='/animals/new'>Add Animal</Link>
            <Link to='/:id/edit'>Edit Animal</Link>
        </div>
    )
}