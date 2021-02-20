import { render, screen } from '@testing-library/react';
import App from './App';
import Notification from './Components/Notification/index';


test('renders learn react link', () => {
  //render(<App />);
  render(
    <div>
      <Notification  tipo='success' titulo='Test' descripcion='Esto es una prueba' visible={true} ></Notification>
    </div>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
