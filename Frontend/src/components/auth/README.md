# 🔐 Sistema de Autenticação - AplotCloud

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx       # Formulário de login com animações
│   │   ├── RegisterForm.tsx    # Formulário de registro com validações
│   │   └── README.md          # Este arquivo
│   └── ui/
│       ├── input.tsx          # Componente de Input reutilizável
│       └── button.tsx         # Componente de Button
└── app/
    └── auth/
        ├── login/
        │   └── page.tsx       # Página de Login
        └── register/
            └── page.tsx       # Página de Registro
```

## 🎨 Design

Todas as telas seguem o guia de cores **CORES_APLOTCLOUD.md**:
- **Cor Principal**: `#22c55e` (green-500)
- **Tema**: Dark mode com verde neon
- **Animações**: Framer Motion para transições suaves

## ✨ Componentes

### 1. LoginForm
**Localização**: `src/components/auth/LoginForm.tsx`

**Recursos**:
- ✅ Animações de entrada suaves
- ✅ Validação de email e senha
- ✅ Toggle para mostrar/ocultar senha
- ✅ Opção "Lembrar-me"
- ✅ Link para recuperação de senha
- ✅ Login social (Google e GitHub)
- ✅ Estado de carregamento
- ✅ Efeitos visuais com verde neon

**Uso**:
```tsx
import { LoginForm } from '@/components/auth/LoginForm';

<LoginForm />
```

### 2. RegisterForm
**Localização**: `src/components/auth/RegisterForm.tsx`

**Recursos**:
- ✅ Validação de senha em tempo real
- ✅ Indicadores visuais de requisitos de senha
- ✅ Confirmação de senha
- ✅ Toggle para mostrar/ocultar senhas
- ✅ Checkbox de termos e condições
- ✅ Registro social (Google e GitHub)
- ✅ Validação de campos
- ✅ Animações progressivas

**Validações de Senha**:
- Mínimo 8 caracteres
- Uma letra maiúscula
- Uma letra minúscula
- Um número

**Uso**:
```tsx
import { RegisterForm } from '@/components/auth/RegisterForm';

<RegisterForm />
```

### 3. Input
**Localização**: `src/components/ui/input.tsx`

**Recursos**:
- ✅ Estilos consistentes com tema verde
- ✅ Estados de foco e hover
- ✅ Totalmente acessível
- ✅ Suporte a disabled
- ✅ Integração com formulários

**Uso**:
```tsx
import { Input } from '@/components/ui/input';

<Input 
  type="email" 
  placeholder="seu@email.com" 
  required 
/>
```

## 📱 Páginas

### Login Page
**URL**: `/auth/login`
**Arquivo**: `src/app/auth/login/page.tsx`

**Recursos**:
- Layout responsivo com informações à esquerda
- Formulário de login à direita
- Background animado com efeitos de blur verde
- Lista de benefícios da plataforma
- Link para voltar à home
- Link para página de registro

### Register Page
**URL**: `/auth/register`
**Arquivo**: `src/app/auth/register/page.tsx`

**Recursos**:
- Layout responsivo com benefícios à esquerda
- Formulário de registro à direita
- Grid de vantagens da plataforma
- Depoimento de cliente
- Background animado
- Link para página de login

## 🎯 Animações

Todas as animações são feitas com **Framer Motion**:

### Tipos de Animações Usadas:
1. **Fade In + Slide**: Entrada suave de elementos
2. **Scale**: Ícones e badges
3. **Hover**: Transformações ao passar o mouse
4. **Loading**: Spinner durante submit
5. **Progressive**: Elementos aparecem em sequência

### Exemplo de Animação:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Conteúdo */}
</motion.div>
```

## 🔧 Funcionalidades

### Implementado:
- [x] Componente de Input customizado
- [x] Formulário de Login
- [x] Formulário de Registro
- [x] Validação de senha em tempo real
- [x] Toggle de visibilidade de senha
- [x] Login/Registro social (UI)
- [x] Estados de loading
- [x] Animações fluidas
- [x] Design responsivo
- [x] Tema verde neon

### Próximos Passos (Backend):
- [ ] Integração com API de autenticação
- [ ] JWT/Session management
- [ ] OAuth (Google/GitHub)
- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Proteção de rotas
- [ ] Context/Store de autenticação

## 🎨 Paleta de Cores Utilizada

```css
/* Verde Principal */
green-500           /* #22c55e */
green-500/5         /* Backgrounds muito suaves */
green-500/10        /* Backgrounds suaves */
green-500/20        /* Bordas e ícones */
green-500/30        /* Hovers */
green-500/50        /* Bordas focus */

/* Gradientes */
from-green-500 to-green-600
hover:from-green-600 hover:to-green-700

/* Sombras */
shadow-green-500/30
shadow-green-500/10
```

## 📝 Exemplo de Integração com API

```tsx
// LoginForm.tsx - handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Redirecionar ou atualizar estado global
      console.log('Login successful:', data);
    } else {
      // Mostrar erro
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

## 🚀 Como Usar

1. **Adicionar links no Header**:
```tsx
import Link from 'next/link';

<Link href="/auth/login">Login</Link>
<Link href="/auth/register">Criar Conta</Link>
```

2. **Proteger rotas** (futuro):
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
```

## 📱 Responsividade

### Breakpoints:
- **Mobile**: < 768px - Formulário em tela cheia
- **Tablet**: 768px - 1024px - Layout adaptado
- **Desktop**: > 1024px - Layout com informações laterais

### Classes Responsivas Usadas:
```css
lg:grid-cols-2      /* Grid 2 colunas em telas grandes */
hidden lg:block     /* Esconde info lateral em mobile */
max-w-md            /* Largura máxima do formulário */
container mx-auto   /* Centralização */
```

## 🎯 Boas Práticas Implementadas

1. ✅ Componentização
2. ✅ TypeScript para type safety
3. ✅ Validação client-side
4. ✅ Estados de loading
5. ✅ Feedback visual
6. ✅ Acessibilidade (labels, required, etc)
7. ✅ SEO friendly (metadata)
8. ✅ Performance (animações otimizadas)

## 📚 Dependências

```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-slot": "^1.x",
  "class-variance-authority": "^0.x",
  "tailwindcss": "^3.x"
}
```

---

**Desenvolvido com 💚 seguindo o design system AplotCloud**

