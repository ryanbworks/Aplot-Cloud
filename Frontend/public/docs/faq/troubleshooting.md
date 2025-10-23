---
title: "Guia de solução de problemas"
description: "Resolva problemas comuns de forma rápida e eficiente"
author: "Equipe AplotCloud"
date: "2024-12-01"
tags: ["troubleshooting", "problemas", "solução", "diagnóstico"]
---

# Guia de solução de problemas

Resolva problemas comuns de forma rápida e eficiente com este guia.

## Problemas de Conectividade

### Servidor não responde

**Sintomas:**
- Timeout ao conectar
- Erro "Connection refused"
- Servidor aparece offline

**Soluções:**

1. **Verifique o status do servidor**
   ```
   Dashboard > Meus Serviços > Status
   ```

2. **Reinicie o servidor**
   ```
   Dashboard > Console > Reiniciar
   ```

3. **Verifique a conectividade**
   ```bash
   ping seu-servidor.aplotcloud.com
   telnet seu-servidor.aplotcloud.com porta
   ```

4. **Se persistir, abra um ticket**

### Conexão lenta

**Sintomas:**
- Latência alta
- Downloads lentos
- Timeout em comandos

**Soluções:**

1. **Verifique o uso de recursos**
   ```
   Dashboard > Monitoramento > Recursos
   ```

2. **Identifique processos pesados**
   ```bash
   top
   htop
   ```

3. **Considere upgrade do plano**

4. **Verifique a localização do servidor**

## Problemas de Minecraft

### Servidor não inicia

**Possíveis causas:**
- Plugin incompatível
- Configuração incorreta
- Falta de memória

**Soluções:**

1. **Verifique os logs**
   ```
   Dashboard > Console > Logs
   ```

2. **Remova plugins problemáticos**
   ```
   File Manager > plugins > Remover .jar
   ```

3. **Aumente a memória**
   ```
   Configurações > JVM > -Xmx4G
   ```

4. **Reinicie o servidor**

### Plugins não carregam

**Sintomas:**
- Plugin não aparece na lista
- Erro de dependência
- Servidor trava

**Soluções:**

1. **Verifique a versão do plugin**
2. **Instale dependências**
3. **Verifique permissões**
4. **Consulte a documentação do plugin**

### Jogadores não conseguem conectar

**Possíveis causas:**
- Firewall bloqueando
- Porta incorreta
- Whitelist ativa

**Soluções:**

1. **Verifique a porta**
   ```
   Configurações > Server > server-port
   ```

2. **Desative whitelist**
   ```
   /whitelist off
   ```

3. **Verifique o firewall**
   ```
   Dashboard > Rede > Firewall
   ```

## Problemas de Discord Bot

### Bot não responde

**Sintomas:**
- Bot online mas não responde
- Comandos não funcionam
- Erro no console

**Soluções:**

1. **Verifique os logs**
   ```
   Dashboard > Console > Logs
   ```

2. **Confirme as permissões**
   ```
   Discord Developer Portal > Bot > Permissions
   ```

3. **Reinicie o bot**
   ```
   Dashboard > Console > Restart
   ```

4. **Verifique o código**

### Bot desconecta frequentemente

**Possíveis causas:**
- Código com erro
- Limite de API
- Problemas de rede

**Soluções:**

1. **Implemente reconexão automática**
2. **Monitore o uso da API**
3. **Verifique a estabilidade da conexão**

## Problemas de VPS

### Acesso SSH negado

**Sintomas:**
- "Permission denied"
- "Connection refused"
- Timeout

**Soluções:**

1. **Verifique as credenciais**
   ```
   Dashboard > Acesso > Credenciais
   ```

2. **Teste com senha**
   ```bash
   ssh usuario@ip_do_servidor
   ```

3. **Verifique a chave SSH**
   ```bash
   ssh-keygen -l -f ~/.ssh/id_rsa.pub
   ```

4. **Reset da senha se necessário**

### VPS lento

**Sintomas:**
- Comandos demoram para executar
- Uso alto de CPU/memória
- Sistema travando

**Soluções:**

1. **Identifique processos pesados**
   ```bash
   top
   htop
   ```

2. **Libere memória**
   ```bash
   sudo sync
   sudo echo 3 > /proc/sys/vm/drop_caches
   ```

3. **Monitore recursos**
   ```bash
   df -h  # Disco
   free -h  # Memória
   ```

4. **Considere upgrade do plano**

## Problemas de Pagamento

### Pagamento recusado

**Possíveis causas:**
- Dados incorretos
- Limite do cartão
- Bloqueio do banco

**Soluções:**

1. **Verifique os dados**
2. **Entre em contato com o banco**
3. **Tente outro método**
4. **Entre em contato conosco**

### Fatura não gerada

**Sintomas:**
- Serviço ativo mas sem fatura
- Erro ao gerar fatura
- Fatura em branco

**Soluções:**

1. **Aguarde até 24 horas**
2. **Verifique o email de spam**
3. **Entre em contato conosco**

## Problemas de Backup

### Backup não realizado

**Sintomas:**
- Backup não aparece na lista
- Erro ao criar backup
- Backup corrompido

**Soluções:**

1. **Verifique o espaço em disco**
2. **Execute backup manual**
3. **Verifique as permissões**
4. **Entre em contato conosco**

### Restauração falha

**Possíveis causas:**
- Backup corrompido
- Conflito de arquivos
- Permissões incorretas

**Soluções:**

1. **Tente outro backup**
2. **Verifique os logs**
3. **Execute restauração parcial**
4. **Entre em contato conosco**

## Diagnóstico Avançado

### Comandos úteis

```bash
# Verificar uso de recursos
htop
df -h
free -h

# Verificar processos
ps aux
netstat -tulpn

# Verificar logs
tail -f /var/log/syslog
journalctl -f

# Verificar conectividade
ping google.com
curl -I https://google.com
```

### Logs importantes

- **Sistema**: `/var/log/syslog`
- **SSH**: `/var/log/auth.log`
- **Apache**: `/var/log/apache2/`
- **Nginx**: `/var/log/nginx/`
- **Minecraft**: `logs/latest.log`

## Quando procurar suporte

### Problemas que requerem suporte

- Servidor completamente offline
- Perda de dados
- Problemas de pagamento
- Questões de segurança
- Migração de dados

### Informações para o suporte

1. **Descrição detalhada do problema**
2. **Passos para reproduzir**
3. **Logs relevantes**
4. **Screenshots se aplicável**
5. **Tempo que o problema começou**

## Contatos de Suporte

### Canais disponíveis

- **Chat online**: 24/7
- **Email**: suporte@aplotcloud.com
- **WhatsApp**: +55 11 99999-9999
- **Discord**: [Link do servidor]

### Horários de atendimento

- **Chat**: 24/7
- **Email**: Resposta em até 2 horas
- **WhatsApp**: 9h às 18h (seg-sex)

---

*Este guia foi útil? Deixe seu feedback!*
