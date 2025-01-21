import React, { useState } from 'react';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/fusion-logo.svg';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  telefone: z.string().trim().regex(/^[1-9]{2}[9]{0,1}[0-9]{8}$/, 'Número inválido. Digite no formato 21999999999, sem espaços.'),
  cargo: z.string().min(1, 'Cargo é obrigatório'),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

const cargos = [
  'Desenvolvedor Frontend', 'Desenvolvedor Backend', 'Desenvolvedor Full Stack',
  'Desenvolvedor Mobile', 'Desenvolvedor de Software', 'Engenheiro de Software',
  'Arquiteto de Software', 'UI/UX Designer', 'Analista de Sistemas', 'Analista Programador',
  'DevOps Engineer', 'Engenheiro de Dados', 'QA Engineer', 'Scrum Master', 'Product Owner',
];

const inputFields = [
  { id: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Fulano', required: true },
  { id: 'email', label: 'E-mail', type: 'email', placeholder: 'Fulano@gmail.com', required: true },
  { id: 'telefone', label: 'Telefone', type: 'text', placeholder: '21999999999', required: true },
  { id: 'linkedin', label: 'LinkedIn (opcional)', type: 'url', placeholder: '', required: false },
  { id: 'github', label: 'GitHub (opcional)', type: 'url', placeholder: '', required: false },
];

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  linkedin?: string;
  github?: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    linkedin: '',
    github: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      schema.parse(formData);
      setErrors({});

      const existingMembers = JSON.parse(localStorage.getItem('membros') || '[]');
      const updatedMembers = [...existingMembers, formData];

      localStorage.setItem('membros', JSON.stringify(updatedMembers));

      toast.success('Cadastro realizado com sucesso!');
      toast.info('Dados armazenados no localStorage.');

      setFormData({ nome: '', email: '', telefone: '', cargo: '', linkedin: '', github: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: FormErrors = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as keyof FormErrors] = err.message;
        });
        setErrors(formErrors);
        toast.error('Falha ao cadastrar. Verifique os dados informados.');
      } else {
        console.error(error);
        toast.error('Falha ao cadastrar. Verifique os dados informados.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1f22f1] flex flex-col items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <img className="w-[150px] mb-4" src={logo} alt="Logo da FrontEnd Fusion" />
      <h2 className="text-white text-2xl font-bold mb-6">Cadastro de Membro</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        {inputFields.map(({ id, label, type, placeholder }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={formData[id as keyof typeof formData]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 hover:bg-gray-100 transition duration-200"
              placeholder={placeholder}
            />
            {errors[id as keyof FormErrors] && <p className="text-red-500 text-xs">{errors[id as keyof FormErrors]}</p>}
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="cargo" className="block text-gray-700 text-sm font-bold mb-2">Cargo pretendido</label>
          <select
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 hover:bg-gray-100 transition duration-200"
            required
          >
            <option value="">Selecione um cargo</option>
            {cargos.map((cargo, index) => (
              <option key={index} value={cargo}>{cargo}</option>
            ))}
          </select>
          {errors.cargo && <p className="text-red-500 text-xs">{errors.cargo}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default App;
