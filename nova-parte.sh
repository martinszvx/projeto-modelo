#!/bin/bash

# 1. Configurações iniciais
prefixo="parte"
arquivo_json="package.json"

# 2. Busca a pasta com o maior número
ultima_pasta=$(ls -d ${prefixo}* 2>/dev/null | sort -V | tail -n 1)

# 3. Lógica de numeração
if [ -z "$ultima_pasta" ]; then
    proximo_numero=1
else
    numero_atual=$(echo "$ultima_pasta" | sed "s/$prefixo//")
    proximo_numero=$((numero_atual + 1))
fi

nova_pasta="${prefixo}${proximo_numero}"

# 4. Criação/Cópia da pasta
if [ -n "$ultima_pasta" ]; then
    echo "Copiando $ultima_pasta para $nova_pasta..."
    cp -r "$ultima_pasta" "$nova_pasta"
else
    echo "Criando diretório inicial $nova_pasta..."
    mkdir "$nova_pasta"
fi

# 5. ATUALIZAÇÃO DO PACKAGE.JSON (O incremento solicitado)
if [ -f "$arquivo_json" ]; then
    echo "Atualizando script 'start' no $arquivo_json para apontar para $nova_pasta..."
    
    # O sed busca o padrão "node parteX/app.js" e substitui por "node parteX+1/app.js"
    # O parâmetro -i faz a alteração "in-place" (direto no arquivo)
    sed -i "s/\"start\": \"node ${prefixo}[0-9]*\/app.js\"/\"start\": \"node ${nova_pasta}\/app.js\"/" "$arquivo_json"
    
    echo "Sucesso: O script 'start' agora utiliza $nova_pasta/app.js."
else
    echo "Aviso: $arquivo_json não encontrado. A atualização do script foi pulada."
fi

echo "Concluído: $nova_pasta criada e ambiente configurado."

