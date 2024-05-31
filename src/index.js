import Main from './Main';
import { createRoot } from 'react-dom/client';
import './assets/css/globals.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Main tab='home' />);
