import { Routes, Route } from 'react-router-dom';
import { Homepage } from './modules/components/layout/pages/homepage/homepage';
import { NotFound } from './modules/components/layout/pages/not-found/not-found';
import { AnimalForm } from './modules/components/layout/pages/animal-form/animal-form';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/animals/new' element={<AnimalForm />} />
            <Route path='/:id/edit' element={<AnimalForm />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}