# 🎨 Guia de Cores - AplotCloud

## 🟢 Cor Principal - Verde Neon

### **Código da Cor:**
```
#22c55e
```

### **Informações Técnicas:**
- **Hex**: `#22c55e`
- **RGB**: `rgb(34, 197, 94)`
- **HSL**: `hsl(142, 71%, 45%)`
- **Tailwind CSS**: `green-500`

---

## 📋 Classes Tailwind CSS

### **Cor Sólida:**
```css
green-500          /* Verde principal */
```

### **Variações de Opacidade:**
```css
green-500/5        /* 5% opacidade - backgrounds muito suaves */
green-500/10       /* 10% opacidade - backgrounds suaves */
green-500/15       /* 15% opacidade - efeitos de fundo */
green-500/20       /* 20% opacidade - bordas e ícones */
green-500/30       /* 30% opacidade - hovers */
green-500/40       /* 40% opacidade - bordas médias */
green-500/50       /* 50% opacidade - bordas semi-transparentes */
green-500/70       /* 70% opacidade - hovers mais escuros */
green-500/80       /* 80% opacidade - gradientes */
green-500/90       /* 90% opacidade - gradientes escuros */
```

---

## 🎯 Exemplos de Uso

### **Bordas:**
```css
border-green-500           /* Borda sólida */
border-green-500/20        /* Borda com 20% opacidade */
border-green-500/50        /* Borda com 50% opacidade */
hover:border-green-500     /* Hover com borda sólida */
```

### **Backgrounds:**
```css
bg-green-500               /* Background sólido */
bg-green-500/10            /* Background com 10% opacidade */
bg-green-500/20            /* Background com 20% opacidade */
hover:bg-green-500/5       /* Hover com background suave */
```

### **Textos:**
```css
text-green-500             /* Texto verde sólido */
text-green-500/80          /* Texto com 80% opacidade */
hover:text-green-500       /* Hover com texto verde */
```

### **Gradientes:**
```css
bg-gradient-to-r from-green-500 to-green-500/80
bg-gradient-to-br from-green-500/20 to-green-500/10
bg-gradient-to-r from-green-500/10 to-green-500/5
```

---

## 🎨 Aplicações na Interface

### **Botões:**
```css
/* Botão primário */
bg-green-500 hover:bg-green-500/90 text-white

/* Botão outline */
border-green-500 text-green-500 hover:bg-green-500 hover:text-white

/* Botão com gradiente */
bg-gradient-to-r from-green-500 to-green-500/90
```

### **Cards e Componentes:**
```css
/* Card selecionado */
border-green-500 shadow-xl

/* Card hover */
hover:border-green-500/30

/* Background de destaque */
bg-green-500/10 border-green-500/20
```

### **Ícones e Badges:**
```css
/* Ícone em container */
bg-green-500/20 text-green-500

/* Badge popular */
bg-gradient-to-r from-green-500 to-green-500/80

/* Check selecionado */
bg-green-500 text-white
```

---

## 🌈 Paleta Complementar

### **Cores de Apoio:**
```css
/* Backgrounds */
bg-background              /* Fundo principal */
bg-card                    /* Fundo de cards */
bg-muted                   /* Fundo suave */
bg-muted/50                /* Fundo semi-transparente */

/* Bordas */
border-border              /* Borda padrão */
border-border/40           /* Borda com opacidade */

/* Textos */
text-foreground            /* Texto principal */
text-muted-foreground      /* Texto secundário */
```

---

## 📱 Responsividade

### **Breakpoints Tailwind:**
```css
/* Mobile First */
text-green-500             /* Base */
md:text-green-500          /* Medium screens */
lg:text-green-500          /* Large screens */
xl:text-green-500          /* Extra large screens */
```

---

## ⚡ Performance

### **Dicas de Otimização:**
- Use `green-500` como base sólida
- Aplique opacidades para criar variações
- Evite muitas cores diferentes - mantenha consistência
- Use gradientes com moderação para performance

---

## 🎯 Casos de Uso Específicos

### **Estados de Seleção:**
```css
/* Selecionado */
border-green-500 bg-green-500/10

/* Hover */
hover:border-green-500/30 hover:bg-green-500/5

/* Ativo */
bg-green-500 text-white
```

### **Feedback Visual:**
```css
/* Sucesso */
bg-green-500/20 text-green-500 border-green-500/30

/* Destaque */
bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20

/* Interação */
hover:scale-105 hover:border-green-500 transition-all duration-300
```

---

## 📝 Notas Importantes

1. **Consistência**: Sempre use `green-500` como base
2. **Acessibilidade**: Mantenha contraste adequado com texto branco/preto
3. **Hierarquia**: Use opacidades para criar hierarquia visual
4. **Performance**: Prefira classes Tailwind sobre CSS customizado
5. **Responsividade**: Teste em diferentes tamanhos de tela

---

## 🔄 Atualizações

- **Versão**: 1.0
- **Última atualização**: Dezembro 2024
- **Compatibilidade**: Tailwind CSS 3.x+

---

*Este guia garante consistência visual em todo o projeto AplotCloud.*
