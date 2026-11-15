# TECHSOLUTION — Protótipo inicial do novo site

Este pacote contém uma primeira implementação estática e responsiva da nova presença digital da TECHSOLUTION, com duas frentes comerciais sob uma única marca:

1. **Consultoria e gestão de TI para empresas** — frente de posicionamento principal.
2. **Assistência técnica especializada** — frente complementar, preservada para pessoas físicas e pequenos negócios.

## Páginas incluídas

- `index.html` — página inicial com as duas jornadas, apresentação dos fundadores, serviços e formulário.
- `empresas.html` — consultoria e gestão, projetos, infraestrutura, segurança e continuidade.
- `assistencia.html` — serviços técnicos, processo de orçamento e atendimento.
- `equipamentos.html` — venda, fornecimento, equipamentos seminovos e locação.
- `sobre.html` — história, valores e fundadores.
- `contato.html` — canais de atendimento e formulário.

## Como visualizar

A forma mais simples é abrir `index.html` no navegador. Para testar com servidor local, abra um terminal nesta pasta e execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Imagens e identidade

- `assets/logo-simbolo.png`: recorte do símbolo do logotipo original fornecido pelo cliente, sem redesenhar o símbolo.
- `assets/logo-techsolution.png`: logotipo original completo, com margens brancas reduzidas.
- `assets/fundadores-original.png`: fotografia original enviada pelo cliente. Nenhuma alteração facial, reconstrução ou geração de rosto foi aplicada. O site faz apenas enquadramento por CSS.
- `assets/hero-datacenter.png`: imagem ilustrativa gerada por IA para representar infraestrutura de TI. Não deve ser apresentada como instalação ou cliente real da TECHSOLUTION.
- `assets/assistencia-laboratorio.png`: imagem ilustrativa gerada por IA para representar reparo técnico. Não deve ser apresentada como foto do laboratório real.

**Regra de fotografia dos fundadores:** preservar integralmente a identidade e as fisionomias. Futuras melhorias podem ajustar apenas enquadramento, exposição, iluminação, contraste, cor ou fundo, sem alterar traços faciais, idade aparente, corpo ou identidade.

## Informações reaproveitadas do site público atual

O protótipo reaproveita dados publicados no site atual: atuação desde 2020 em Guarulhos, telefone/WhatsApp `(11) 97194-6176`, e-mail `atendimento.techsolution@gmail.com`, horário de segunda a sexta das 09h às 18h e sábado das 09h às 13h, além das categorias de serviços anunciadas.

**Antes de publicar:** confirmar telefone, e-mail, horários, endereço/área de atendimento, serviços efetivamente disponíveis, marcas atendidas, condições de garantia, política de privacidade e dados legais da empresa.

## Formulários

Os formulários são demonstrativos e abrem uma conversa no WhatsApp com os campos preenchidos. Não armazenam dados no site. Para produção, avaliar consentimento e aviso de privacidade, proteção contra spam e eventual integração com CRM ou e-mail.

## Limites desta entrega

Este é um protótipo/front-end estático. Ainda não está publicado no domínio, não substitui o site em produção e não possui CMS, painel administrativo, analytics configurado, backend, armazenamento de leads ou integrações de CRM. A implantação deve ser feita após revisão do conteúdo, validação de dados e testes no ambiente de hospedagem.
