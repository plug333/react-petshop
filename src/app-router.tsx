import { Routes, Route } from 'react-router-dom';
import { Homepage } from './modules/components/layout/pages/homepage/homepage';
import { NotFound } from './modules/components/layout/pages/not-found/not-found';
import { AnimalForm } from './modules/components/layout/pages/animal-form/animal-form';
import { AnimalDetail } from './modules/components/layout/pages/homepage/animal-detail';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/animals/new' element={<AnimalForm />} />
            <Route path='/animal/:_id/edit' element={<AnimalForm />} />
            <Route path='/animal/:_id' element={<AnimalDetail />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}