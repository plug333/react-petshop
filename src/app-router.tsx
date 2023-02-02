import { Routes, Route } from 'react-router-dom';
import { Homepage } from './modules/components/layout/pages/homepage/homepage';
import { NotFound } from './modules/components/layout/pages/not-found/not-found';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}