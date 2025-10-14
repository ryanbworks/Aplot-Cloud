# 📊 Dashboard - AplotCloud

## 🎯 Visão Geral

Sistema completo de dashboard para gerenciamento de serviços de hospedagem, integrado com Pterodactyl.

## 📁 Estrutura

```
src/
├── components/
│   └── dashboard/
│       ├── StatsCard.tsx       # Cards de estatísticas
│       ├── ServiceCard.tsx     # Cards de serviços ativos
│       ├── InvoiceCard.tsx     # Cards de faturas
│       └── README.md           # Este arquivo
└── app/
    └── dashboard/
        └── page.tsx            # Página principal do dashboard
```

## 🎨 Componentes

### 1. StatsCard
**Arquivo**: `components/dashboard/StatsCard.tsx`

Cards de estatísticas com animações e suporte a tendências.

**Props**:
```typescript
{
  title: string;              // Título do card
  value: string | number;     // Valor principal
  description?: string;       // Descrição/subtítulo
  icon: LucideIcon;          // Ícone do Lucide React
  trend?: {                  // Tendência (opcional)
    value: number;           // Valor da tendência
    isPositive: boolean;     // Se é positiva ou negativa
  };
  index?: number;            // Índice para delay de animação
}
```

**Exemplo**:
```tsx
<StatsCard
  title="Serviços Ativos"
  value="4"
  description="2 Minecraft, 1 Discord Bot, 1 VPS"
  icon={Server}
  trend={{ value: 25, isPositive: true }}
  index={0}
/>
```

### 2. ServiceCard
**Arquivo**: `components/dashboard/ServiceCard.tsx`

Cards para exibir serviços com status, informações e ações rápidas.

**Props**:
```typescript
{
  id: string;
  name: string;
  type: 'minecraft' | 'discord-bot' | 'vps' | 'website';
  status: 'online' | 'offline' | 'suspended';
  plan: string;
  expiryDate: string;
  ip?: string;
  port?: string;
  index?: number;
}
```

**Exemplo**:
```tsx
<ServiceCard
  id="1"
  name="Servidor Survival"
  type="minecraft"
  status="online"
  plan="Premium 4GB"
  expiryDate="15/11/2024"
  ip="192.168.1.100"
  port="25565"
  index={0}
/>
```

**Recursos**:
- ✅ Status visual com cores (online/offline/suspenso)
- ✅ Badge de plano
- ✅ Exibição de IP e porta
- ✅ Botão para acessar Pterodactyl
- ✅ Controles rápidos (power)
- ✅ Ícones personalizados por tipo

### 3. InvoiceCard
**Arquivo**: `components/dashboard/InvoiceCard.tsx`

Cards de faturas com status de pagamento.

**Props**:
```typescript
{
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  index?: number;
}
```

**Exemplo**:
```tsx
<InvoiceCard
  id="1"
  date="01/10/2024"
  amount={248.00}
  status="paid"
  description="Mensalidade - Outubro 2024"
  index={0}
/>
```

**Recursos**:
- ✅ Status visual (pago/pendente/vencido)
- ✅ Formatação de moeda
- ✅ Botão de download (quando pago)
- ✅ Ícones de status

## 📱 Página do Dashboard

**Rota**: `/dashboard`

### Seções:

#### 1. Header
- Saudação personalizada
- Notificações
- Configurações
- Logout

#### 2. Alertas/Notificações
- Avisos importantes
- Vencimentos próximos
- Status de operações

#### 3. Cards de Estatísticas (4 colunas)
- Serviços Ativos
- Gasto Mensal
- Uptime Médio
- Tickets Abertos

#### 4. Grid Principal (2 colunas)

**Coluna Esquerda (2/3)**:
- Lista de serviços (grid 2x2)
- Ações rápidas
  - Novo Servidor
  - Fazer Upgrade
  - Faturamento
  - Suporte

**Coluna Direita (1/3)**:
- Faturas Recentes
- Card de Suporte
- Status do Sistema

## 🎨 Paleta de Cores

### Status dos Serviços:
```css
/* Online */
text-green-500
bg-green-500/10
border-green-500/20

/* Offline */
text-red-500
bg-red-500/10
border-red-500/20

/* Suspenso */
text-yellow-500
bg-yellow-500/10
border-yellow-500/20
```

### Faturas:
```css
/* Paga */
text-green-500

/* Pendente */
text-yellow-500

/* Vencida */
text-red-500
```

## ✨ Animações

Todas as animações usam **Framer Motion**:

### Entrada de Cards:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
```

### Hover em Cards:
```tsx
whileHover={{ y: -5 }}
```

### Botões:
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## 🔄 Integração com API

### Mock Data (Atual)
O dashboard usa dados mockados para demonstração.

### Próximos Passos:
```typescript
// Buscar dados do usuário
const { data: user } = await fetch('/api/user');

// Buscar serviços
const { data: services } = await fetch('/api/services');

// Buscar faturas
const { data: invoices } = await fetch('/api/invoices');

// Buscar estatísticas
const { data: stats } = await fetch('/api/stats');
```

## 🔗 Integração Pterodactyl

### Link Direto:
```tsx
// No ServiceCard
<Button onClick={() => window.open(`/pterodactyl/server/${id}`)}>
  <ExternalLink className="w-4 h-4 mr-2" />
  Acessar Painel
</Button>
```

### SSO (Single Sign-On):
```typescript
// Gerar token de acesso único
const ssoToken = await generateSSOToken(userId, serverId);
window.open(`${PTERODACTYL_URL}/sso/${ssoToken}`);
```

## 📊 Métricas Exibidas

1. **Serviços Ativos**: Total de serviços online
2. **Gasto Mensal**: Soma dos planos ativos
3. **Uptime Médio**: Média de disponibilidade
4. **Tickets Abertos**: Tickets de suporte pendentes

## 🚀 Funcionalidades Futuras

- [ ] Gráficos de uso de recursos
- [ ] Notificações em tempo real (WebSocket)
- [ ] Filtros e busca de serviços
- [ ] Drag & Drop para organizar cards
- [ ] Modo escuro/claro
- [ ] Exportar relatórios
- [ ] Calendário de vencimentos
- [ ] Chat de suporte integrado

## 📱 Responsividade

### Breakpoints:
- **Mobile**: `< 768px` - 1 coluna
- **Tablet**: `768px - 1024px` - 2 colunas
- **Desktop**: `> 1024px` - Grid completo

### Grid Responsivo:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

## 🎯 Rotas do Dashboard

```
/dashboard              # Página principal
/dashboard/servicos     # Lista completa de serviços
/dashboard/servicos/novo # Criar novo serviço
/dashboard/servicos/[id] # Detalhes do serviço
/dashboard/faturamento  # Faturas e pagamentos
/dashboard/suporte      # Tickets de suporte
/dashboard/conta        # Configurações da conta
```

## 💡 Dicas de Uso

1. **Animações**: Todos os cards têm delay baseado no índice para efeito cascata
2. **Status em Tempo Real**: Use WebSocket para atualizar status dos servidores
3. **Hover States**: Todos os elementos interativos têm feedback visual
4. **Acessibilidade**: Cores com contraste adequado e labels descritivos

---

**Desenvolvido com 💚 usando Next.js 15, Framer Motion e Tailwind CSS**

