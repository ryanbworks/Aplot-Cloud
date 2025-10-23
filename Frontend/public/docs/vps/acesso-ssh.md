---
title: "Como acessar seu VPS via SSH"
description: "Guia completo para conectar ao seu VPS usando SSH"
author: "Equipe AplotCloud"
date: "2024-12-01"
tags: ["vps", "ssh", "acesso", "terminal", "linux"]
---

# Como acessar seu VPS via SSH

Aprenda a conectar ao seu VPS usando SSH de forma segura e eficiente.

## Pré-requisitos

- VPS ativo na AplotCloud
- Cliente SSH instalado
- Credenciais de acesso (IP, usuário, senha/chave)

## Informações de acesso

### Onde encontrar suas credenciais

1. Acesse seu dashboard
2. Vá em "Meus Serviços"
3. Clique no seu VPS
4. Na aba "Acesso", você encontrará:
   - **IP do servidor**
   - **Usuário padrão**
   - **Senha inicial**
   - **Porta SSH** (geralmente 22)

## Conectando via SSH

### Windows

#### Método 1: PowerShell (Recomendado)

1. Abra o PowerShell como administrador
2. Execute o comando:

```bash
ssh usuario@ip_do_servidor
```

Exemplo:
```bash
ssh root@192.168.1.100
```

#### Método 2: PuTTY

1. Baixe o PuTTY
2. Configure:
   - **Host Name**: IP do servidor
   - **Port**: 22
   - **Connection Type**: SSH
3. Clique em "Open"

#### Método 3: Windows Terminal

1. Abra o Windows Terminal
2. Use o comando SSH nativo
3. Digite a senha quando solicitado

### Linux/macOS

#### Terminal nativo

```bash
ssh usuario@ip_do_servidor
```

Exemplo:
```bash
ssh root@192.168.1.100
```

## Configuração de chaves SSH

### Gerando uma chave SSH

#### No Windows (PowerShell)

```bash
ssh-keygen -t rsa -b 4096 -C "seu_email@exemplo.com"
```

#### No Linux/macOS

```bash
ssh-keygen -t rsa -b 4096 -C "seu_email@exemplo.com"
```

### Adicionando a chave ao servidor

1. Copie a chave pública:
```bash
cat ~/.ssh/id_rsa.pub
```

2. No servidor, crie o diretório .ssh:
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

3. Adicione a chave:
```bash
echo "sua_chave_publica" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Conectando com chave

```bash
ssh -i ~/.ssh/id_rsa usuario@ip_do_servidor
```

## Comandos básicos

### Navegação

```bash
# Listar arquivos
ls -la

# Navegar para diretório
cd /caminho/para/diretorio

# Voltar diretório anterior
cd ..

# Ir para home
cd ~

# Mostrar diretório atual
pwd
```

### Gerenciamento de arquivos

```bash
# Criar diretório
mkdir nome_diretorio

# Criar arquivo
touch nome_arquivo.txt

# Copiar arquivo
cp arquivo_origem arquivo_destino

# Mover arquivo
mv arquivo_origem arquivo_destino

# Remover arquivo
rm nome_arquivo

# Remover diretório
rm -rf nome_diretorio
```

### Gerenciamento de processos

```bash
# Ver processos
ps aux

# Matar processo
kill PID

# Matar processo forçado
kill -9 PID

# Ver uso de recursos
top
htop
```

## Configurações de segurança

### Alterar porta SSH

1. Edite o arquivo de configuração:
```bash
sudo nano /etc/ssh/sshd_config
```

2. Altere a linha:
```
Port 22
```

3. Reinicie o SSH:
```bash
sudo systemctl restart ssh
```

### Desabilitar login root

1. Edite a configuração:
```bash
sudo nano /etc/ssh/sshd_config
```

2. Altere:
```
PermitRootLogin no
```

3. Reinicie o SSH:
```bash
sudo systemctl restart ssh
```

### Configurar firewall

```bash
# Instalar UFW
sudo apt update
sudo apt install ufw

# Configurar regras
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Ativar firewall
sudo ufw enable
```

## Solução de problemas

### Erro de conexão recusada

:::callout warning
**Possíveis causas:**
- Servidor offline
- Porta SSH bloqueada
- Firewall ativo
:::

**Soluções:**
1. Verifique se o VPS está online
2. Confirme a porta SSH
3. Verifique o firewall

### Erro de autenticação

1. Verifique usuário e senha
2. Confirme se a chave SSH está correta
3. Teste com senha primeiro

### Timeout de conexão

1. Verifique a conectividade:
```bash
ping ip_do_servidor
```

2. Teste a porta:
```bash
telnet ip_do_servidor 22
```

## Dicas importantes

:::callout tip
**Performance**: Use `screen` ou `tmux` para sessões persistentes.
:::

:::callout info
**Segurança**: Sempre use chaves SSH em produção.
:::

:::callout warning
**Backup**: Configure backup automático dos arquivos importantes.
:::

## Comandos úteis

### Sessões persistentes

```bash
# Instalar screen
sudo apt install screen

# Criar sessão
screen -S nome_sessao

# Desconectar (Ctrl+A, D)
# Reconectar
screen -r nome_sessao
```

### Monitoramento

```bash
# Uso de disco
df -h

# Uso de memória
free -h

# Uso de CPU
top

# Logs do sistema
sudo journalctl -f
```

## Suporte

Precisa de ajuda?

- **Chat online**: Disponível 24/7
- **Email**: suporte@aplotcloud.com
- **Discord**: [Link do servidor]

---

*Este guia foi útil? Deixe seu feedback!*
