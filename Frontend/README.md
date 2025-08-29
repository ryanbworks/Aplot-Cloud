# Aplot Cloud - Frontend

Uma plataforma moderna e elegante construída com as melhores tecnologias do mercado.

## 🚀 Stack Tecnológica

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Estado**: Zustand
- **Componentes**: Radix UI
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Build Tool**: Vite/Turbopack

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia o servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação
```

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 14)
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página inicial
│   └── globals.css     # Estilos globais
├── components/         # Componentes reutilizáveis
│   └── ui/            # Componentes base (Button, etc.)
├── lib/               # Utilitários e configurações
├── hooks/             # Custom hooks
├── stores/            # Stores Zustand
├── types/             # Definições TypeScript
└── utils/             # Funções utilitárias
```

## 🎨 Design System

- **Tema**: Escuro elegante com acentos verdes
- **Tipografia**: Geist Sans (Google Fonts)
- **Cores**: Sistema de cores consistente com CSS Variables
- **Componentes**: Design system baseado em Radix UI

## 🔧 Configurações

### Git Hooks (Husky)
- **Pre-commit**: Executa lint e formatação
- **Commit-msg**: Valida formato das mensagens de commit

### ESLint
- Configuração Next.js otimizada
- Regras TypeScript
- Integração com Prettier

### Prettier
- Formatação automática
- Plugin Tailwind CSS
- Configuração consistente

## 🚀 Deploy

O projeto está configurado para deploy na Vercel com otimizações automáticas.

## 📝 Convenções

### Commits
Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
perf: performance
test: testes
build: build
ci: ci/cd
chore: manutenção
```

### Código
- TypeScript strict mode
- ESLint + Prettier
- Componentes funcionais com hooks
- Nomenclatura consistente

## 🎯 Próximos Passos

- [ ] Sistema de autenticação
- [ ] Dashboard principal
- [ ] Gerenciamento de projetos
- [ ] API integration
- [ ] Testes automatizados
- [ ] PWA features
