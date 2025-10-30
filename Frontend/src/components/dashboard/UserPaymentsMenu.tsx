import React from 'react';
import { Banknote, FileText, CreditCard, History, TrendingUp, HelpCircle, Download, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cards = [
  {
    icon: Banknote,
    title: 'Resumo Financeiro',
    description: 'Veja saldo, limite e status das suas assinaturas.',
    action: <Button variant="outline" size="sm">Ver Resumo</Button>,
    href: '#resumo',
  },
  {
    icon: FileText,
    title: 'Faturas & Boletos',
    description: 'Gerencie suas faturas e baixe boletos facilmente.',
    action: <Button variant="outline" size="sm">Ver Faturas</Button>,
    href: '#faturas',
  },
  {
    icon: CreditCard,
    title: 'Métodos de Pagamento',
    description: 'Adicione ou atualize cartões, pix e mais.',
    action: <Button variant="outline" size="sm">Gerenciar Métodos</Button>,
    href: '#metodos',
  },
  {
    icon: History,
    title: 'Histórico de Pagamentos',
    description: 'Consulte todos os pagamentos realizados e pendentes.',
    action: <Button variant="outline" size="sm">Ver Histórico</Button>,
    href: '#historico',
  },
  {
    icon: TrendingUp,
    title: 'Plano & Upgrade',
    description: 'Veja ou altere seu plano e faça upgrades.',
    action: <Button variant="outline" size="sm">Alterar Plano</Button>,
    href: '#plano',
  },
  {
    icon: Download,
    title: 'Baixar Comprovante',
    description: 'Baixe faturas e comprovantes de pagamento.',
    action: <Button variant="outline" size="sm">Baixar</Button>,
    href: '#comprovante',
  },
  {
    icon: HelpCircle,
    title: 'Central de Dúvidas',
    description: 'Confira perguntas frequentes sobre cobrança.',
    action: <Button variant="outline" size="sm">Acessar FAQ</Button>,
    href: '#faq',
  },
  {
    icon: Headphones,
    title: 'Suporte ao Cliente',
    description: 'Fale diretamente com nosso time de suporte.',
    action: <Button variant="default" size="sm">Falar com Suporte</Button>,
    href: '#suporte',
  },
];

export default function UserPaymentsMenu() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6">Pagamentos e Conta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(({ icon: Icon, title, description, action, href }) => (
          <div
            key={title}
            className="bg-card border border-green-500/10 shadow-sm rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 group-hover:bg-green-500/20 border border-green-500/20">
              <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
              <a href={href}>{action}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
